import { TOrder } from '@utils-types';

export type FeedUIProps = {
  orders: TOrder[];
  handleGetFeeds: () => void;
  loading: boolean;
  feed: {
    total: number;
    totalToday: number;
  };
};
