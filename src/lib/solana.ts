import { Metaplex } from '@metaplex-foundation/js';
import {
  DigitalAsset,
  fetchAllDigitalAssetByOwner,
  mplTokenMetadata,
  TokenStandard,
} from '@metaplex-foundation/mpl-token-metadata';
import { isSome, publicKey } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { Connection } from '@solana/web3.js';

export async function getSolanaConnection(rpcUrl: string) {
  return new Connection(rpcUrl, 'confirmed');
}

export async function getMetaplex(connection: Connection) {
  return new Metaplex(connection);
}

export const getUserNFTHoldings = async (
  rpcUrl: string,
  address: string
): Promise<DigitalAsset[]> => {
  try {
    const umi = createUmi(rpcUrl).use(mplTokenMetadata());
    const user = publicKey(address);
    const allAssets = await fetchAllDigitalAssetByOwner(umi, user);

    // Filter to only include NFTs (Non-Fungible Tokens)
    const nfts = allAssets.filter((asset) => {
      const standardOption = asset.metadata.tokenStandard;

      return (
        isSome(standardOption) &&
        ((standardOption.value === TokenStandard.NonFungible &&
          standardOption.__option === 'Some') ||
          standardOption.value === TokenStandard.ProgrammableNonFungible)
      );
    });

    // Before returning, serialize any BigInt values to prevent JSON serialization issues
    return JSON.parse(
      JSON.stringify(nfts, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );
  } catch (error) {
    console.error('Error fetching user NFTs:', error);
    throw error;
  }
};

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

    // Before returning, serialize any BigInt values to prevent JSON serialization issues
    return JSON.parse(
      JSON.stringify(tokens, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
