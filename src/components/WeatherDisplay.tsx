import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export const WeatherDisplay = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12
  });

  // Simulate weather updates (replace with real API call)
  useEffect(() => {
    const updateWeather = () => {
      setWeather({
        temperature: Math.round(18 + Math.random() * 10),
        condition: ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        humidity: Math.round(50 + Math.random() * 30),
        windSpeed: Math.round(5 + Math.random() * 20)
      });
    };

    const interval = setInterval(updateWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'Clear':
        return <Sun className="w-12 h-12 text-accent" />;
      case 'Cloudy':
        return <Cloud className="w-12 h-12 text-muted-foreground" />;
      case 'Light Rain':
        return <CloudRain className="w-12 h-12 text-secondary" />;
      default:
        return <Cloud className="w-12 h-12 text-primary" />;
    }
  };

  return (
    <Card className="bg-card border-border p-3">
      <div className="space-y-2">
        <div className="text-muted-foreground text-xs tracking-wider uppercase">
          Weather Conditions
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground">
              {weather.temperature}°C
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {weather.condition}
            </div>
          </div>
          <div className="scale-75">{getWeatherIcon()}</div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div>
            <div className="text-muted-foreground text-xs uppercase">Humidity</div>
            <div className="text-lg font-semibold text-foreground">{weather.humidity}%</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs uppercase flex items-center gap-1">
              <Wind className="w-3 h-3" />
              Wind
            </div>
            <div className="text-lg font-semibold text-foreground">{weather.windSpeed} km/h</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
