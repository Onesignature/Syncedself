import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getAccount } from '@solana/spl-token';

export const SYNCED_TOKEN_MINT = new PublicKey('HrxNmVsHDXAFywhRBCyHZoQHiXQ2g4fm3st6gcJdmxqc');

// Reliable public Solana RPC endpoints
const RPC_ENDPOINTS = [
  'https://api.mainnet-beta.solana.com',
  'https://solana-api.projectserum.com',
  'https://rpc.ankr.com/solana'
];

async function retry<T>(fn: () => Promise<T>, attempts = 3, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (attempts <= 1) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, attempts - 1, delay * 1.5);
  }
}

export class SyncedToken {
  private connections: Connection[];
  private currentConnectionIndex: number = 0;

  constructor(endpoint?: string) {
    // If endpoint is provided, use it as the primary endpoint
    this.connections = endpoint 
      ? [new Connection(endpoint), ...RPC_ENDPOINTS.map(url => new Connection(url))]
      : RPC_ENDPOINTS.map(url => new Connection(url));
  }

  private async executeWithFallback<T>(operation: (connection: Connection) => Promise<T>): Promise<T> {
    for (let i = 0; i < this.connections.length; i++) {
      const connectionIndex = (this.currentConnectionIndex + i) % this.connections.length;
      try {
        const result = await retry(() => operation(this.connections[connectionIndex]));
        this.currentConnectionIndex = connectionIndex; // Remember successful connection
        return result;
      } catch (error) {
        console.warn(`Failed to execute operation with endpoint ${connectionIndex}:`, error);
        if (i === this.connections.length - 1) throw error;
      }
    }
    throw new Error('All RPC endpoints failed');
  }

  async getTokenBalance(walletAddress: PublicKey): Promise<number> {
    try {
      const associatedTokenAddress = await getAssociatedTokenAddress(
        SYNCED_TOKEN_MINT,
        walletAddress
      );

      const tokenAccount = await this.executeWithFallback(async (connection) => {
        return await getAccount(connection, associatedTokenAddress);
      });

      return Number(tokenAccount.amount) / Math.pow(10, 9); // Assuming 9 decimals
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return 0;
    }
  }

  async getTokenActivity(walletAddress: PublicKey) {
    try {
      const associatedTokenAddress = await getAssociatedTokenAddress(
        SYNCED_TOKEN_MINT,
        walletAddress
      );

      const transactions = await this.executeWithFallback(async (connection) => {
        return await connection.getSignaturesForAddress(associatedTokenAddress);
      });

      return transactions.map(tx => ({
        signature: tx.signature,
        timestamp: tx.blockTime ? new Date(tx.blockTime * 1000) : new Date(),
        status: tx.confirmationStatus
      }));
    } catch (error) {
      console.error('Error fetching token activity:', error);
      return [];
    }
  }
}