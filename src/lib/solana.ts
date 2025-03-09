import { Metaplex } from '@metaplex-foundation/js';
import {
  DigitalAsset,
  fetchAllDigitalAssetByOwner,
  mplTokenMetadata,
  TokenStandard,
} from '@metaplex-foundation/mpl-token-metadata';
import { isSome, publicKey } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { Connection, PublicKey } from '@solana/web3.js';

export async function getSolanaConnection(rpcUrl: string) {
  return new Connection(rpcUrl, 'confirmed');
}

export async function getMetaplex(connection: Connection) {
  return new Metaplex(connection);
}

export async function getUserNFTHoldings(rpcUrl: string, address: string) {
  try {
    const ownerPublicKey = new PublicKey(address);
    const connection = await getSolanaConnection(rpcUrl);
    const metaplex = await getMetaplex(connection);
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

export const getUserTokenHoldings = async (
  rpcUrl: string,
  address: string
): Promise<DigitalAsset[]> => {
  try {
    const umi = createUmi(rpcUrl).use(mplTokenMetadata());
    const user = publicKey(address);
    const assets = await fetchAllDigitalAssetByOwner(umi, user);

    // Obtain only SPL tokens
    const tokens = assets.filter((asset) => {
      const standardOption = asset.metadata.tokenStandard;
      return (
        isSome(standardOption) &&
        standardOption.value === TokenStandard.Fungible &&
        standardOption.__option === 'Some'
      );
    });

    // Fetch metadata for each token if URI is available
    const tokensWithMetadata = await Promise.all(
      tokens.map(async (token) => {
        try {
          if (token.metadata.uri) {
            const metadata = await fetch(token.metadata.uri).then((res) =>
              res.json()
            );
            return { ...token, metadata };
          }
          return token;
        } catch (error) {
          console.error('Error fetching token metadata:', error);
          return token;
        }
      })
    );

    // Serialize any BigInt values
    return JSON.parse(
      JSON.stringify(tokensWithMetadata, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
