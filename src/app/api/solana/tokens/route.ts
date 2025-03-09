import { getUserTokensHolds } from "@/lib/solana";
import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  address: z.string(),
  rpcUrl: z.string().url(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rpcUrl, address } = requestSchema.parse(body);
    const tokens = await getUserTokensHolds(rpcUrl, address);
    const serializedTokens = JSON.parse(
      JSON.stringify(tokens, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
    return NextResponse.json({ tokens: serializedTokens });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Tokens fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tokens" },
      { status: 500 }
    );
  }
}
