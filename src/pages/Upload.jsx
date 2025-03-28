import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import { uploadProduct } from '../utils/useUpload';
import uploadToCloudinary from '../utils/useImageUpload';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(null);
    
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);

    const categories = [
        { id: 'textbooks', name: 'Textbooks' },
        { id: 'electronics', name: 'Electronics' },
        { id: 'clothing', name: 'Clothing' },
        { id: 'furniture', name: 'Furniture' },
        { id: 'notes', name: 'Notes & Study Materials' },
        { id: 'sports', name: 'Sports Equipment' },
        { id: 'other', name: 'Other' },
    ];

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            // Create preview URL
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setError('Please login first');
            return;
        }

        if (!image) {
            setError('Please select an image');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // First upload image to Cloudinary
            const imageUrl = await uploadToCloudinary(image);

            // Then upload product data with image URL
            const result = await uploadProduct({
                title,
                description,
                price,
                category,
                imageUrl,
                sellerId: currentUser.uid,
                seller: currentUser.displayName,
            });

            if (result.success) {
                navigate('/');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Failed to upload product: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
                    List Your Item
                </h1>
                <p className="mt-2 text-center text-gray-600">
                    Share your unused items with the university community
                </p>

                <form onSubmit={handleSubmit} className="mt-12 lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        {/* Show error messages */}
                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">Item information</h2>

                            <div className="mt-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="block w-full bg-white border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <div className="mt-1">
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="block w-full bg-white border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price (₹)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="block w-full bg-white border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    required
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="4"
                                    className="block w-full bg-white border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Include details about condition, age, brand, and why you're selling.
                            </p>
                        </div>
                    </div>

                    {/* Image upload section */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="text-lg font-medium text-gray-900">Product image</h2>
                        
                        <div className="mt-4">
                            <div className="mt-1 border-2 border-gray-300 border-dashed rounded-lg px-6 pt-5 pb-6 flex justify-center">
                                <div className="space-y-1 text-center">
                                    {preview ? (
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="max-h-64 rounded-md object-contain mb-4"
                                            />
                                            <span className="text-sm text-gray-600">
                                                {image.name}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-gray-600 mt-2">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                                                >
                                                    <span>Upload an image</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleImageChange}
                                                        accept="image/*"
                                                        required
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {preview && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImage(null);
                                        setPreview(null);
                                    }}
                                    className="mt-2 text-sm text-red-600 hover:text-red-500"
                                >
                                    Remove image
                                </button>
                            )}
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mt-6 p-6">
                            <h3 className="text-base font-medium text-gray-900 mb-4">Guidelines for selling items</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Use clear photos in good lighting
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Be honest about the item&apos;s condition
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Set a fair price for fellow students
                                </li>
                            </ul>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full ${
                                    loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700'
                                } border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500`}
                            >
                                {loading ? 'Uploading...' : 'List Item for Sale'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Policy section for selling */}
            <section aria-labelledby="policies-heading" className="bg-gray-50 border-t border-gray-200">
                <h2 id="policies-heading" className="sr-only">
                    Our policies
                </h2>

                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:px-8">
                    <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
                        {[
                            {
                                name: 'Meet safely on campus',
                                description: 'Arrange to meet at public places like the student center or library for exchanges.',
                                icon: (
                                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ),
                            },
                            {
                                name: 'Student verification',
                                description: 'All users are verified students, creating a safer trading environment for everyone.',
                                icon: (
                                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                            },
                            {
                                name: 'Sustainable campus',
                                description: `By trading used items, we reduce waste and support our university's sustainability goals.`,
                                icon: (
                                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                ),
                            },
                        ].map((policy) => (
                            <div
                                key={policy.name}
                                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                            >
                                <div className="md:flex-shrink-0 flex justify-center">
                                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
                                        {policy.icon}
                                    </div>
                                </div>
                                <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                                    <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-900">{policy.name}</h3>
                                    <p className="mt-3 text-sm text-gray-500">{policy.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Upload;