import { formatCurrency } from './currency';

function translateAssetCategory(category: string) {
  const translations: Record<string, string> = {
    Fiat: 'Moedas',
    Crypto: 'Criptomoedas',
    Commodity: 'Commodities',
  };

  return translations[category] ?? category;
}

function translateAssetProfile(profile: string) {
  const translations: Record<string, string> = {
    'low-risk': 'Conservador',
    'medium-risk': 'Moderado',
    'high-risk': 'Agressivo',
  };

  return translations[profile] ?? profile;
}

function translateTransactionType(transaction: string) {
  const translations: Record<string, string> = {
    Purchase: 'Compra',
    Sale: 'Venda',
  };

  return translations[transaction] ?? transaction;
}

function getProfitStatus(profit: number) {
  if (profit < 0) return 'Prejuízo';
  if (profit > 0) return 'Lucro';
  return 'Estável';
}

function getProfitTextColor(profit: number) {
  if (profit < 0) return 'text-red-600';
  if (profit > 0) return 'text-green-500';
  return 'text-foreground';
}

function generateDifferenceText(previousValue: number, difference: number) {
  const value = previousValue !== 0 ? difference.toFixed(2) : formatCurrency(difference, 'BRL', 'pt-BR');
  const suffix = previousValue !== 0 ? '%' : '';
  const prefix = difference > 0 ? '+' : '';
  return `${prefix}${value}${suffix}`;
}

export {
  getProfitStatus,
  getProfitTextColor,
  translateAssetCategory,
  translateAssetProfile,
  translateTransactionType,
  generateDifferenceText,
};
