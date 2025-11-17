import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '../../services/slices/orderSlice';

export type TOrderInfoProps = {
  orderData?: TOrder | null;
};

export const OrderInfo: FC<TOrderInfoProps> = ({
  orderData: externalOrderData
}) => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.order.order);
  const orderByNumber = useSelector((state) => state.order.orderByNumber);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const { number } = useParams<{ number: string }>();
  const feedOrders = useSelector((state) => state.feed.orders);
  const profileOrders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    if (number && !orderByNumber) {
      dispatch(getOrderByNumber(+number));
    }
  }, [dispatch, number, orderByNumber]);

  const currentOrderData = useMemo(() => {
    if (externalOrderData) return externalOrderData;
    if (!number) return orderData;

    const orderNumber = parseInt(number);
    const feedOrder = feedOrders.find((order) => order.number === orderNumber);
    if (feedOrder) return feedOrder;
    if (orderByNumber && orderByNumber.number === orderNumber) {
      return orderByNumber;
    }
    return orderData;
  }, [
    externalOrderData,
    number,
    feedOrders,
    profileOrders,
    orderData,
    orderByNumber
  ]);

  const orderInfo = useMemo(() => {
    if (!currentOrderData || !ingredients.length) return null;
    const date = new Date(currentOrderData.createdAt);
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = currentOrderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      _id: currentOrderData._id,
      status: currentOrderData.status,
      name: currentOrderData.name,
      createdAt: currentOrderData.createdAt,
      updatedAt: currentOrderData.updatedAt,
      number: currentOrderData.number,
      ingredients: currentOrderData.ingredients,
      ingredientsInfo,
      date,
      total
    };
  }, [currentOrderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
