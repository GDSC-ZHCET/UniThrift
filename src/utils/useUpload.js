import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const uploadProduct = async ({ title, description, price, category, imageUrl, sellerId, seller }) => {
    try {
        // Add product to Firestore with Cloudinary URL
        const productRef = await addDoc(collection(db, 'products'), {
            title,
            description,
            price: Number(price),
            imageUrl,
            category,
            sellerId,
            seller,
            createdAt: new Date().toISOString()
        });

        return {
            success: true,
            productId: productRef.id,
            imageUrl
        };
    } catch (error) {
        console.error('Error uploading product:', error);
        return {
            success: false,
            error: error.message
        };
    }
};