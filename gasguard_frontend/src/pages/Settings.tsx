import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Shield, Sliders, Palette } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/use-theme';
import { useState, useEffect } from 'react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  
  // State for all settings
  const [settings, setSettings] = useState({
    // Notifications
    highGasFeeAlerts: true,
    scamTokenDetection: true,
    approvalWarnings: false,
    
    // Security
    autoScanTransactions: true,
    blockSuspiciousContracts: false,
    requireConfirmations: true,
    
    // Interface
    compactView: false,
    advancedMode: true,
    
    // Gas Fee Threshold
    gasThreshold: 50
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('gasguard-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('gasguard-settings', JSON.stringify(settings));
  }, [settings]);

  // Handle toggle changes
  const handleToggle = (settingKey: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [settingKey]: !prev[settingKey]
    }));
  };

  // Handle gas threshold change
  const handleGasThresholdChange = (value: number) => {
    setSettings(prev => ({
      ...prev,
      gasThreshold: value
    }));
  };

  const settingsGroups = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { 
          label: 'High Gas Fee Alerts', 
          description: 'Get notified when gas fees exceed threshold',
          key: 'highGasFeeAlerts' as keyof typeof settings,
          checked: settings.highGasFeeAlerts
        },
        { 
          label: 'Scam Token Detection', 
          description: 'Alerts for suspicious token interactions',
          key: 'scamTokenDetection' as keyof typeof settings,
          checked: settings.scamTokenDetection
        },
        { 
          label: 'Approval Warnings', 
          description: 'Notifications for risky token approvals',
          key: 'approvalWarnings' as keyof typeof settings,
          checked: settings.approvalWarnings
        }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      settings: [
        { 
          label: 'Auto-Scan Transactions', 
          description: 'Automatically scan transactions for risks',
          key: 'autoScanTransactions' as keyof typeof settings,
          checked: settings.autoScanTransactions
        },
        { 
          label: 'Block Suspicious Contracts', 
          description: 'Prevent interactions with flagged contracts',
          key: 'blockSuspiciousContracts' as keyof typeof settings,
          checked: settings.blockSuspiciousContracts
        },
        { 
          label: 'Require Confirmations', 
          description: 'Extra confirmation for high-risk actions',
          key: 'requireConfirmations' as keyof typeof settings,
          checked: settings.requireConfirmations
        }
      ]
    },
    {
      title: 'Interface',
      icon: Palette,
      settings: [
        { 
          label: 'Dark Mode', 
          description: 'Use dark theme interface',
          key: 'darkMode' as keyof typeof settings,
          checked: theme === 'dark',
          isThemeToggle: true
        },
        { 
          label: 'Compact View', 
          description: 'Show more information in less space',
          key: 'compactView' as keyof typeof settings,
          checked: settings.compactView
        },
        { 
          label: 'Advanced Mode', 
          description: 'Show technical details and expert features',
          key: 'advancedMode' as keyof typeof settings,
          checked: settings.advancedMode
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              className="mb-4 hover:bg-white/10"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-lg text-muted-foreground">
              Customize your GasGuard experience and security preferences.
            </p>
          </motion.div>

          <div className="space-y-6">
            {settingsGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <group.icon className="h-5 w-5 text-primary" />
                      {group.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {group.settings.map((setting) => (
                      <div key={setting.label} className="flex items-center justify-between p-3 rounded-lg glass border border-white/10">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{setting.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {setting.description}
                          </div>
                        </div>
                        <Switch 
                          checked={setting.checked}
                          onCheckedChange={
                            setting.isThemeToggle 
                              ? toggleTheme 
                              : () => handleToggle(setting.key)
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Gas Fee Threshold */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-primary" />
                    Gas Fee Threshold
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg glass border border-white/10">
                      <div className="font-medium text-sm mb-2">Alert Threshold</div>
                      <div className="text-xs text-muted-foreground mb-3">
                        Get notified when gas fees exceed this amount
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={settings.gasThreshold}
                        onChange={(e) => handleGasThresholdChange(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>20 gwei</span>
                        <span className="text-primary font-medium">{settings.gasThreshold} gwei</span>
                        <span>100 gwei</span>
                      </div>
                    </div>
                    
                    {/* Reset Settings Button */}
                    <div className="p-3 rounded-lg glass border border-white/10">
                      <div className="font-medium text-sm mb-2">Reset Settings</div>
                      <div className="text-xs text-muted-foreground mb-3">
                        Reset all settings to their default values
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="light-theme-black-text"
                        onClick={() => {
                          setSettings({
                            highGasFeeAlerts: true,
                            scamTokenDetection: true,
                            approvalWarnings: false,
                            autoScanTransactions: true,
                            blockSuspiciousContracts: false,
                            requireConfirmations: true,
                            compactView: false,
                            advancedMode: true,
                            gasThreshold: 50
                          });
                        }}
                      >
                        Reset to Defaults
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;