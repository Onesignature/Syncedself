# SyncedSelf

![SyncedSelf Logo](./public/Logo.png)

## 🧠 Cross-Chain Mental Health Platform

SyncedSelf is a revolutionary mental health platform that leverages blockchain technology to provide accessible, secure, and seamless therapy services across multiple chains including Ethereum, BSC, and Solana.

## 🌟 Features

- **AI-Powered Therapy**: Chat with our advanced AI therapist built on Together AI's LLaMA-4 model
- **Cross-Chain Accessibility**: Access your therapy services from any supported blockchain
- **Blockchain-Secured Privacy**: Your mental health data stays private and secure
- **Multi-Chain Support**: Works with Ethereum, BSC, Avalanche, Polygon, Arbitrum, Optimism, and Solana
- **Wallet Integration**: Seamless connection with both EVM wallets and Solana wallets

## 🛠️ Technology Stack

- React + TypeScript
- Tailwind CSS
- Vite
- Ethers.js for EVM interactions
- Solana Web3.js for Solana interactions
- LayerZero for cross-chain messaging
- Together AI API for AI therapy services

## 🔄 Cross-Chain Architecture

SyncedSelf uses LayerZero protocol to enable seamless messaging between different blockchains:

```typescript
// Send cross-chain messages via LayerZero
async sendMessage(dstChainId: number, message: string, options: { gasLimit?: number } = {}) {
  const endpoint = this.endpoints[dstChainId];
  if (!endpoint) {
    throw new Error(`No endpoint configured for chain ${dstChainId}`);
  }

  const destination = await this.signer.getAddress();
  const encoder = new TextEncoder();
  const payload = encoder.encode(message);
  const { nativeFee } = await this.estimateFees(dstChainId, message);

  return endpoint.send(
    dstChainId,
    ethers.utils.hexlify(destination),
    ethers.utils.hexlify(payload),
    await this.signer.getAddress(),
    ethers.constants.AddressZero,
    "0x",
    { value: nativeFee, gasLimit: options.gasLimit || 200000 }
  );
}
```

## 🌴 Solana Integration

SyncedSelf provides a dedicated Solana integration through our SolanaMessenger class, allowing Solana users to participate in cross-chain therapy sessions:

```typescript
// Send messages from Solana to other chains via LayerZero
async sendCrossChainMessage(wallet: any, message: string, destinationChain: number) {
  if (!wallet.publicKey) throw new Error('Wallet not connected');
  
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: LZ_PROGRAM_ID,
      lamports: lamports,
    })
  );
  
  // Transaction handling...
  const signature = await wallet.sendTransaction(transaction, this.connection);
  return signature;
}
```

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/syncedself.git
   cd syncedself
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

SyncedSelf requires configuration for blockchain providers and AI services:

1. Set up environment variables for Together AI API key
2. Configure LayerZero endpoints for production use
3. Configure Solana program IDs for cross-chain messaging

## 📱 Usage

1. Connect your wallet (MetaMask for EVM chains or Solana wallet)
2. Access the AI Therapist through the platform interface
3. Share insights cross-chain using the dedicated messaging feature
4. Access your therapy history from any supported blockchain

## 🔒 Security

- No sensitive mental health data is stored on-chain
- Only hashed references and cross-chain message payloads are transmitted
- All communication with the AI therapist is encrypted

## 🤝 Contributing

Contributions to SyncedSelf are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Thanks to LayerZero Labs for their cross-chain messaging protocol
- Thanks to Together AI for providing access to advanced language models
- Thanks to the Solana Foundation for blockchain support
