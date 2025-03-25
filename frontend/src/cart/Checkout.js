import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get items, subtotal, and promoCode from location state (passed from Cart)
    const { items, subtotal, discount, promoCode: generatedPromoCode } = location.state || {};

    // State to store user-entered promo code and final total
    const [enteredPromoCode, setEnteredPromoCode] = useState('');
    const [total, setTotal] = useState(subtotal);

    useEffect(() => {
        // If a valid promo code is entered, apply the discount
        if (enteredPromoCode && enteredPromoCode === generatedPromoCode) {
            const discountPercent = 0.5; // Assuming it's a 50% discount
            const discountedTotal = (subtotal * (1 - discountPercent)).toFixed(2);            
            setTotal(discountedTotal);
        } else {
            setTotal(subtotal); // No discount, keep subtotal as total
        }
    }, [enteredPromoCode, generatedPromoCode, subtotal]);

    const handlePromoCodeChange = (e) => {
        setEnteredPromoCode(e.target.value);
    };

    const handlePayment = () => {

        // Navigate to ItemDetails with items and other details in the state
        navigate('/itemdetails', { state: { items, subtotal, discount, total } });
    };
    

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Checkout</h2>
            <div style={{ marginBottom: '20px' }}>
                <h3>Order Summary</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ textAlign: 'left', padding: '10px' }}>Image</th>
                            <th style={{ textAlign: 'left', padding: '10px' }}>Description</th>
                            <th style={{ textAlign: 'left', padding: '10px' }}>Quantity</th>
                            <th style={{ textAlign: 'left', padding: '10px' }}>Price</th>
                            <th style={{ textAlign: 'left', padding: '10px' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                                <td style={{ padding: '10px' }}>
                                    <img
                                        src={`http://localhost:3000/Images/${item.image}`}
                                        alt={item.name}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </td>
                                <td style={{ padding: '10px' }}>{item.name}</td>
                                <td style={{ padding: '10px' }}>{item.quantity}</td>
                                <td style={{ padding: '10px' }}>Rs{item.price}</td>
                                <td style={{ padding: '10px' }}>Rs{(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Show promo code input only if a promo code was generated */}
            {generatedPromoCode && (
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="promoCode">Enter Promo Code:</label>
                    <input
                        type="text"
                        id="promoCode"
                        value={enteredPromoCode}
                        onChange={handlePromoCodeChange}
                        placeholder="Enter promo code"
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                    {enteredPromoCode === generatedPromoCode && (
                        <p style={{ color: 'green' }}>Promo code applied! 50% discount applied to total.</p>
                    )}
                    {enteredPromoCode && enteredPromoCode !== generatedPromoCode && (
                        <p style={{ color: 'red' }}>Invalid promo code. Please try again.</p>
                    )}
                </div>
            )}

            <div style={{ textAlign: 'right' }}>
                <p>Subtotal: Rs{subtotal}</p>
                {enteredPromoCode === generatedPromoCode && (
                    <p>Discount: 50% applied</p>
                )}
                <h3>Total: Rs{total}</h3>
                <button
                    onClick={handlePayment}
                    style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
                >
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default Checkout;
