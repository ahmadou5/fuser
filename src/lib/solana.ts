import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  DigitalAsset,
  mplTokenMetadata,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import { fetchAllDigitalAssetByOwner } from "@metaplex-foundation/mpl-token-metadata";
import { isSome, publicKey } from "@metaplex-foundation/umi";

// Use the RPC endpoint of your choice.

export async function getSolanaConnection(rpcUrl: string) {
  return new Connection(rpcUrl, "confirmed");
}

export async function getMetaplex(connection: Connection) {
  return new Metaplex(connection);
}

export const getUserNFTsHoldings = async (
  rpcUrl: string,
  userAddress: string
): Promise<DigitalAsset[] | undefined> => {
  try {
    // Create Umi instance with the token metadata program
    const umi = createUmi(rpcUrl).use(mplTokenMetadata());

    // Convert user address to public key
    const user = publicKey(userAddress);

    // Fetch all digital assets owned by the user
    const allAssets = await fetchAllDigitalAssetByOwner(umi, user);

    // Filter to only include NFTs (Non-Fungible Tokens)
    // NFTs typically have TokenStandard.NonFungible or TokenStandard.ProgrammableNonFungible
    const nfts = allAssets.filter((asset) => {
      const standardOption = asset.metadata.tokenStandard;

      return (
        isSome(standardOption) &&
        ((standardOption.value === TokenStandard.NonFungible &&
          standardOption.__option === "Some") ||
          standardOption.value === TokenStandard.ProgrammableNonFungible)
      );
    });
    // Before returning, serialize any BigInt values to prevent JSON serialization issues
    return nfts;
  } catch (error) {
    console.error("Error fetching user NFTs:", error);
    throw error; // Re-throw to allow proper error handling by the caller
  }
};

export const getUserTokensHolds = async (
  rpcUrl: string,
  userAddress: string
) => {
  try {
    const umi = createUmi(rpcUrl).use(mplTokenMetadata());
    const user = publicKey(userAddress);
    const assets = await fetchAllDigitalAssetByOwner(umi, user);
    return assets;
  } catch (error) {
    console.log(error);
  }
};

export async function getUserNFTs(metaplex: Metaplex, userAddress: string) {
  try {
    const ownerPublicKey = new PublicKey(userAddress);
    const nfts = await metaplex
      .nfts()
      .findAllByOwner({ owner: ownerPublicKey });

    return await Promise.all(
      nfts.map(async (nft) => {
        try {
          // Fetch metadata if available
          const metadata = await fetch(nft.uri).then((res) => res.json());
          return {
            mint: nft.address.toString(),
            name: nft.name,
            symbol: nft.symbol,
            uri: nft.uri,
            metadata,
          };
        } catch (error) {
          console.error("Error fetching metadata:", error);

          return {
            mint: nft.address.toString(),
            name: nft.name,
            symbol: nft.symbol,
            uri: nft.uri,
          };
        }
      })
    );
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw error;
  }
}

export async function getUserTokens(
  connection: Connection,
  userAddress: string
) {
  try {
    const ownerPublicKey = new PublicKey(userAddress);
    const tokens = await connection.getParsedTokenAccountsByOwner(
      ownerPublicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

    return tokens.value.map((token) => {
      const tokenData = token.account.data.parsed.info;
      return {
        mint: tokenData.mint,
        amount: tokenData.tokenAmount.uiAmount,
        decimals: tokenData.tokenAmount.decimals,
        address: token.pubkey.toString(),
      };
    });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
}
