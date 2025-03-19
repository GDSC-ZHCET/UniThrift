import { useState, useEffect, useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import UserContext from './UserContext';

const useFetchOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!currentUser) {
                setLoading(false);
                return;
            }

            // console.log('Fetching orders for user:', currentUser.uid);
            try {
                // Create a query to filter orders by the logged-in user's ID
                const ordersQuery = query(
                    collection(db, 'orders'), 
                    where('buyer_id', '==', currentUser.uid)
                );
                
                const querySnapshot = await getDocs(ordersQuery);
                const ordersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setOrders(ordersList);
                // console.log('User orders:', ordersList);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentUser]);

    return { orders, loading, error };
};

export default useFetchOrders;