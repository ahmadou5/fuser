import { getMetaplex, getSolanaConnection, getUserNFTs } from '@/lib/solana';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const requestSchema = z.object({
  address: z.string(),
  rpcUrl: z.string().url(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { address, rpcUrl } = requestSchema.parse(body);

    const connection = await getSolanaConnection(rpcUrl);
    const metaplex = await getMetaplex(connection);
    const nfts = await getUserNFTs(metaplex, address);

    return NextResponse.json({ nfts });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('NFTs fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NFTs' },
      { status: 500 }
    );
  }
}
