import { LineItem } from '../models';

export function isLineItem(item: any): item is LineItem {
  return 'transactions' in item;
}
