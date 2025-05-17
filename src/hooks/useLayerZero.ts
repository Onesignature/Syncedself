import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { LayerZeroMessenger } from '../utils/layerzero';
import { SolanaMessenger } from '../utils/solana';
import { ChainId } from '@layerzerolabs/lz-sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';

export const useLayerZero = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const sendCrossChainMessage = useCallback(async (
    message: string,
    destinationChainId: number = ChainId.BSC,
    useSolana: boolean = false
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      if (useSolana) {
        if (!publicKey) {
          throw new Error('Please connect your Solana wallet');
        }
        const solanaMessenger = new SolanaMessenger(connection.rpcEndpoint);
        const signature = await solanaMessenger.sendCrossChainMessage(
          { publicKey, sendTransaction },
          message,
          destinationChainId
        );
        return signature;
      }

      // Request wallet connection
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to use cross-chain messaging');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      const messenger = new LayerZeroMessenger(provider);
      
      // Estimate fees first
      const { nativeFee } = await messenger.estimateFees(
        destinationChainId,
        message
      );

      // Send the message
      const tx = await messenger.sendMessage(destinationChainId, message);
      await tx.wait();

      return tx.hash;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendCrossChainMessage,
    isLoading,
    error
  };
};