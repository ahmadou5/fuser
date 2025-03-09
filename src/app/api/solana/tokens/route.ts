import { getSolanaConnection, getUserTokens } from '@/lib/solana';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestSchema = z.object({
  address: z.string(),
  rpcUrl: z.string().url(),
});

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const data = {
      address: params.get('address'),
      rpcUrl: params.get('rpcUrl'),
    };
    const { address, rpcUrl } = requestSchema.parse(data);

    const connection = await getSolanaConnection(rpcUrl);
    const tokens = await getUserTokens(connection, address);

    return NextResponse.json({ tokens });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Tokens fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    );
  }
}
