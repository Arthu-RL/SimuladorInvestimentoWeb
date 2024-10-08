import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBalance } from '@/providers/balanceProvider';
import { useMarketRefresh } from '@/providers/marketRefreshProvider';
import { formatCurrency } from '@/utils/currency';
import { Activity, Coins, DollarSign, Wallet } from 'lucide-react';
import { useMemo } from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

export function Summary() {
  const { remainingSeconds } = useMarketRefresh();
  const { balance } = useBalance();

  const data = useMemo(() => {
    return Array.from({ length: 7 })
      .map((_, index) => index + 1)
      .map(() => ({ revenue: Math.random() * balance }));
  }, [balance]);

  return (
    <div className='row-span-1 grid grid-cols-4 items-stretch gap-8 max-2xl:gap-4 max-xl:grid-cols-1'>
      <div className='flex h-full flex-col gap-6'>
        <div className='my-auto flex flex-col gap-1 px-0.5'>
          <h1 className='text-3xl font-medium max-2xl:text-2xl'>Simulador de Investimentos</h1>
          <p className='text-sm text-muted-foreground max-2xl:text-xs'>
            Controle seus investimentos e acompanhe o seu progresso.
          </p>
          <p className='text-sm font-medium text-muted-foreground max-2xl:text-xs'>
            Próxima Atualização em: {remainingSeconds}s
          </p>
        </div>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Saldo</CardTitle>
            <Wallet className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatCurrency(balance, 'BRL', 'pt-BR')}</div>
            <p className='text-xs text-muted-foreground'>+13% em relação ao dia anterior</p>
          </CardContent>
        </Card>
      </div>
      <Card className='self-end'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Patrimônio em Ativos</CardTitle>
          <Coins className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{formatCurrency(balance * 9.78, 'BRL', 'pt-BR')}</div>
          <p className='text-xs text-muted-foreground'>-5% em relação ao dia anterior</p>
        </CardContent>
      </Card>
      <Card className='self-end'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Rentabilidade Total</CardTitle>
          <DollarSign className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{formatCurrency(balance * 15.754, 'BRL', 'pt-BR')}</div>
          <p className='text-xs text-muted-foreground'>+5% em relação ao dia anterior</p>
        </CardContent>
      </Card>
      <Card className='grid grid-rows-[0.5fr_auto]'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Lucro Semanal</CardTitle>
          <Activity className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent className='grid grid-rows-[2rem_1rem_auto]'>
          <div className='text-2xl font-bold'>{formatCurrency(balance * 5.5, 'BRL', 'pt-BR')}</div>
          <p className='text-xs text-muted-foreground'>Lucro acumulado nesta semana</p>
          <div>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={data} margin={{ top: 25, right: 10, left: 10, bottom: 5 }}>
                <Line
                  type='monotone'
                  strokeWidth={2}
                  dataKey='revenue'
                  activeDot={{ r: 6, style: { fill: '#FFFFFF', opacity: 0.25 } }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
