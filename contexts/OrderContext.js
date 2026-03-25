import { createContext, useContext, useState } from 'react';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [order, setOrder] = useState({});

  return (
	<OrderContext.Provider value={{ order, setOrder }}>
	  {children}
	</OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
