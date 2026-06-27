import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {items.map((product, i) => (
                    <div key={i} style={{ width: '100%' }}>
                        <Card
                            product={product}
                            showAddToCartButton={false}
                            cartUpdate={true}
                            showRemoveProductButton={true}
                            setRun={setRun}
                            run={run}
                        />
                    </div>
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: 'var(--radius-xl)',
            border: '1px dashed var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
        }}>
            <div style={{
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                color: 'var(--primary)',
                width: '4rem',
                height: '4rem',
                borderRadius: '50%'
            }} className="flex-center">
                <ShoppingBag size={28} />
            </div>
            <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>Your Wishlist is Empty</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>You haven't bookmarked any luxury destinations yet.</p>
            </div>
            <Link to="/shop" className="btn-premium" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowLeft size={16} /> Look for places to visit
            </Link>
        </div>
    );

    return (
        <Layout
            title="Your Dream Wishlist"
            description="Manage your shortlisted getaways and proceed to complete your bookings."
            className="section-padding"
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1.6fr 1fr',
                gap: '3rem',
                alignItems: 'start',
                marginTop: '1rem'
            }} className="cart-grid-layout">
                
                {/* Shortlisted Destinations List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', display: 'inline-block', width: 'fit-content' }}>
                        Shortlisted Places ({items.length})
                    </h2>
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                {/* Summary & Checkout Card */}
                {items.length > 0 && (
                    <div className="premium-card" style={{
                        padding: '2.5rem 2rem',
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.5rem' }}>
                            Booking Summary
                        </h2>
                        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
                        <Checkout products={items} setRun={setRun} run={run} />
                    </div>
                )}
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .cart-grid-layout {
                        grid-template-columns: 1fr !important;
                        gap: 2.5rem !important;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default Cart;
