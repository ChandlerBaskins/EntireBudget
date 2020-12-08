export interface Budget {
  id: string;
  groups: BudgetGroup[];
  budgetMonth: string;
  budgetTotal: number;
}

export interface BudgetGroup {
  id: string;
  budgetId: string;
  lineItems: LineItem[];
  groupType: string;
  groupTotal: number;
  groupPercentOfWhole: number;
}

export interface LineItem {
  id: string;
  budgetGroupId: string;
  name: string;
  budgetedAmount: number;
  planned: number;
  dueDate: string;
  category: 'expense' | 'income';
  transactions: Transaction[];
  groupName: string;
}

export interface Transaction {
  id: string;
  transactionsId: string;
  amount: number;
  date: string;
  paidTo?: string;
}
