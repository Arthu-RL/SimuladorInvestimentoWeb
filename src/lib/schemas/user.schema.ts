import { z } from 'zod';

const transactionType = ['Purchase', 'Sale'] as const;

const purchasedAssetSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number(),
  totalInvestment: z.number(),
  type: z.enum(transactionType),
  purchasePrice: z.number(),
  sellingPrice: z.number(),
});

const userSchema = z.object({
  currentBalance: z.number(),
  currentProfitability: z.number(),
  currentWallet: z.array(purchasedAssetSchema),
  transactionHistory: z.array(purchasedAssetSchema),
  balanceHistory: z.array(z.object({ date: z.coerce.date(), balance: z.number() })),
  profitabilityHistory: z.array(z.object({ date: z.coerce.date(), profitability: z.number() })),
  walletHistory: z.array(z.object({ date: z.coerce.date(), wallet: z.array(purchasedAssetSchema) })),
});

type User = z.infer<typeof userSchema>;
type TransactionType = (typeof transactionType)[number];
type PurchasedAsset = z.infer<typeof purchasedAssetSchema>;

export type { User, PurchasedAsset, TransactionType };
export { userSchema, purchasedAssetSchema };
