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
      name: data?.name || data?.json?.name || "Unknown Token",
      symbol: data.symbol || "???",
      uri: data.uri || null,
      image: data.image || data.json?.image || null,
    };
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    return null;
  }
}

// Known token addresses and their metadata
const KNOWN_TOKENS: {
  [key: string]: { name: string; symbol: string; image: string };
} = {
  Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: {
    name: "Tether USD",
    symbol: "USDT",
    image: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
    name: "USD Coin",
    symbol: "USDC",
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
  So11111111111111111111111111111111111111112: {
    name: "Wrapped SOL",
    symbol: "SOL",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So: {
    name: "mSOL",
    symbol: "mSOL",
    image: "https://cryptologos.cc/logos/msol-logo.png",
  },
  DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: {
    name: "BONK",
    symbol: "BONK",
    image: "https://cryptologos.cc/logos/bonk-bonk-logo.png",
  },
  PAWSxhjTyNJELywYiYTxCN857utnYmWXu7Q59Vgn6ZQ: {
    name: "PAWS",
    symbol: "PAWS",
    image:
      "https://api.phantom.app/image-proxy/?image=https%3A%2F%2Fcoin-images.coingecko.com%2Fcoins%2Fimages%2F54865%2Flarge%2Fpaws.jpg%3F1742193676&anim=true&fit=cover&width=128&height=128",
  },
};

export async function GET(req: NextRequest) {
  res.setHeader('Access-Control-Allow-Origin', 'https://bio-blue-beta.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
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

    interface UpdatedTokenType {
      mint: string;
      amount: number;
      decimals: number;
      name: string;
      symbol: string;
      uri: string | null;
      image: string | null;
    }
    const tokens: UpdatedTokenType[] = [];

    const Tokens = await Promise.all(
      tokenAccounts.value
        .filter(
          (account) =>
            account.account.data.parsed.info.tokenAmount.uiAmount > 0 &&
            account.account.data.parsed.info.tokenAmount.decimals > 0
        )
        .map(async (account) => {
          const mint = account.account.data.parsed.info.mint;

          // Check if the mint address is in the known tokens list
          if (KNOWN_TOKENS[mint]) {
            const { name, symbol, image } = KNOWN_TOKENS[mint];
            tokens.push({
              mint,
              amount: account.account.data.parsed.info.tokenAmount.uiAmount,
              decimals: account.account.data.parsed.info.tokenAmount.decimals,
              name: name,
              symbol: symbol,
              uri: null,
              image: image,
            });
            return;
          }
          const metadata = await getTokenMetadata(origin, mint, rpcUrl);
          tokens.push({
            mint,
            amount: account.account.data.parsed.info.tokenAmount.uiAmount,
            decimals: account.account.data.parsed.info.tokenAmount.decimals,
            name: metadata?.name || "Unknown Token",
            symbol: metadata?.symbol || "???",
            uri: metadata?.uri || null,
            image: metadata?.image || null,
          });
          // If the mint address is in the known tokens list, use that data
        })
    );

    console.log("tokens", Tokens);

    return NextResponse.json({ tokens }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error("Error fetching token accounts:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch tokens" },
      { status: 500 }
    );
  }
}
