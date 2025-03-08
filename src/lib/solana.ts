import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export async function getSolanaConnection(rpcUrl: string) {
  return new Connection(rpcUrl, 'confirmed');
}

export async function getMetaplex(connection: Connection) {
  return new Metaplex(connection);
}

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
          console.error('Error fetching metadata:', error);

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
    console.error('Error fetching NFTs:', error);
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
    console.error('Error fetching tokens:', error);
    throw error;
  }
}
