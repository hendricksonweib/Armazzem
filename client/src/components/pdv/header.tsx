import { useEffect, useState } from 'react';

export function PDVHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-mateus-yellow border-b-4 border-mateus-black">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-mateus-black text-mateus-yellow px-4 py-2 rounded-lg font-bold text-xl">
              MATEUS
            </div>
            <span className="text-mateus-black font-semibold text-lg">Armazém PDV</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-mateus-black font-medium">Caixa 01</span>
            <span className="text-mateus-black font-medium">
              {currentTime.toLocaleTimeString('pt-BR')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
