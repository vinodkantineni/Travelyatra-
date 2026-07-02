import React, { useState, useEffect } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import ShowImage from './ShowImage';
import { motion } from 'framer-motion';
import { Star, Heart, MapPin, Clock, Trash2 } from 'lucide-react';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined,
  history
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count || 1);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if this item is in the cart/wishlist
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.some(item => item._id === product._id);
    setIsBookmarked(exists);
  }, [product._id]);

  const addToCart = () => {
    addItem(product, 1, () => {
      setIsBookmarked(true);
      setRedirect(true);
    });
  };

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeItem(product._id);
      setIsBookmarked(false);
      setRun(!run);
    } else {
      addItem(product, 1, () => {
        setIsBookmarked(true);
        setRun(!run);
      });
    }
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const handleQtyChange = event => {
    const val = event.target.value < 1 ? 1 : event.target.value;
    setCount(val);
    updateItem(product._id, val);
    setRun(!run);
  };

  // Mock static duration & tags
  const duration = product.duration || "5 Days / 4 Nights";
  const rating = product.rating || 4.8;
  const reviewsCount = product.reviewsCount || Math.floor(Math.random() * 40) + 15;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4 }}
      className="premium-card"
      onClick={(e) => {
        const target = e.target;
        if (target.closest('button') || target.closest('a') || target.closest('input')) {
          return;
        }
        history.push(`/product/${product._id}`);
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'var(--card-bg)',
        cursor: 'pointer'
      }}
    >
      {shouldRedirect(redirect)}
      
      {/* Image and Badge */}
      <div className="premium-card-img-wrapper">
        <ShowImage item={product} url="product" />
        
        {/* Season Badge */}
        <span className="premium-card-badge">
          {product.quantity > 0 ? "In Season" : "Limited Slot"}
        </span>

        {/* Bookmark Button */}
        <button 
          onClick={toggleBookmark}
          className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
          aria-label="Bookmark destination"
        >
          <Heart size={18} fill={isBookmarked ? "var(--danger)" : "none"} />
        </button>
      </div>

      {/* Card Body */}
      <div className="premium-card-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.75rem' }}>
        {/* Destination Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <MapPin size={14} className="text-secondary" />
          <span>{product.subname || "India"}</span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', lineHeight: '1.3' }}>
          {product.name}
        </h3>

        {/* Rating and Duration */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Star size={16} fill="var(--accent)" color="var(--accent)" />
            <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{rating}</span>
            <span style={{ color: 'var(--text-secondary)' }}>({reviewsCount})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
            <Clock size={14} />
            <span>{duration}</span>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.5',
          marginTop: '0.25rem'
        }}>
          {product.description}
        </p>

        {/* Price & Action Footer */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Starting from</span>
            <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)' }}>₹{product.price}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {showViewProductButton && (
              <Link to={`/product/${product._id}`} className="btn-premium-outline" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', borderWidth: '1px' }}>
                Details
              </Link>
            )}
            
            {showAddToCartButton && product.quantity > 0 && (
              <button onClick={addToCart} className="btn-premium" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                Book Now
              </button>
            )}
          </div>
        </div>

        {/* Cart Update Options (Quantity / Remove) */}
        {(cartUpdate || showRemoveProductButton) && (
          <div style={{
            marginTop: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px dashed var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            {cartUpdate && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tickets:</span>
                <input 
                  type="number" 
                  value={count} 
                  onChange={handleQtyChange}
                  style={{
                    width: '60px',
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.85rem'
                  }} 
                />
              </div>
            )}

            {showRemoveProductButton && (
              <button 
                onClick={() => {
                  removeItem(product._id);
                  setRun(!run);
                }}
                className="btn-danger-outline"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.35rem 0.75rem'
                }}
              >
                <Trash2 size={14} />
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default withRouter(Card);
