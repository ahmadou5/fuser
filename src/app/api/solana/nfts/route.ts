import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  address: z.string(),
  rpcUrl: z.string().url(),
});
async function getTokenMetadata(origin: string, mint: string, rpcUrl: string) {
  try {
    const response = await fetch(
      `${origin}/api/solana/token-metadata?token_mint=${mint}&&rpcUrl=${rpcUrl}`
    );
    const data = await response.json();
    console.log("token", data);
    return {
      name: data?.name || data?.json?.name || "Unknown NFT",
      symbol: data.symbol || "???",
      uri: data.uri || null,
      image: data.image || data.json?.image || null,
      attribute: data?.json?.attributes || null,
      description: data?.json?.description || null,
      external_url: data?.json?.external_url || null,
      collection: data?.json?.collection || null,
    };
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const origin = req.nextUrl.origin;
  const body = {
    rpcUrl: params.get("rpcUrl"),
    address: params.get("address"),
  };
  const { rpcUrl, address } = requestSchema.parse(body);

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  if (!rpcUrl) {
    return NextResponse.json({ error: "RPC URL is required" }, { status: 400 });
  }

  try {
    const connection = new Connection(rpcUrl, { commitment: "confirmed" });
    const publicKey = new PublicKey(address);

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: TOKEN_PROGRAM_ID }
    );

    const tokens = await Promise.all(
      tokenAccounts.value
        .filter(
          (account) =>
            account.account.data.parsed.info.tokenAmount.decimals <= 1
        )
        .map(async (account) => {
          const mint = account.account.data.parsed.info.mint;
          const metadata = await getTokenMetadata(origin, mint, rpcUrl);
          return {
            mint,
            amount: account.account.data.parsed.info.tokenAmount.uiAmount,
            decimals: account.account.data.parsed.info.tokenAmount.decimals,
            name: metadata?.name || "Unknown NFT",
            symbol: metadata?.symbol || "???",
            uri: metadata?.uri || null,
            image: metadata?.image || null,
            attribute: metadata?.attribute || null,
            description: metadata?.description || null,
            external_url: metadata?.external_url || null,
            collection: metadata?.collection || null,
          };
        })
    );

    return NextResponse.json({ tokens });
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error("Error fetching token accounts:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch tokens" },
      { status: 500 }
    );
  }
}
