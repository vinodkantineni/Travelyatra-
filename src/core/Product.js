import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from './Layout';
import { read } from './apiCore';
import { addItem } from './cartHelpers';
import { 
  Star, 
  MapPin, 
  Play, 
  Heart, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Users, 
  ShieldCheck, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [, setError] = useState(false);
    const [selectedImg, setSelectedImg] = useState("");
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // Booking Concierge state
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const [checkIn, setCheckIn] = useState(getTodayDate());
    const [checkOut, setCheckOut] = useState(getTomorrowDate());
    const [guests, setGuests] = useState("2 Guests");
    const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
    const [bookingError, setBookingError] = useState("");
    const [isBookmarked, setIsBookmarked] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data && data.error) {
                setError(data.error);
            } else if (data) {
                setProduct(data);
                // Check if bookmarked
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                setIsBookmarked(cart.some(item => item._id === data._id));
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
        window.scrollTo(0, 0);
    }, [props.match.params.productId]);

    const getGalleryImages = (item) => {
        const defaultGallery = [
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
        ];
        
        if (!item || !item.name) return defaultGallery;
        const name = item.name.toLowerCase();
        
        if (name.includes("taj mahal")) {
            return [
                "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80"
            ];
        } else if (name.includes("goa")) {
            return [
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80"
            ];
        } else if (name.includes("auli")) {
            return [
                "https://images.unsplash.com/photo-1626830503206-6c768ee1d84a?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=800&q=80"
            ];
        } else if (name.includes("kashmir") || name.includes("pahalgam")) {
            return [
                "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1595956553229-4d643ffb8751?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80"
            ];
        } else if (name.includes("kerala") || name.includes("backwaters")) {
            return [
                "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80"
            ];
        }
        
        return defaultGallery;
    };

    const handleBookNow = (e) => {
        e.preventDefault();
        if (new Date(checkIn) >= new Date(checkOut)) {
            setBookingError("Check-out date must be after check-in!");
            return;
        }
        setBookingError("");
        addItem(product, 1, () => {
            props.history.push('/cart');
        });
    };

    const toggleBookmark = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (isBookmarked) {
            const updated = cart.filter(item => item._id !== product._id);
            localStorage.setItem('cart', JSON.stringify(updated));
            setIsBookmarked(false);
        } else {
            cart.push({ ...product, count: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
            setIsBookmarked(true);
        }
    };

    const gallery = getGalleryImages(product);
    const heroImage = selectedImg || gallery[0];
    const rating = product.rating || 4.8;
    const duration = product.duration || "5 Days / 4 Nights";

    return (
        <Layout  
            title="Destination Showcase"
            description="Examine full itinerary, premium media files, and reserve your exclusive slot."
            className="section-padding"
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1.6fr 1fr',
                gap: '3rem',
                alignItems: 'start',
                marginTop: '1.5rem'
            }} className="product-details-grid">
                
                {/* Left Column: Media & Highlights Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Hero Media Container */}
                    <div style={{
                        position: 'relative',
                        height: '420px',
                        borderRadius: 'var(--radius-xl)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid var(--border-color)'
                    }}>
                        <img 
                            src={heroImage} 
                            alt={product.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        
                        {/* Glassmorphic Play Button overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)'
                        }}>
                            <button 
                                onClick={() => setIsVideoOpen(true)}
                                style={{
                                    width: '5.5rem',
                                    height: '5.5rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                    backdropFilter: 'blur(10px)',
                                    border: '2px solid rgba(255, 255, 255, 0.8)',
                                    color: '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                                }}
                                className="play-btn-pulse"
                                aria-label="Play animated tour video"
                            >
                                <Play size={32} fill="#FFFFFF" style={{ marginLeft: '6px' }} />
                            </button>
                        </div>

                        {/* Top-Right Bookmark Button */}
                        <button 
                            onClick={toggleBookmark}
                            style={{
                                position: 'absolute',
                                top: '1.25rem',
                                right: '1.25rem',
                                width: '2.5rem',
                                height: '2.5rem',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                color: isBookmarked ? 'var(--danger)' : '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Heart size={18} fill={isBookmarked ? "var(--danger)" : "none"} />
                        </button>

                        {/* Badges */}
                        <span style={{
                            position: 'absolute',
                            bottom: '1.25rem',
                            left: '1.25rem',
                            padding: '0.4rem 0.85rem',
                            backgroundColor: 'var(--primary)',
                            color: '#FFFFFF',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            borderRadius: 'var(--radius-sm)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Verified Experience
                        </span>
                    </div>

                    {/* Thumbnail Image Gallery Slider */}
                    <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                            Premium Photo Gallery
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                            {gallery.map((img, idx) => (
                                <button 
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedImg(img)}
                                    style={{
                                        height: '80px',
                                        borderRadius: 'var(--radius-lg)',
                                        overflow: 'hidden',
                                        border: heroImage === img ? '2.5px solid var(--primary)' : '1px solid var(--border-color)',
                                        padding: 0,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Overview & Description Details */}
                    <div className="premium-card" style={{ padding: '2.5rem 2rem', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>About this Excursion</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                            {product.description}
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                            <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Key Highlights</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', paddingLeft: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} className="text-success" /> 5-Star Boutique Stay</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} className="text-success" /> Expert Verified Guides</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} className="text-success" /> Curated Dining Included</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} className="text-success" /> Private Luxury Transfer</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Travel Requirements</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', paddingLeft: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} className="text-primary" /> Valid Photo ID Required</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} className="text-primary" /> Instant Confirmation Slot</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} className="text-primary" /> Free Cancellation up to 72h</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Day-by-Day Travel Itinerary */}
                    <div className="premium-card" style={{ padding: '2.5rem 2rem', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Detailed Day-by-Day Itinerary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.8rem' }}>DAY 1</div>
                                <div>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>VIP Arrival & Welcome Gala</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                        Check-in at our hand-picked boutique resort. Indulge in an exclusive private orientation and a welcome chef's gala dinner under the stars.
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.8rem' }}>DAY 2</div>
                                <div>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>Signature Guided Expedition</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                        Embark on a private guided heritage walk or landscape tour. Discover hidden photo spots and listen to fascinating local history from certified experts.
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.8rem' }}>DAY 3</div>
                                <div>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>Signature Local Experiences</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                        Participate in local curated activities (like yacht sailing or mountain skiing). Re-energize at a premium wellness spa session in the evening.
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <div style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.8rem' }}>DAY 4</div>
                                <div>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>Farewell & Departure</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                        Enjoy a leisurely breakfast. Complete check-out, pick up local souvenirs, and take your private luxury transfer back to the terminal.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* What's Included / Excluded */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="inclusions-exclusions-grid">
                        <div className="premium-card" style={{ padding: '2rem', border: '1px solid var(--border-color)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--primary)' }}>What is Included</h3>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', paddingLeft: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} className="text-success" /> All Boutique Accommodation</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} className="text-success" /> Curated Breakfast & Dinner</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} className="text-success" /> All Entry Passes & Tickets</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} className="text-success" /> Private AC Cab & Airport Transfer</li>
                            </ul>
                        </div>
                        <div className="premium-card" style={{ padding: '2rem', border: '1px solid var(--border-color)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--danger)' }}>What is Excluded</h3>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', paddingLeft: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><XCircle size={16} className="text-danger" /> Airfare or Train ticket costs</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><XCircle size={16} className="text-danger" /> Personal shopping & tips</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><XCircle size={16} className="text-danger" /> Alcoholic beverages</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><XCircle size={16} className="text-danger" /> Travel Insurance (Add-on available)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Column: Booking Concierge Widget */}
                <aside style={{
                    position: 'sticky',
                    top: '100px',
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: 'var(--radius-2xl)',
                    padding: '2.5rem 2rem',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                            <MapPin size={14} className="text-secondary" />
                            <span>{product.subname || "India"}</span>
                        </div>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', lineHeight: '1.2', color: 'var(--text-primary)' }}>
                            {product.name}
                        </h2>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                                <Star size={16} fill="var(--accent)" color="var(--accent)" />
                                <span style={{ fontWeight: '700' }}>{rating}</span>
                            </div>
                            <span style={{ color: 'var(--text-secondary)' }}>• Verified Ratings</span>
                            <span style={{ color: 'var(--text-secondary)' }}>• {duration}</span>
                        </div>
                    </div>

                    <div style={{
                        borderTop: '1px solid var(--border-color)',
                        borderBottom: '1px solid var(--border-color)',
                        padding: '1.25rem 0',
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between'
                    }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Package Price</span>
                        <div>
                            <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>₹{product.price}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.25rem' }}>/ traveler</span>
                        </div>
                    </div>

                    {/* Booking Form Details */}
                    <form onSubmit={handleBookNow} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {bookingError && (
                            <div style={{
                                padding: '0.75rem 1rem',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--danger)',
                                fontSize: '0.8rem',
                                fontWeight: '600'
                            }}>
                                <ShieldAlert size={16} />
                                <span>{bookingError}</span>
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Check In</label>
                                <div style={{ position: 'relative' }}>
                                    <input 
                                        type="date" 
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem 0.75rem',
                                            fontSize: '0.85rem',
                                            backgroundColor: 'var(--background)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Check Out</label>
                                <div style={{ position: 'relative' }}>
                                    <input 
                                        type="date" 
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem 0.75rem',
                                            fontSize: '0.85rem',
                                            backgroundColor: 'var(--background)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Guests selection dropdown */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', position: 'relative' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Travelers</label>
                            <button
                                type="button"
                                onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                                style={{
                                    width: '100%',
                                    padding: '0.65rem 0.75rem',
                                    fontSize: '0.85rem',
                                    backgroundColor: 'var(--background)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)',
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={16} /> {guests}</span>
                                <ChevronRight size={16} style={{ transform: showGuestsDropdown ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                            </button>
                            {showGuestsDropdown && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    width: '100%',
                                    backgroundColor: 'var(--card-bg)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    boxShadow: 'var(--shadow-lg)',
                                    zIndex: 100,
                                    marginTop: '0.25rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden'
                                }}>
                                    {["1 Traveler", "2 Travelers", "3 Travelers", "4+ Travelers", "Family Group (5+)"].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setGuests(opt);
                                                setShowGuestsDropdown(false);
                                            }}
                                            style={{
                                                padding: '0.65rem 1rem',
                                                fontSize: '0.85rem',
                                                border: 'none',
                                                backgroundColor: 'transparent',
                                                color: 'var(--text-primary)',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.2s'
                                            }}
                                            className="dropdown-item-hover"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn-premium"
                            style={{
                                padding: '0.85rem',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                marginTop: '0.5rem'
                            }}
                        >
                            <Calendar size={18} />
                            Confirm & Book Tour
                        </button>
                    </form>

                    {/* Trust assurances info list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={16} className="text-success" />
                            <span><strong>Best Price Guarantee</strong> with direct booking</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={16} className="text-success" />
                            <span><strong>No Hidden Fees</strong> or card surcharge commissions</span>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Premium Autoplay Travel Video Lightbox Modal */}
            {isVideoOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }} onClick={() => setIsVideoOpen(false)}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '900px',
                        aspectRatio: '16/9',
                        backgroundColor: '#000000',
                        borderRadius: 'var(--radius-xl)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-2xl)'
                    }} onClick={(e) => e.stopPropagation()}>
                        <button 
                            onClick={() => setIsVideoOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: '#FFFFFF',
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifycontent: 'center',
                                fontWeight: 'bold',
                                zIndex: 10
                            }}
                        >
                            ✕
                        </button>
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${product.youtubelink || 'yZc2vP7Hw3c'}?autoplay=1&mute=0`}
                            title="Travel Video Player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-view; iframe-sharing" 
                            allowFullScreen
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                </div>
            )}

            <style>{`
                @media (max-width: 900px) {
                    .product-details-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2.5rem !important;
                    }
                    aside {
                        position: relative !important;
                        top: auto !important;
                    }
                }
                .play-btn-pulse:hover {
                    transform: scale(1.1);
                    background-color: rgba(255, 255, 255, 0.4) !important;
                }
                .dropdown-item-hover:hover {
                    background-color: var(--background) !important;
                }
                .inclusions-exclusions-grid {
                    grid-template-columns: 1fr 1fr;
                }
                @media (max-width: 600px) {
                    .inclusions-exclusions-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default withRouter(Product);
