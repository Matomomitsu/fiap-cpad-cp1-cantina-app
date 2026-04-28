import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

import { createOrderRecord, finalizeOrderRecord } from '../utils/order';

const OrderContext = createContext(null);
const ORDER_HISTORY_STORAGE_KEY = '@cantina-fiap/order-history';

export function OrderProvider({ children }) {
  const [ordersState, setOrdersState] = useState({
    activeOrder: null,
    orderHistory: [],
  });
  const [isOrderHistoryLoaded, setIsOrderHistoryLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadOrderHistory() {
      try {
        const storedOrderHistory = await AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY);

        if (!storedOrderHistory) {
          return;
        }

        const parsedOrderHistory = JSON.parse(storedOrderHistory);

        if (!Array.isArray(parsedOrderHistory)) {
          console.error('Stored order history is not a valid array.');
          return;
        }

        if (!isMounted) {
          return;
        }

        setOrdersState((currentState) => ({
          ...currentState,
          orderHistory: parsedOrderHistory,
        }));
      } catch (error) {
        console.error('Failed to load order history from AsyncStorage.', error);
      } finally {
        if (isMounted) {
          setIsOrderHistoryLoaded(true);
        }
      }
    }

    loadOrderHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isOrderHistoryLoaded) {
      return;
    }

    AsyncStorage.setItem(
      ORDER_HISTORY_STORAGE_KEY,
      JSON.stringify(ordersState.orderHistory)
    ).catch((error) => {
      console.error('Failed to save order history to AsyncStorage.', error);
    });
  }, [isOrderHistoryLoaded, ordersState.orderHistory]);

  function startOrder(orderInput) {
    const nextOrder = createOrderRecord(orderInput);

    setOrdersState((currentState) => ({
      activeOrder: nextOrder,
      orderHistory: currentState.activeOrder
        ? [
            finalizeOrderRecord(currentState.activeOrder, nextOrder.createdAt),
            ...currentState.orderHistory,
          ]
        : currentState.orderHistory,
    }));

    return nextOrder;
  }

  function clearOrders() {
    setOrdersState({
      activeOrder: null,
      orderHistory: [],
    });
  }

  return (
    <OrderContext.Provider
      value={{
        activeOrder: ordersState.activeOrder,
        orderHistory: ordersState.orderHistory,
        startOrder,
        clearOrders,
      }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
