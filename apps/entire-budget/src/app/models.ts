import { CRUD } from './pages/budget/budget.service';

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
  groupType: 'Expense' | 'Income';
  groupTotal: number;
  groupPercentOfWhole: number;
  groupName: string;
  newName?: string;
}

export interface LineItem {
  id: string;
  budgetGroupId: string;
  name: string;
  budgetedAmount: number;
  planned: number;
  dueDate: string;
  category: 'Expense' | 'Income';
  transactions: Transaction[];
  groupName: string;
  action?: CRUD;
}

export interface Transaction {
  id: string;
  transactionsId: string;
  amount: number;
  date: string;
  paidTo?: string;
}
