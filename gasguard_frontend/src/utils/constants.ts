// Constants for GasGuard application

// API endpoints
export const API_ENDPOINTS = {
  ETHERSCAN_GAS: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle',
  ETHERSCAN_TXLIST: 'https://api.etherscan.io/api?module=account&action=txlist',
} as const;

// Gas fee thresholds (in gwei)
export const GAS_THRESHOLDS = {
  LOW: 20,
  MEDIUM: 40,
  HIGH: 60,
  EXTREME: 100,
} as const;

// Security risk levels
export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// Common DeFi protocols and their contract addresses
export const DEFI_PROTOCOLS = {
  UNISWAP_V2: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  UNISWAP_V3: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  SUSHISWAP: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
  COMPOUND: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B',
  AAVE: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
} as const;

// Alert types
export const ALERT_TYPES = {
  GAS: 'gas',
  SCAM: 'scam',
  APPROVAL: 'approval',
  GENERAL: 'general',
} as const;

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 1.0,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Social media links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/gasguard',
  TWITTER: 'https://twitter.com/gasguard',
  DISCORD: 'https://discord.gg/gasguard',
} as const;

// Environment variables (placeholder for OKX integration)
export const ENV_KEYS = {
  OKX_API_KEY: 'OKX_API_KEY',
  ETHERSCAN_API_KEY: 'ETHERSCAN_API_KEY',
  ALCHEMY_API_KEY: 'ALCHEMY_API_KEY',
} as const;