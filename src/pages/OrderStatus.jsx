import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { auth } from '../firebase';

const OrderStatus = () => {
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchOrder = async () => {
        const ordersRef = db.collection('orders');
        const query = ordersRef.where('buyer_id', '==', user.uid);
        const snapshot = await query.get();
        const orderData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            item: data.items[0],
            order_status: data.order_status,
            total_amount: data.total_amount,
            shipping_address: data.shipping_address,
          };
        })[0];
        setOrder(orderData);
      };

      fetchOrder();
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      {order && (
        <div className="border p-4 m-4 rounded shadow-md">
          <p className="font-bold">Product : {order.item.name}</p>
          <p className="text-gray-600">Order Status: {order.order_status}</p>
          <p className="text-gray-600">Price: ${order.total_amount}</p>
          <p className="text-gray-600">Shipping Address: {order.shipping_address}</p>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
