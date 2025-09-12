import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { useParams } from 'react-router-dom';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, feed, loading } = useSelector((state) => state.feed);
  const { number } = useParams();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  //поиск заказа по номеру из url
  const currentOrder = number
    ? orders.find((order) => order.number === parseInt(number))
    : null;

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={handleGetFeeds}
      loading={loading}
      feed={feed}
      currentOrder={currentOrder}
    />
  );
};
