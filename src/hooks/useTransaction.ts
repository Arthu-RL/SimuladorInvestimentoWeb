import { PurchasedAsset } from '@/lib/schemas/user.schema';
import { useInvestmentAssets } from '@/providers/InvestmentAssetsProvider';
import { useUserAccount } from '@/providers/userAccountProvider';
import { formatCurrency } from '@/utils/currency';
import { isToday } from 'date-fns';
import { toast } from 'sonner';

export const useTransaction = () => {
  const { user, updateUser } = useUserAccount();
  const { assets } = useInvestmentAssets();

  function buyAsset({ id, quantity, purchaseValue }: PurchasedAsset) {
    const walletAsset = user.currentWallet.find((asset) => asset.id === id);
    const asset = assets.find((asset) => asset.id === id);

    const assetBeingPurchased = walletAsset
      ? {
          id: walletAsset.id,
          quantity: (walletAsset.quantity += quantity),
          purchaseValue: (walletAsset.purchaseValue = purchaseValue),
        }
      : { id, quantity, purchaseValue };

    const transactionValue = assetBeingPurchased.purchaseValue * assetBeingPurchased.quantity;
    const currentWallet = [...user.currentWallet, assetBeingPurchased];
    const currentTransaction = { id, quantity, purchaseValue, type: 'Purchase' as const };
    const currentBalance = user.currentBalance - transactionValue;

    user.currentBalance = currentBalance;
    user.currentWallet = currentWallet;
    user.transactionHistory.push(currentTransaction);

    const walletHistory = user.walletHistory.at(-1);
    const balanceHistory = user.balanceHistory.at(-1);

    if (!balanceHistory || !isToday(balanceHistory.date)) {
      user.balanceHistory.push({ date: new Date(), balance: currentBalance });
    } else balanceHistory.balance = currentBalance;

    if (!walletHistory || !isToday(walletHistory.date)) {
      user.walletHistory.push({ date: new Date(), wallet: currentWallet });
    } else walletHistory.wallet = currentWallet;

    toast.message('Ativo adquirido! 🎉', {
      description: `Você acaba de comprar ${quantity} unidades de ${asset?.name}. Acompanhe de perto o seu desempenho!`,
    });

    updateUser(user);
  }

  function sellAsset({ id, quantity }: PurchasedAsset) {
    const asset = assets.find((asset) => asset.id === id);
    const walletAsset = user.currentWallet.find((asset) => asset.id === id);
    if (!asset || !walletAsset) return;

    const transactionValue = asset.value.current * quantity;
    const isAssetBeingRemoved = quantity === walletAsset.quantity;
    const currentBalance = user.currentBalance + transactionValue;

    const assetProfit =
      asset.value.current * walletAsset.quantity - walletAsset.purchaseValue * walletAsset.quantity;

    const currentProfitability = user.currentProfitability + assetProfit;

    const currentWallet = isAssetBeingRemoved
      ? user.currentWallet.filter((asset) => asset.id !== id)
      : [
          ...user.currentWallet.filter((asset) => asset.id !== id),
          {
            id: walletAsset.id,
            purchaseValue: walletAsset.purchaseValue,
            quantity: (walletAsset.quantity -= quantity),
          },
        ];

    const currentTransaction = {
      id,
      quantity,
      purchaseValue: walletAsset.purchaseValue,
      type: 'Sale' as const,
    };

    user.currentBalance = currentBalance;
    user.currentWallet = currentWallet;
    user.currentProfitability = currentProfitability > 0 ? currentProfitability : 0;
    user.transactionHistory.push(currentTransaction);

    const walletHistory = user.walletHistory.at(-1);
    const balanceHistory = user.balanceHistory.at(-1);
    const profitabilityHistory = user.profitabilityHistory.at(-1);

    if (!balanceHistory || !isToday(balanceHistory.date)) {
      user.balanceHistory.push({ date: new Date(), balance: currentBalance });
    } else balanceHistory.balance = currentBalance;

    if (!walletHistory || !isToday(walletHistory.date)) {
      user.walletHistory.push({ date: new Date(), wallet: currentWallet });
    } else walletHistory.wallet = currentWallet;

    if (!profitabilityHistory || !isToday(profitabilityHistory.date)) {
      user.profitabilityHistory.push({ date: new Date(), profitability: currentProfitability });
    } else profitabilityHistory.profitability = currentProfitability;

    if (assetProfit > 0) {
      toast.message('Parabéns! 🎉', {
        description: `Você registrou um lucro de ${formatCurrency(assetProfit, 'BRL', 'pt-BR')}. Continue assim!`,
      });
    }

    if (assetProfit < 0) {
      toast.message('Não foi dessa vez... 😕', {
        description: `Você registrou uma perda de ${formatCurrency(assetProfit, 'BRL', 'pt-BR')}. Não desanime, é parte do processo.`,
      });
    }

    if (assetProfit === 0) {
      toast.message('Tudo em equilíbrio!', {
        description: 'Você não teve lucros nem perdas. Um bom momento para revisar suas estratégias!',
      });
    }

    updateUser(user);
  }

  return { buyAsset, sellAsset };
};
