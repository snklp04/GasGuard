import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ExternalLink, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { API_ENDPOINTS } from '@/config/api';

interface Approval {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  spender: string;
  spenderName: string;
  allowance: string;
  riskLevel: 'low' | 'medium' | 'high';
  lastUsed: string;
}

interface TokenApprovalsProps {
  address: string;
}

const TokenApprovals = ({ address }: TokenApprovalsProps) => {
  // ...existing code...
  const [approvals, setApprovals] = useState<Approval[]>([]);
  useEffect(() => {
    if (!address) return;
    fetch(API_ENDPOINTS.APPROVALS(address))
      .then(res => res.json())
      .then(data => setApprovals(data.approvals || []));
  }, [address]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-success/20 text-success border-success/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const handleRevoke = async (id: string) => {
    // Placeholder for revoke logic
    console.log(`Revoking approval ${id}`);
    await fetch(API_ENDPOINTS.APPROVALS_REVOKE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    setApprovals(approvals => approvals.filter(a => a.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass-card cyber-mesh h-full">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 sm:gap-3 font-orbitron text-lg sm:text-xl">
            <div className="p-2 rounded-lg bg-secondary/20 glow-secondary animate-pulse-glow">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
            </div>
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Token Approvals
            </span>
          </CardTitle>
          <p className="text-sm sm:text-base text-muted-foreground font-space">
            Monitor and revoke unlimited token approvals to protect your assets
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 sm:space-y-4">
            {approvals.map((approval, index) => (
              <motion.div
                key={approval.id}
                className="p-3 sm:p-4 lg:p-5 rounded-xl glass border border-primary/20 hover:bg-white/5 transition-cyber group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/20 flex items-center justify-center cyber-glow group-hover:animate-cyber-pulse">
                      <span className="text-sm sm:text-base font-orbitron font-bold text-primary">
                        {approval.tokenSymbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-orbitron font-bold text-sm sm:text-base">{approval.tokenName}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground font-space">{approval.tokenSymbol}</div>
                    </div>
                  </div>
                  <Badge className={getRiskColor(approval.riskLevel)} variant="outline">
                    {approval.riskLevel.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                  <div>
                    <div className="text-xs font-space text-muted-foreground uppercase tracking-wide">SPENDER</div>
                    <div className="text-sm font-medium text-accent">{approval.spenderName}</div>
                    <div className="text-xs text-muted-foreground font-mono break-all">{approval.spender}</div>
                  </div>
                  <div>
                    <div className="text-xs font-space text-muted-foreground uppercase tracking-wide">ALLOWANCE</div>
                    <div className="text-sm font-bold text-foreground">{approval.allowance}</div>
                  </div>
                  <div>
                    <div className="text-xs font-space text-muted-foreground uppercase tracking-wide">LAST USED</div>
                    <div className="text-sm font-medium text-foreground">{approval.lastUsed}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button variant="glass" size="sm" className="text-xs sm:text-sm font-space">
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                    View on Etherscan
                  </Button>
                  <Button
                    variant={approval.riskLevel === 'high' ? 'destructive' : 'neon'}
                    size="sm"
                    onClick={() => handleRevoke(approval.id)}
                    className="font-space"
                  >
                    <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    Revoke
                  </Button>
                </div>

                {approval.riskLevel === 'high' && (
                  <div className="mt-3 p-3 rounded-xl glass border border-destructive/30 bg-destructive/5">
                    <div className="flex items-center gap-2 text-destructive text-xs sm:text-sm">
                      <AlertTriangle className="h-4 w-4 animate-pulse" />
                      <span className="font-orbitron font-bold">High Risk!</span> Consider revoking immediately.
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl glass border border-secondary/30 bg-secondary/5">
            <div className="flex items-center gap-2 sm:gap-3 text-secondary text-sm sm:text-base">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
              <span className="font-orbitron font-bold">Pro Tip:</span>
              <span className="text-muted-foreground font-space">
                Regularly review and revoke unused approvals to minimize security risks
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TokenApprovals;