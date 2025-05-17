import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SyncedToken } from '../utils/token';

export const useSyncedToken = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [activity, setActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with the connection's endpoint but allow fallback to other endpoints
  const syncedToken = new SyncedToken(connection.rpcEndpoint);

  const refreshBalance = async () => {
    if (!publicKey) return;
    setIsLoading(true);
    setError(null);
    try {
      const balance = await syncedToken.getTokenBalance(publicKey);
      setBalance(balance);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error refreshing balance:', error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshActivity = async () => {
    if (!publicKey) return;
    try {
      const activity = await syncedToken.getTokenActivity(publicKey);
      setActivity(activity);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error refreshing activity:', error);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (publicKey) {
      refreshBalance();
      refreshActivity();
    }
  }, [publicKey]);

  return {
    balance,
    activity,
    isLoading,
    error,
    refreshBalance,
    refreshActivity
  };
};