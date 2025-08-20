export const maxDuration = 60;
export const dynamic = "force-dynamic";

import { connectTo2Database } from "@/lib/mongodb";
import { ProfileEntry } from "@/models/ProfileEntry";
import { NextResponse } from "next/server";
import { z } from "zod";

const ProfileSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(3, "Address is required"),
  pin: z.string().min(4, "PIN must be at least 4 characters"),
  bio: z.string().optional(),
  profilePicture: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const params = new URL(req.url).searchParams;
    const email = params.get("email");

    return NextResponse.json({ message: `Hello ${email} ` }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching profile:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = ProfileSchema.parse(body);

    // Connect to database
    await connectTo2Database();

    // Check if profile exists
    const existingProfile = await ProfileEntry.findOne({
      email: validatedData.email,
    });

    let result;

    if (existingProfile) {
      // Update existing profile
      result = await ProfileEntry.findOneAndUpdate(
        { email: validatedData.email },
        {
          ...validatedData,
          updatedAt: new Date(),
        },
        {
          new: true, // Return updated document
          runValidators: true, // Run schema validators
        }
      );
    } else {
      // Create new profile
      result = await ProfileEntry.create(validatedData);
    }

    return NextResponse.json(
      {
        message: existingProfile
          ? `Successfully updated profile for: ${validatedData.email}`
          : `Successfully created profile for: ${validatedData.email}`,
        profile: result,
      },
      { status: existingProfile ? 200 : 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: (error as z.ZodError).errors[0].message },
        { status: 400 }
      );
    }

    console.error("Waitlist error:", error);
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
