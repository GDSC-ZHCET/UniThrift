import { useState } from 'react';
import useFetchOrders from '../utils/useFetchOrders';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const OrderStatus = () => {
  const { orders, loading, error } = useFetchOrders();
  const [cancelling, setCancelling] = useState(false);
  const [actionOrderId, setActionOrderId] = useState(null);

  // Function to handle order cancellation
  const cancelOrder = async (orderId) => {
    try {
      setCancelling(true);
      setActionOrderId(orderId);
      
      await updateDoc(doc(db, 'orders', orderId), {
        order_status: 'cancelled'
      });
      
      // In a production app, you would refresh orders here or use a more reactive approach
      alert('Order cancelled successfully');
      window.location.reload(); // Simple reload for demo purposes
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order: ' + err.message);
    } finally {
      setCancelling(false);
      setActionOrderId(null);
    }
  };

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-semibold uppercase";
    
    switch(status.toLowerCase()) {
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'delivered':
        return `${baseClasses} bg-teal-100 text-teal-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mx-auto max-w-3xl mt-10">
      <p>Error loading orders: {error}</p>
    </div>
  );
  
  return (
    <div className="container mx-auto p-4 pt-[15vh]">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">Start shopping</a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="border border-gray-200 p-6 rounded-lg shadow-sm bg-white">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="font-bold text-lg">Order #{order.id.substring(0, 6)}</span>
                  <span className="text-sm text-gray-500 ml-3">
                    {order.created_at?.toDate().toLocaleString() || 'Processing'}
                  </span>
                </div>
                <span className={getStatusBadge(order.order_status)}>
                  {order.order_status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">ORDER DETAILS</h3>
                  <p className="mb-1 text-sm">
                    <span className="font-medium">Items:</span> {order.items.join(', ')}
                  </p>
                  <p className="mb-1 text-lg font-bold">
                    ₹{order.total_amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.payment_status === 'paid' ? 'Payment completed' : 'Payment pending'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">SHIPPING INFO</h3>
                  <p className="text-sm">{order.shipping_address}</p>
                </div>
              </div>
              
              {/* Order Actions */}
              <div className={`pt-4 mt-4 flex justify-end ${order.order_status !== 'cancelled' && order.order_status !== 'delivered' ? 'border-gray-300 border-t ' : ''}`}>
                {order.order_status !== 'cancelled' && order.order_status !== 'delivered' && (
                  <button 
                    onClick={() => cancelOrder(order.id)}
                    disabled={cancelling && actionOrderId === order.id}
                    className="bg-white border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                  >
                    {cancelling && actionOrderId === order.id ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;