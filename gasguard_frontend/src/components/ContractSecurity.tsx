import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { checkContractSecurity } from '@/utils/web3';

interface SecurityResult {
  isScam: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  reasons: string[];
}

const ContractSecurity = ({ contractAddress }: { contractAddress: string }) => {
  const [result, setResult] = useState<SecurityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contractAddress) return;
    setLoading(true);
    checkContractSecurity(contractAddress)
      .then(setResult)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [contractAddress]);

  return (
    <Card className="glass-card mt-6">
      <CardHeader>
        <CardTitle>Contract Security Check</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <div>Checking contract security...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && result && (
          <div>
            <div><strong>Scam:</strong> {result.isScam ? 'Yes' : 'No'}</div>
            <div><strong>Risk Level:</strong> {result.riskLevel}</div>
            <div><strong>Reasons:</strong>
              <ul className="list-disc pl-4">
                {result.reasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContractSecurity;
