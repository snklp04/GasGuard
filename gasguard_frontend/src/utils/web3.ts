// Web3 utility functions for GasGuard
import { ethers } from 'ethers';

export interface GasData {
  low: number;
  standard: number;
  high: number;
  lastUpdated: string;
}

export interface TokenApproval {
  tokenAddress: string;
  spenderAddress: string;
  allowance: string;
  tokenName?: string;
  tokenSymbol?: string;
}

// Gas tracking utilities
export const fetchGasData = async (): Promise<GasData> => {
  try {
    const response = await fetch('/api/okx/gas');
    if (!response.ok) throw new Error('Failed to fetch gas data from backend');
    const okxData = await response.json();
    // Map OKX response to GasData format (adjust as needed based on actual API response)
    return {
      low: okxData.low || 0,
      standard: okxData.standard || 0,
      high: okxData.high || 0,
      lastUpdated: new Date().toLocaleTimeString()
    };
  } catch (error) {
    console.error('Failed to fetch gas data:', error);
    throw error;
  }
};

// Wallet connection utilities
export const connectWallet = async (): Promise<string | null> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return accounts[0];
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return null;
    }
  } else {
    console.error('MetaMask not installed');
    return null;
  }
};

// Token approval utilities
export const getTokenApprovals = async (address: string): Promise<TokenApproval[]> => {
  try {
    const response = await fetch(`/api/okx/approvals?address=${address}`);
    if (!response.ok) throw new Error('Failed to fetch token approvals from backend');
    const approvals = await response.json();
    return approvals;
  } catch (error) {
    console.error('Failed to fetch token approvals:', error);
    throw error;
  }
};

// Contract security utilities
export const checkContractSecurity = async (contractAddress: string): Promise<{
  isScam: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  reasons: string[];
}> => {
  try {
    const response = await fetch(`/api/okx/security?contractAddress=${contractAddress}`);
    if (!response.ok) throw new Error('Failed to check contract security from backend');
    const security = await response.json();
    return security;
  } catch (error) {
    console.error('Failed to check contract security:', error);
    throw error;
  }
};

// Gas estimation utilities
export const estimateTransactionGas = async (
  to: string,
  data: string,
  value?: string
): Promise<number> => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const gasEstimate = await provider.estimateGas({
        to,
        data,
        value: value ? ethers.parseEther(value) : undefined
      });
      return Number(gasEstimate);
    }
    throw new Error('No ethereum provider found');
  } catch (error) {
    console.error('Failed to estimate gas:', error);
    throw error;
  }
};

// Utility to format addresses
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Utility to format large numbers
export const formatNumber = (num: number): string => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
};

// Type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}