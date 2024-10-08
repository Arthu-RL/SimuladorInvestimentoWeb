import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useInvestmentAssets } from './InvestmentAssetsProvider';

type MarketRefreshState = { remainingSeconds: number };

const SIXTY_SECONDS = 60;
const ONE_SECOND_IN_MS = 1000;
const MarketRefreshProviderContext = createContext<MarketRefreshState>({ remainingSeconds: SIXTY_SECONDS });

const MarketRefreshProvider = ({ children }: { children: ReactNode }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(SIXTY_SECONDS);
  const { assets, updateAssets } = useInvestmentAssets();

  const refreshMarket = useCallback(() => {
    const updatedAssets = assets.map((assets) => {
      //FAZ TUA FUNÇÃO AQUI ARTHUR LITTLE DICK
      const randomValue = Math.random() * 10;
      const random = Math.random() - 0.5 > 0 ? -randomValue : randomValue;
      const sum = assets.value.current + random;
      const value = sum + random <= 0 ? 0.01 : sum;
      //GERAR VARIAÇÕES QUE NÃO SEJAM <= 0, NO MÍNOMO 0.01

      return {
        ...assets,
        value: { previous: assets.value.current, current: value },
      };
    });

    updateAssets(updatedAssets);
  }, [assets, updateAssets]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    function decrementRemainingSeconds() {
      const innerTimeout = setTimeout(() => {
        setRemainingSeconds((currentSeconds) => {
          console.log(currentSeconds);

          if (currentSeconds <= 1) {
            refreshMarket();
            return SIXTY_SECONDS;
          }

          return --currentSeconds;
        });

        decrementRemainingSeconds();
      }, ONE_SECOND_IN_MS);

      timeout = innerTimeout;
    }

    decrementRemainingSeconds();
    return () => clearTimeout(timeout);
  }, [refreshMarket]);

  return (
    <MarketRefreshProviderContext.Provider value={{ remainingSeconds }}>
      {children}
    </MarketRefreshProviderContext.Provider>
  );
};

const useMarketRefresh = () => {
  const context = useContext(MarketRefreshProviderContext);
  if (!context) throw new Error('useMarketRefresh must be used within a MarketRefreshProvider');
  return context;
};

export { MarketRefreshProvider, useMarketRefresh };
