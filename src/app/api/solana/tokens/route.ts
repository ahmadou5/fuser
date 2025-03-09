import { getUserTokenHoldings } from '@/lib/solana';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestSchema = z.object({
  address: z.string(),
  rpcUrl: z.string().url(),
});

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const body = {
      rpcUrl: params.get('rpcUrl'),
      address: params.get('address'),
    };
    const { rpcUrl, address } = requestSchema.parse(body);

    const tokens = await getUserTokenHoldings(rpcUrl, address);
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
