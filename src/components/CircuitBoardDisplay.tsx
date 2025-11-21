import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Zap, Radio, Thermometer, Gauge, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CircuitNode {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'online' | 'warning' | 'offline';
  power: number;
  x: number;
  y: number;
}

export const CircuitBoardDisplay = () => {
  const [nodes, setNodes] = useState<CircuitNode[]>([
    { id: 'power', name: 'Power Core', icon: <Zap className="w-4 h-4" />, status: 'online', power: 98, x: 20, y: 50 },
    { id: 'comms', name: 'Communications', icon: <Radio className="w-4 h-4" />, status: 'online', power: 87, x: 40, y: 30 },
    { id: 'hvac', name: 'HVAC System', icon: <Thermometer className="w-4 h-4" />, status: 'online', power: 92, x: 60, y: 50 },
    { id: 'sensors', name: 'Sensor Array', icon: <Gauge className="w-4 h-4" />, status: 'warning', power: 73, x: 40, y: 70 },
    { id: 'control', name: 'Control Unit', icon: <Cpu className="w-4 h-4" />, status: 'online', power: 95, x: 80, y: 50 },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" />, status: 'online', power: 100, x: 60, y: 30 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        power: Math.max(60, Math.min(100, node.power + (Math.random() - 0.5) * 5)),
        status: node.power < 75 ? 'warning' : node.power < 90 ? 'online' : 'online'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-status-online';
      case 'warning': return 'text-status-delayed';
      case 'offline': return 'text-status-offline';
      default: return 'text-muted-foreground';
    }
  };

  const connections = [
    { from: 'power', to: 'comms' },
    { from: 'power', to: 'hvac' },
    { from: 'power', to: 'control' },
    { from: 'comms', to: 'security' },
    { from: 'hvac', to: 'sensors' },
    { from: 'control', to: 'security' },
    { from: 'sensors', to: 'control' },
  ];

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-primary" />
          CIRCUIT BOARD - SYSTEM TOPOLOGY
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] bg-background/50 rounded-lg border border-border/50 overflow-hidden">
          {/* Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {connections.map((conn, idx) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              return (
                <line
                  key={idx}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary/40 animate-pulse"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                />
              );
            })}
          </svg>

          {/* Circuit Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {/* Pulsing Ring */}
              <div className={`absolute inset-0 rounded-full ${getStatusColor(node.status)} opacity-20 animate-ping`} 
                   style={{ width: '60px', height: '60px', left: '-20px', top: '-20px' }} />
              
              {/* Node Circle */}
              <div className={`relative w-10 h-10 rounded-full border-2 ${getStatusColor(node.status)} bg-background/90 backdrop-blur-sm flex items-center justify-center transition-all group-hover:scale-110`}>
                {node.icon}
              </div>

              {/* Info Card on Hover */}
              <div className="absolute left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <Card className="w-48 border-primary/30 bg-background/95 backdrop-blur-sm">
                  <CardContent className="p-3 space-y-1">
                    <div className="font-bold text-sm">{node.name}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={node.status === 'online' ? 'default' : 'destructive'} className="text-xs">
                        {node.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Power:</span>
                      <span className={getStatusColor(node.status)}>{node.power.toFixed(1)}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}

          {/* Corner Decorations */}
          <div className="absolute top-2 left-2 text-primary/30 text-xs font-mono">NODE MAP</div>
          <div className="absolute top-2 right-2 text-primary/30 text-xs font-mono">v2.3.1</div>
          <div className="absolute bottom-2 left-2 text-primary/30 text-xs font-mono">
            SYS: {nodes.filter(n => n.status === 'online').length}/{nodes.length}
          </div>
          <div className="absolute bottom-2 right-2 text-status-online text-xs font-mono animate-pulse">
            ● ACTIVE
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-online animate-pulse" />
            <span className="text-muted-foreground">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-delayed animate-pulse" />
            <span className="text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-offline" />
            <span className="text-muted-foreground">Offline</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
