import React, { useState, useEffect } from 'react';
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import { CreditCard, MapPin, CheckCircle } from 'lucide-react';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data && data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else if (data) {
                setData({ ...data, clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
        // eslint-disable-next-line
    }, []);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const buy = () => {
        setData({ ...data, loading: true });
        let nonce;
        data.instance.requestPaymentMethod()
            .then(payData => {
                nonce = payData.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: data.address
                        };

                        createOrder(userId, token, createOrderData)
                            .then(orderResponse => {
                                emptyCart(() => {
                                    setRun(!run);
                                    setData({
                                        ...data,
                                        loading: false,
                                        success: true
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ ...data, loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ ...data, loading: false });
                    });
            })
            .catch(error => {
                setData({ ...data, error: error.message, loading: false });
            });
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {data.clientToken !== null && products.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-input-group">
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={14} className="text-secondary" /> Delivery / Hotel Address
                        </label>
                        <textarea
                            onChange={handleAddress}
                            className="form-input"
                            value={data.address}
                            placeholder="Type your complete delivery/stay address here..."
                            rows="3"
                            required
                            style={{ resize: 'none' }}
                        />
                    </div>

                    <div style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '0.5rem',
                        backgroundColor: 'var(--background)'
                    }}>
                        <DropIn
                            options={{
                                authorization: data.clientToken,
                                paypal: {
                                    flow: 'vault'
                                }
                            }}
                            onInstance={instance => (data.instance = instance)}
                        />
                    </div>

                    <button onClick={buy} className="btn-premium" style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <CreditCard size={18} />
                        {data.loading ? "Processing..." : `Pay ₹${getTotal()}`}
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="skeleton" style={{ height: '80px', borderRadius: 'var(--radius-md)' }}></div>
                    <div className="skeleton" style={{ height: '44px', borderRadius: 'var(--radius-md)' }}></div>
                </div>
            )}
        </div>
    );

    const showError = error => (
        <div className="custom-toast" style={{ display: error ? 'flex' : 'none', borderLeftColor: 'var(--danger)', margin: '1rem 0', position: 'static' }}>
            <span style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{error}</span>
        </div>
    );

    const showSuccess = success => (
        <div className="custom-toast" style={{ display: success ? 'flex' : 'none', borderLeftColor: 'var(--success)', margin: '1rem 0', position: 'static' }}>
            <CheckCircle size={18} style={{ color: 'var(--success)', marginRight: '0.5rem' }} />
            <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600 }}>Thanks! Your booking and payment were successful.</span>
        </div>
    );

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin" className="btn-premium" style={{ width: '100%', textDecoration: 'none' }}>
                Sign in to checkout
            </Link>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Total Price</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>₹{getTotal()}</span>
            </div>
            
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
