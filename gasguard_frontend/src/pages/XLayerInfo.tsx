import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const XLayerInfo = () => (
  <div className="min-h-screen flex items-center justify-center py-20">
    <Card className="max-w-2xl mx-auto glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          XLayer Compatibility
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground mb-4">
          <strong>GasGuard</strong> is designed to be modular and chain-agnostic. To support <strong>XLayer</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Integrate XLayer RPC endpoints for wallet and transaction support.</li>
          <li>Fetch cross-chain gas and approval data using OKX DEX API with XLayer chainId.</li>
          <li>Enable contract security checks for XLayer smart contracts.</li>
          <li>Support cross-chain swaps and asset bridging via OKX DEX API.</li>
        </ul>
        <p className="mt-4 text-sm text-accent">
          This architecture allows GasGuard to extend security and DeFi features to XLayer and other EVM-compatible chains with minimal changes.
        </p>
        <a href="https://web3.okx.com/xlayer" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-primary underline font-medium">Learn more about XLayer</a>
      </CardContent>
    </Card>
  </div>
);

export default XLayerInfo;
