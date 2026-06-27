import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import { addItem } from './cartHelpers';
import Corosal from './Corosal';
import { motion } from 'framer-motion';
import HomeIcon from './HomeIcon';
import { AITripPlanner, WeatherAndCurrency, DestinationComparer } from './ExtraWidgets';
import { 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  MessageSquare, 
  ArrowUp, 
  Check, 
  X,
  Star
} from 'lucide-react';
import { photos } from './Photos';

const Home = ({ history }) => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    // State for Testimonials Carousel
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const testimonials = [
        {
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            name: "Sarah Jenkins",
            country: "United Kingdom",
            rating: 5,
            review: "TravelYatra helped me book my dream ski vacation in Auli. The customer support was absolutely stellar - they resolved my itinerary changes in minutes. The luxury hotels they partner with are top-notch!"
        },
        {
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            name: "Rahul Sharma",
            country: "India",
            rating: 5,
            review: "Exceptional experience! The yacht cruise in Goa was the highlight of our family trip. The booking process was smooth, and the prices were far better than what I saw on other travel portals."
        },
        {
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            name: "Emma Watson",
            country: "Australia",
            rating: 4.8,
            review: "I loved the spiritual heritage tour of Mathura. Having a verified local guide made such a difference. I felt completely safe and received true five-star treatment throughout the excursion."
        }
    ];

    // State for Lightbox
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // State for Floating Chat & Back to top
    const [chatOpen, setChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { sender: 'bot', text: 'Hi traveler! Welcome to TravelYatra support. How can I help you plan your next getaway today?' }
    ]);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // State for Newsletter Subscription Toast
    const [toastMessage, setToastMessage] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();

        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        // Testimonial auto-slide every 5s
        const timer = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(timer);
        };
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const newMsg = { sender: 'user', text: chatInput };
        setChatMessages(prev => [...prev, newMsg]);
        setChatInput('');

        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                sender: 'bot',
                text: "Thanks for reaching out! A premium travel expert will connect with you in a moment to finalize your itinerary."
            }]);
        }, 1000);
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!emailInput.trim()) return;
        setToastMessage("Subscription successful! Welcome to the newsletter.");
        setEmailInput('');
        setTimeout(() => setToastMessage(''), 4000);
    };

    // Horizontal slider mock experiences data
    const experiences = [
        { title: "Hot Air Balloon", price: "₹14,000", rating: "4.9", image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=400&q=80" },
        { title: "Scuba Diving", price: "₹7,500", rating: "4.8", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80" },
        { title: "Mountain Trekking", price: "₹5,000", rating: "4.7", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" },
        { title: "Wildlife Safari", price: "₹9,000", rating: "4.9", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80" },
        { title: "Snow Snowmobile", price: "₹12,000", rating: "4.8", image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=400&q=80" }
    ];

    // Popular Packages data
    const packages = [
        {
            _id: "prod3",
            title: "Ultimate Luxury Kashmir Tour",
            duration: "5 Days / 4 Nights",
            price: "18,999",
            discount: "15% OFF",
            rating: "4.9",
            flights: true,
            meals: true
        },
        {
            _id: "prod4",
            title: "Exotic Goa Coastal Retreat",
            duration: "4 Days / 3 Nights",
            price: "12,500",
            discount: "10% OFF",
            rating: "4.8",
            flights: true,
            meals: true
        },
        {
            _id: "prod17",
            title: "Royal Rajasthan Heritage Expedition",
            duration: "7 Days / 6 Nights",
            price: "24,000",
            discount: "20% OFF",
            rating: "4.9",
            flights: false,
            meals: true
        }
    ];

    const handleBookPackage = (pkg) => {
        const productObj = {
            _id: pkg._id,
            name: pkg.title,
            price: parseInt(pkg.price.replace(/,/g, '')),
            description: `Experience the trip of a lifetime with our premium curated package: ${pkg.title}. Includes ${pkg.duration} luxury stay, dining, and activities.`,
            quantity: 10,
            category: { _id: "cat_promo", name: "Premium Package" },
            rating: parseFloat(pkg.rating),
            duration: pkg.duration
        };
        
        addItem(productObj, 1, () => {
            history.push('/cart');
        });
    };

    return (
        <Layout className="m-0 p-0">
            {/* Full-Screen Hero & Search Box */}
            <Corosal />

            {/* Why Choose Us */}
            <HomeIcon />

            {/* Popular Places (Sorted by Sold) */}
            <section className="section-padding" id="home-popularplace" style={{ backgroundColor: 'var(--background)' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>Trending Collections</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>Popular Destinations</h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', margin: '1rem auto 0 auto', borderRadius: '2px' }}></div>
                </div>

                <div className="grid-cols-4">
                    {productsBySell.length > 0 ? (
                        productsBySell.map((product, i) => (
                            <Card key={i} product={product} />
                        ))
                    ) : (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="premium-card" style={{ height: '380px', padding: '1rem' }}>
                                <div className="skeleton" style={{ height: '200px', borderRadius: 'var(--radius-lg)', marginBottom: '1rem' }}></div>
                                <div className="skeleton" style={{ height: '24px', width: '70%', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
                                <div className="skeleton" style={{ height: '16px', width: '50%', borderRadius: '4px' }}></div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Featured Experiences */}
            <section className="section-padding" style={{ backgroundColor: 'var(--card-bg)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>Unique Activities</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>Featured Experiences</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => {
                            const scroller = document.getElementById('experience-scroller');
                            scroller.scrollBy({ left: -300, behavior: 'smooth' });
                        }} className="btn-premium-outline" style={{ padding: '0.5rem', borderRadius: '50%' }} aria-label="Slide Left">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => {
                            const scroller = document.getElementById('experience-scroller');
                            scroller.scrollBy({ left: 300, behavior: 'smooth' });
                        }} className="btn-premium-outline" style={{ padding: '0.5rem', borderRadius: '50%' }} aria-label="Slide Right">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="scroll-container" id="experience-scroller">
                    {experiences.map((exp, idx) => (
                        <motion.div 
                            key={idx} 
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => history.push(`/shop?search=${encodeURIComponent(exp.title)}`)}
                            className="scroll-card premium-card" 
                            style={{ position: 'relative', cursor: 'pointer' }}
                        >
                            <div className="premium-card-img-wrapper" style={{ height: '220px' }}>
                                <img src={exp.image} alt={exp.title} className="premium-card-img" />
                                <span className="premium-card-badge" style={{ backgroundColor: 'var(--secondary)' }}>Experience</span>
                            </div>
                            <div className="premium-card-content" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{exp.title}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                                    <span style={{ fontWeight: '800', color: 'var(--primary)' }}>Starting at {exp.price}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}><Star size={14} fill="var(--accent)" color="var(--accent)" /> {exp.rating}</span>
                                </div>
                                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button 
                                        type="button" 
                                        className="btn-premium-outline" 
                                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                                    >
                                        Explore Offers
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* New Places Section */}
            <section className="section-padding" style={{ backgroundColor: 'var(--background)' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>Just Discovered</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>New Additions</h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', margin: '1rem auto 0 auto', borderRadius: '2px' }}></div>
                </div>

                <div className="grid-cols-4">
                    {productsByArrival.length > 0 ? (
                        productsByArrival.map((product, i) => (
                            <Card key={i} product={product} />
                        ))
                    ) : (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="premium-card" style={{ height: '380px', padding: '1rem' }}>
                                <div className="skeleton" style={{ height: '200px', borderRadius: 'var(--radius-lg)', marginBottom: '1rem' }}></div>
                                <div className="skeleton" style={{ height: '24px', width: '70%', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
                                <div className="skeleton" style={{ height: '16px', width: '50%', borderRadius: '4px' }}></div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Popular Packages (Pricing Cards) */}
            <section className="section-padding" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>Curated Deals</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>Best Value Packages</h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', margin: '1rem auto 0 auto', borderRadius: '2px' }}></div>
                </div>

                <div className="grid-cols-3">
                    {packages.map((pkg, idx) => (
                        <div key={idx} className="premium-card" style={{
                            padding: '2.5rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.25rem',
                            border: idx === 0 ? '2px solid var(--primary)' : '1px solid var(--border-color)'
                        }}>
                            {idx === 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    backgroundColor: 'var(--primary)',
                                    color: '#FFFFFF',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.75rem',
                                    fontWeight: '700'
                                }}>Popular Pick</span>
                            )}
                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase' }}>{pkg.discount}</span>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>{pkg.title}</h3>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Duration: {pkg.duration}</span>
                            
                            <div style={{
                                margin: '0.5rem 0',
                                paddingBottom: '1.25rem',
                                borderBottom: '1px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: '0.25rem'
                            }}>
                                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)' }}>₹{pkg.price}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/ person</span>
                            </div>

                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', listStyle: 'none' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Check size={16} className="text-success" style={{ color: 'var(--success)' }} /> Verified Hotel Stay Included
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Check size={16} className="text-success" style={{ color: 'var(--success)' }} /> {pkg.flights ? "Flights Included" : "Local Sightseeing Included"}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Check size={16} className="text-success" style={{ color: 'var(--success)' }} /> Meals Included
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Check size={16} className="text-success" style={{ color: 'var(--success)' }} /> 24/7 VIP Concierge Service
                                </li>
                            </ul>

                            <button 
                                onClick={() => handleBookPackage(pkg)} 
                                className="btn-premium" 
                                style={{ width: '100%', marginTop: '1rem' }}
                            >
                                Book Package Now
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* AI Trip Planner & Weather Currency Widget */}
            <section className="section-padding" style={{ backgroundColor: 'var(--background)', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>Smart Travel Toolkit</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>AI Planner & Travel Widgets</h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', margin: '1rem auto 0 auto', borderRadius: '2px' }}></div>
                </div>

                <AITripPlanner />
                <WeatherAndCurrency />
                <DestinationComparer />
            </section>

            {/* Testimonials */}
            <section className="section-padding" style={{ backgroundColor: 'var(--card-bg)', textAlign: 'center' }}>
                <div style={{ marginBottom: '3.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>Guest Diaries</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>What Travelers Say</h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', margin: '1rem auto 0 auto', borderRadius: '2px' }}></div>
                </div>

                <div style={{ maxWidth: '700px', margin: '0 auto', minHeight: '260px', position: 'relative' }} className="flex-center">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                        <img 
                            src={testimonials[currentTestimonial].avatar} 
                            alt={testimonials[currentTestimonial].name} 
                            style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)', boxShadow: 'var(--shadow-md)' }} 
                        />
                        <p style={{ fontSize: '1.15rem', fontStyle: 'italic', lineHeight: '1.7', color: 'var(--text-primary)' }}>
                            "{testimonials[currentTestimonial].review}"
                        </p>
                        <div>
                            <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>{testimonials[currentTestimonial].name}</h4>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{testimonials[currentTestimonial].country}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--accent)' }}>
                            {Array(5).fill(0).map((_, i) => <Star key={i} size={16} fill="var(--accent)" color="var(--accent)" />)}
                        </div>
                    </div>
                </div>

                {/* Dot selectors */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentTestimonial(idx)}
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: currentTestimonial === idx ? 'var(--primary)' : 'var(--border-color)',
                                transition: 'background-color 0.2s'
                            }}
                            aria-label={`Show review ${idx + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Travel Gallery (Pinterest Masonry) */}
            <section className="section-padding" id="homegallery" style={{ backgroundColor: 'var(--background)' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>Visual Journeys</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>Traveler Gallery</h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', margin: '1rem auto 0 auto', borderRadius: '2px' }}></div>
                </div>

                <div className="masonry-grid">
                    {photos.map((photo, index) => (
                        <div key={index} className="masonry-item" onClick={() => setLightboxIndex(index)}>
                            <img src={photo.src} alt="Travel Destination" className="masonry-img" />
                            <div className="masonry-overlay">
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>Explore Destination</h4>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>Shared by verified traveler</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gallery Lightbox */}
            {lightboxIndex !== null && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        zIndex: 2000,
                        padding: '2rem'
                    }}
                    className="flex-center"
                >
                    <button 
                        onClick={() => setLightboxIndex(null)}
                        style={{
                            position: 'absolute',
                            top: '2rem',
                            right: '2rem',
                            background: 'none',
                            border: 'none',
                            color: '#FFFFFF',
                            cursor: 'pointer'
                        }}
                    >
                        <X size={32} />
                    </button>
                    <img 
                        src={photos[lightboxIndex].src} 
                        alt="Enlarged destination view" 
                        style={{
                            maxWidth: '90%',
                            maxHeight: '80%',
                            objectFit: 'contain',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-xl)'
                        }} 
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: '2rem',
                        color: '#FFFFFF',
                        display: 'flex',
                        gap: '2rem',
                        alignItems: 'center'
                    }}>
                        <button 
                            onClick={() => setLightboxIndex(prev => (prev - 1 + photos.length) % photos.length)}
                            className="btn-premium-secondary"
                            style={{ padding: '0.5rem 1rem' }}
                        >
                            Previous
                        </button>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{lightboxIndex + 1} / {photos.length}</span>
                        <button 
                            onClick={() => setLightboxIndex(prev => (prev + 1) % photos.length)}
                            className="btn-premium-secondary"
                            style={{ padding: '0.5rem 1rem' }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Newsletter Subscription */}
            <section className="section-padding" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                    borderRadius: 'var(--radius-2xl)',
                    padding: '5rem 3rem',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-xl)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Background visual detail */}
                    <div style={{
                        position: 'absolute',
                        top: '-50px',
                        left: '-50px',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.05)'
                    }}></div>

                    <div style={{ position: 'relative', zIndex: 5, maxWidth: '600px', margin: '0 auto' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.95 }}>Join the travel club</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: '#FFFFFF' }}>Get 15% Off Your Next Trip</h2>
                        <p style={{ fontSize: '1.05rem', marginTop: '1rem', marginBottom: '2.5rem', opacity: 0.9 }}>
                            Subscribe to receive exclusive deals, custom itineraries, and early travel news. No spam, cancel anytime.
                        </p>

                        <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }} className="newsletter-form">
                            <input 
                                type="email" 
                                className="form-input" 
                                placeholder="Enter your email address" 
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    color: '#FFFFFF',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    padding: '0.9rem 1.5rem',
                                    borderRadius: 'var(--radius-lg)'
                                }}
                                required
                            />
                            <button type="submit" className="btn-premium" style={{ backgroundColor: '#FFFFFF', color: 'var(--primary)' }}>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Toast Container */}
            {toastMessage && (
                <div className="toast-container">
                    <div className="custom-toast" style={{ borderLeftColor: 'var(--success)' }}>
                        <Check size={18} style={{ color: 'var(--success)' }} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{toastMessage}</span>
                    </div>
                </div>
            )}

            {/* Back to top button */}
            {showScrollTop && (
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                    className="back-to-top-btn"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} />
                </button>
            )}

            {/* Floating Support Chat button */}
            <div>
                <button 
                    onClick={() => setChatOpen(!chatOpen)} 
                    className="chat-btn"
                >
                    <MessageSquare size={18} />
                    Support
                </button>

                {chatOpen && (
                    <div className="chat-box">
                        <div className="chat-header">
                            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Travel Concierge</span>
                            <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="chat-messages">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`chat-message ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className="chat-input-area">
                            <input 
                                type="text" 
                                className="form-input" 
                                placeholder="Type a message..." 
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                            />
                            <button type="submit" className="btn-premium" style={{ padding: '0.4rem 0.75rem', height: 'auto' }} aria-label="Send message">
                                <Send size={14} />
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <style>{`
                @media(max-width: 600px) {
                    .newsletter-form {
                        flex-direction: column !important;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default Home;
