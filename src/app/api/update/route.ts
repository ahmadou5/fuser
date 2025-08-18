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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = ProfileSchema.parse(body);

    // Connect to database
    await connectTo2Database();

    // Update user info in the db
    const updatedEntry = await ProfileEntry.findOneAndUpdate({
      email: validatedData.email,
      validatedData,
    });

    return NextResponse.json(
      {
        message: `Successfully Update user : ${validatedData.email}`,
        updatedEntry,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: (error as z.ZodError).errors[0].message },
        { status: 400 }
      );
    }

    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}
