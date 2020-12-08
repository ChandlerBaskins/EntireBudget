import { of } from 'rxjs';

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
  paid?: number;
  dueDate: string;
  category: 'expense' | 'income';
  transactions: Transaction[];
  groupName: string;
}

// export interface Transactions {
//   lineItemId: string;
//   total: number;
//   transactions: Transaction[];
// }
export interface Transaction {
  id: string;
  transactionsId: string;
  amount: number;
  date: string;
  paidTo?: string;
}

const budget: Budget = {
  budgetMonth: 'November',
  budgetTotal: 0,
  id: 'string',
  groups: [
    {
      id: 'string',
      budgetId: 'string',
      groupType: 'Giving',
      groupTotal: 0,
      groupPercentOfWhole: 0,
      lineItems: [
        {
          name: 'Tithe',
          id: 'string',
          budgetGroupId: 'String',
          budgetedAmount: 200,
          paid: 100,
          category: 'expense',
          transactions: [
            {
              paidTo: 'Chapel',
              amount: 100,
              date: '7/10/2020',
              id: 'string',
              transactionsId: 'string',
            },
          ],
          groupName: 'Giving',
          dueDate: '',
        },
        {
          name: 'Donations',
          id: 'string',
          budgetGroupId: 'String',
          budgetedAmount: 200,
          paid: 100,
          category: 'expense',
          transactions: [
            {
              paidTo: 'Salvation Army',
              amount: 100,
              date: '07/10/2020',
              id: 'string',
              transactionsId: 'string',
            },
          ],
          groupName: 'Giving',
          dueDate: '',
        },
      ],
    },
    {
      budgetId: 'string',
      id: 'string',
      groupType: 'Housing',
      groupTotal: 0,
      groupPercentOfWhole: 0,
      lineItems: [
        {
          id: 'string',
          budgetGroupId: 'String',
          name: 'Mortgage',
          budgetedAmount: 585,
          paid: 585,
          category: 'expense',
          transactions: [
            {
              paidTo: 'USA BANK',
              amount: 585,
              date: '07/20/2020',
              id: 'string',
              transactionsId: 'string',
            },
          ],
          groupName: 'Housing',
          dueDate: '',
        },
      ],
    },
    {
      budgetId: 'string',
      groupType: 'Income',
      groupPercentOfWhole: 0,
      groupTotal: 0,
      id: 'string',
      lineItems: [
        {
          name: 'Paycheck',
          budgetGroupId: 'string',
          budgetedAmount: 2000,
          category: 'income',
          dueDate: '',
          groupName: 'Income',
          id: 'string',
          transactions: [
            {
              amount: 2000,
              date: '07/20/2020',
              id: 'string',
              transactionsId: 'string',
            },
          ],
        },
      ],
    },
  ],
};

export const data = of(budget);
