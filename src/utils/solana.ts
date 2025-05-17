import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

// LayerZero Solana Program ID (mainnet)
const LZ_PROGRAM_ID = new PublicKey('3LjzLcZxeSH8m2FYtoJwRnKXbF5kxGaP3hTwGK7ksst9');

export class SolanaMessenger {
  private connection: Connection;

  constructor(endpoint: string) {
    this.connection = new Connection(endpoint, 'confirmed');
  }

  async sendCrossChainMessage(
    wallet: any,
    message: string,
    destinationChain: number
  ) {
    if (!wallet.publicKey) throw new Error('Wallet not connected');
    
    try {
      // Get the latest blockhash for transaction
      const { blockhash, lastValidBlockHeight } = 
        await this.connection.getLatestBlockhash('finalized');

      // Create transaction with proper fee estimation
      const lamports = await this.connection.getMinimumBalanceForRentExemption(
        message.length + 100 // Add buffer for instruction data
      );

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: LZ_PROGRAM_ID,
          lamports: lamports,
        })
      );

      // Set transaction properties
      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = blockhash;
      
      // Send and confirm transaction
      const signature = await wallet.sendTransaction(transaction, this.connection);
      
      // Wait for confirmation with timeout
      const confirmation = await this.connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${confirmation.value.err}`);
      }

      return signature;
    } catch (error) {
      throw new Error(`Failed to send cross-chain message: ${error.message}`);
    }
  }
}