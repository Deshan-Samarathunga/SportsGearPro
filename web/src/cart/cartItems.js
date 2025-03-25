import React, { useEffect, useState } from 'react';

const CartItemsPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId'); // Get user ID from localStorage

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!userId) {
                setError('User not logged in');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/api/cart/items?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                const data = await response.json();
                setCartItems(data.items); // Adjust this according to your API response structure
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Stored Cart Items</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Item Name</th>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Quantity</th>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Price</th>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Promo Code</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <tr key={item.productId} style={{ borderBottom: '1px solid #ccc' }}>
                                <td style={{ padding: '10px' }}>{item.name}</td>
                                <td style={{ padding: '10px' }}>{item.quantity}</td>
                                <td style={{ padding: '10px' }}>£{(item.price * item.quantity).toFixed(2)}</td>
                                <td style={{ padding: '10px' }}>{item.promoCode || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                                Your cart is empty
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CartItemsPage;
