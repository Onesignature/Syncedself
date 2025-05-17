import { ethers } from 'ethers';
import { ChainId } from '@layerzerolabs/lz-sdk';

// Basic LayerZero endpoint ABI for cross-chain messaging
const LZ_ENDPOINT_ABI = [
  "function send(uint16 _dstChainId, bytes calldata _destination, bytes calldata _payload, address payable _refundAddress, address _zroPaymentAddress, bytes calldata _adapterParams) external payable",
  "function estimateFees(uint16 _dstChainId, address _userApplication, bytes calldata _payload, bool _payInZRO, bytes calldata _adapterParam) external view returns (uint nativeFee, uint zroFee)"
];

// Example endpoint addresses (replace with actual addresses for production)
const LZ_ENDPOINTS = {
  [ChainId.ETHEREUM]: "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675",
  [ChainId.BSC]: "0x3c2269811836af69497E5F486A85D7316753cf62",
};

export class LayerZeroMessenger {
  private provider: ethers.providers.Web3Provider;
  private signer: ethers.Signer;
  private endpoints: { [chainId: number]: ethers.Contract } = {};

  constructor(provider: ethers.providers.Web3Provider) {
    this.provider = provider;
    this.signer = provider.getSigner();
    
    // Initialize endpoints
    Object.entries(LZ_ENDPOINTS).forEach(([chainId, address]) => {
      this.endpoints[Number(chainId)] = new ethers.Contract(
        address,
        LZ_ENDPOINT_ABI,
        this.signer
      );
    });
  }

  async estimateFees(
    dstChainId: number,
    payload: string
  ): Promise<{ nativeFee: ethers.BigNumber; zroFee: ethers.BigNumber }> {
    const endpoint = this.endpoints[dstChainId];
    if (!endpoint) {
      throw new Error(`No endpoint configured for chain ${dstChainId}`);
    }

    const [nativeFee, zroFee] = await endpoint.estimateFees(
      dstChainId,
      await this.signer.getAddress(),
      ethers.utils.toUtf8Bytes(payload),
      false,
      "0x"
    );

    return { nativeFee, zroFee };
  }

  async sendMessage(
    dstChainId: number,
    message: string,
    options: { gasLimit?: number } = {}
  ): Promise<ethers.ContractTransaction> {
    const endpoint = this.endpoints[dstChainId];
    if (!endpoint) {
      throw new Error(`No endpoint configured for chain ${dstChainId}`);
    }

    const destination = await this.signer.getAddress();
    const payload = ethers.utils.toUtf8Bytes(message);
    const { nativeFee } = await this.estimateFees(dstChainId, message);

    // Send the cross-chain message
    return endpoint.send(
      dstChainId,
      ethers.utils.hexlify(destination),
      payload,
      await this.signer.getAddress(),
      ethers.constants.AddressZero,
      "0x",
      { value: nativeFee, gasLimit: options.gasLimit || 200000 }
    );
  }
}