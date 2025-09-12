import { TOrder } from '@utils-types';
export type FeedInfoUIProps = {
  feed: any;
  readyOrders: number[];
  pendingOrders: number[];
  currentOrder?: TOrder | null; 
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
