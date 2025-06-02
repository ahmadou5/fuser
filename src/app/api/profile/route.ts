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

// GET profile by email
{
  /** 
export async function GET() {
  await connectTo2Database();
  const count = await ProfileEntry.countDocuments();
  return NextResponse.json({ message: "Success", count });
}
  **/
}

export async function GET(req: Request) {
  try {
    const params = new URL(req.url).searchParams;
    const email = params.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Connect to database
    await connectTo2Database();

    // Find entry by email
    const entry = await ProfileEntry.findOne({ email });

    if (!entry) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Success", entry }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
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

    // Check if email already exists
    const existingEntry = await ProfileEntry.findOne({
      email: validatedData.email,
    });

    if (existingEntry) {
      return NextResponse.json({ error: "This user Exist" }, { status: 409 });
    }

    // Create new entry
    const entry = await ProfileEntry.create(validatedData);

    return NextResponse.json(
      { message: "Successfully Create a new user", entry },
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
