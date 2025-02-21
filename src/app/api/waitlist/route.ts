import { connectToDatabase } from '@/lib/mongodb';
import { WaitlistEntry } from '@/models/WaitlistEntry';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = waitlistSchema.parse(body);

    // Connect to database
    await connectToDatabase();

    // Check if email already exists
    const existingEntry = await WaitlistEntry.findOne({
      email: validatedData.email,
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    // Create new entry
    const entry = await WaitlistEntry.create(validatedData);

    return NextResponse.json(
      { message: 'Successfully joined waitlist', entry },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: (error as z.ZodError).errors[0].message },
        { status: 400 }
      );
    }

    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
