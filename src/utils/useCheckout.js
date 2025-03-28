import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Creates an order record in Firestore
 * @param {Object} orderData - Order information
 * @param {string} orderData.buyerId - ID of buyer from UserContext
 * @param {Array} orderData.items - Array of items in the order
 * @param {string} orderData.sellerId - ID of seller from product
 * @param {string} orderData.shippingAddress - Delivery address
 * @param {number} orderData.totalAmount - Total order amount
 * @returns {Promise} - Result of the operation
 */
export const createOrder = async ({
  buyerId,
  items,
  sellerId,
  phone,
  shippingAddress,
  totalAmount
}) => {
  try {
    // Create order object
    const orderData = {
      buyer_id: buyerId,
      created_at: serverTimestamp(),
      items: items.map(item => item.title),
      order_status: "awaiting payment",
      payment_status: "pending", 
      seller_id: sellerId,
      seller_status: "pending",
      phone: phone,
      shipping_address: shippingAddress,
      total_amount: totalAmount
    };
    
    // Add order to Firestore
    const orderRef = await addDoc(collection(db, 'orders'), orderData);
    
    return {
      success: true,
      orderId: orderRef.id
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Custom hook to handle checkout process
 */
const useCheckout = () => {
  /**
   * Process checkout with cart items
   * @param {Array} cartItems - Items in cart
   * @param {string} shippingAddress - Delivery address
   * @param {Object} currentUser - Current user from UserContext
   */
  const processCheckout = async (cartItems, shippingAddress, currentUser, selectedDeliveryMethod) => {
    if (!currentUser) {
      throw new Error("User must be logged in to checkout");
    }
    
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    
    
    // Group items by seller
    const itemsBySeller = cartItems.reduce((acc, item) => {
      if (!acc[item.userId]) {
        acc[item.userId] = [];
      }
      acc[item.userId].push(item);
      return acc;
    }, {});
    
    // Create order for each seller
    const orderPromises = Object.entries(itemsBySeller).map(([sellerId, items]) => {
      let totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      if(selectedDeliveryMethod.title === 'Dorm Delivery'){
        totalAmount = totalAmount + 50;
      }
      return createOrder({
        buyerId: currentUser.uid,
        items,
        sellerId,
        phone: currentUser.phone,
        email: currentUser.email,
        shippingAddress,
        totalAmount
      });
    });
    
    return Promise.all(orderPromises);
  };
  
  return { processCheckout };
};

export default useCheckout;