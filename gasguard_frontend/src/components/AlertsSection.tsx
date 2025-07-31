import { motion } from 'framer-motion';
import { AlertTriangle, Shield, DollarSign, Clock, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Alert {
  id: string;
  type: 'scam' | 'gas' | 'approval' | 'general';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  actionable: boolean;
}

const AlertsSection = () => {
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'scam',
      title: 'Suspicious Token Detected',
      message: 'The token SCAM (0xdead...beef) appears to be a potential scam. Avoid interacting with this contract.',
      severity: 'high',
      timestamp: '5 minutes ago',
      actionable: true
    },
    {
      id: '2',
      type: 'gas',
      title: 'High Gas Fees Alert',
      message: 'Current gas fees are extremely high (85+ gwei). Consider waiting for lower fees.',
      severity: 'medium',
      timestamp: '15 minutes ago',
      actionable: false
    },
    {
      id: '3',
      type: 'approval',
      title: 'Unlimited Approval Warning',
      message: 'You have granted unlimited USDC approval to an unknown contract. Review and consider revoking.',
      severity: 'medium',
      timestamp: '1 hour ago',
      actionable: true
    },
    {
      id: '4',
      type: 'general',
      title: 'Security Scan Complete',
      message: 'Weekly security scan completed. 3 issues found and resolved.',
      severity: 'low',
      timestamp: '2 hours ago',
      actionable: false
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'scam': return AlertTriangle;
      case 'gas': return DollarSign;
      case 'approval': return Shield;
      default: return Shield;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-destructive/50 bg-destructive/5';
      case 'medium': return 'border-warning/50 bg-warning/5';
      case 'low': return 'border-success/50 bg-success/5';
      default: return 'border-muted/50 bg-muted/5';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'low': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const dismissAlert = (id: string) => {
    console.log(`Dismissing alert ${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="glass-card cyber-mesh">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 sm:gap-3 font-orbitron text-lg sm:text-xl">
            <div className="p-2 rounded-lg bg-destructive/20 animate-pulse-glow">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
            </div>
            <span className="neon-text">Security Alerts</span>
          </CardTitle>
          <p className="text-sm sm:text-base text-muted-foreground font-space">
            Real-time notifications about potential security threats
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const IconComponent = getAlertIcon(alert.type);
              
              return (
                <motion.div
                  key={alert.id}
                  className={`p-4 rounded-lg border transition-smooth hover:scale-[1.02] ${getAlertColor(alert.severity)}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${alert.severity === 'high' ? 'bg-destructive/20' : alert.severity === 'medium' ? 'bg-warning/20' : 'bg-success/20'}`}>
                        <IconComponent className={`h-4 w-4 ${alert.severity === 'high' ? 'text-destructive' : alert.severity === 'medium' ? 'text-warning' : 'text-success'}`} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{alert.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getSeverityColor(alert.severity)} variant="outline">
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                      className="h-6 w-6 p-0 hover:bg-muted/20"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 ml-11">
                    {alert.message}
                  </p>

                  {alert.actionable && (
                    <div className="ml-11">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-muted/20"
                      >
                        Take Action
                      </Button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {alerts.length === 0 && (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No security alerts at the moment</p>
              <p className="text-sm text-muted-foreground mt-1">Your wallet is secure! 🛡️</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AlertsSection;