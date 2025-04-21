import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";

export async function GET(req: Request) {
  try {
    const requestUrl = new URL(req.url);
    const token_mint = requestUrl.searchParams.get("token_mint");
    const rpcUrl = requestUrl.searchParams.get("rpcUrl");

    if (!rpcUrl) {
      return new Response(JSON.stringify({ message: "RPC url is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    if (!token_mint) {
      return new Response(
        JSON.stringify({ message: "Token mint address is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const connection = new Connection(rpcUrl, "confirmed");

    const metaplex = Metaplex.make(connection);

    const token = await metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(token_mint) });

    return new Response(JSON.stringify(token), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      return Response.json({
        error: error.message || "An unknown error occurred",
      });
  }
}
