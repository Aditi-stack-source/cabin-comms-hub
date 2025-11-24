import { TimeDisplay } from '@/components/TimeDisplay';
import { WeatherDisplay } from '@/components/WeatherDisplay';
import { TrainDisplay } from '@/components/TrainDisplay';
import { CircuitBoardDisplay } from '@/components/CircuitBoardDisplay';
import { Activity } from 'lucide-react';

const Index = () => {
  return (
    <div className="h-screen bg-background p-3 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-2 h-full flex flex-col">
        {/* Header */}
        <header className="border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary animate-pulse" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                CABIN SIDE CONTROL
              </h1>
              <p className="text-muted-foreground text-xs tracking-wider uppercase">
                Real-time Transit Monitoring System
              </p>
            </div>
          </div>
        </header>

        {/* Top Row - Time & Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <TimeDisplay />
          <WeatherDisplay />
        </div>

        {/* Train Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-0">
          <TrainDisplay direction="upline" />
          <TrainDisplay direction="downline" />
        </div>

        {/* Circuit Board Display */}
        <div className="flex-shrink-0">
          <CircuitBoardDisplay />
        </div>

        {/* Footer */}
        <footer className="border-t border-border pt-1 text-center flex-shrink-0">
          <p className="text-muted-foreground text-[10px] tracking-wider">
            System Status: <span className="text-status-online">OPERATIONAL</span> • 
            Last Update: {new Date().toLocaleTimeString('en-US', { hour12: false })}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
