import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  CloudSun, 
  TrendingUp, 
  ArrowRightLeft, 
  CloudSnow,
  Sun,
  CloudRain
} from 'lucide-react';
import { mockProducts } from './apiCore';

// 1. AI Trip Planner Component
export const AITripPlanner = () => {
    const [destination, setDestination] = useState('');
    const [vibe, setVibe] = useState('Relaxation');
    const [days, setDays] = useState(3);
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(false);

    const vibes = ['Adventure', 'Relaxation', 'Cultural', 'Romantic', 'Family'];

    const generateItinerary = (e) => {
        e.preventDefault();
        setLoading(true);
        setItinerary(null);
        
        setTimeout(() => {
            setLoading(false);
            setItinerary({
                title: `${vibe} Getaway in ${destination || 'Kashmir'}`,
                duration: `${days} Days Trip Plan`,
                days: [
                    {
                        day: 1,
                        title: "Arrival & Local Immersion",
                        activities: ["VIP Airport pickup and hotel check-in", "Afternoon guided walk around local craft markets", "Sunset boat ride / scenic viewing with premium dinner"]
                    },
                    {
                        day: 2,
                        title: "Curated Signature Experiences",
                        activities: ["Private morning adventure (hiking/skiing/yachting)", "Organic lunch at a local award-winning farm-to-table bistro", "Relaxing spa treatment or cultural workshop"]
                    },
                    {
                        day: 3,
                        title: "Scenic Explorer & Departure",
                        activities: ["Sunrise photography session at the iconic landmark", "Leisurely brunch followed by checkout", "Transfer to departure point with curated souvenir box"]
                    }
                ].slice(0, days)
            });
        }, 1500);
    };

    return (
        <div className="premium-card" style={{ padding: '2.5rem', backgroundColor: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Sparkles size={24} style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>AI Trip Planner</h3>
            </div>
            
            <form onSubmit={generateItinerary} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: '1rem', alignItems: 'end', marginBottom: '1.5rem' }} className="ai-planner-form">
                <div className="form-input-group">
                    <label className="form-label">Destination</label>
                    <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Kashmir, Goa, Auli" 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-input-group">
                    <label className="form-label">Trip Vibe</label>
                    <select className="form-input" value={vibe} onChange={(e) => setVibe(e.target.value)}>
                        {vibes.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                
                <div className="form-input-group" style={{ width: '100px' }}>
                    <label className="form-label">Days</label>
                    <input 
                        type="number" 
                        className="form-input" 
                        min="1" 
                        max="3" 
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                    />
                </div>
                
                <button type="submit" className="btn-premium" style={{ height: '44px' }}>
                    {loading ? "Planning..." : "Plan Trip"}
                </button>
            </form>

            <AnimatePresence>
                {loading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}
                    >
                        <div className="skeleton" style={{ height: '20px', width: '60%', borderRadius: '4px' }}></div>
                        <div className="skeleton" style={{ height: '16px', width: '80%', borderRadius: '4px' }}></div>
                        <div className="skeleton" style={{ height: '16px', width: '40%', borderRadius: '4px' }}></div>
                    </motion.div>
                )}

                {itinerary && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            marginTop: '1.5rem',
                            padding: '1.5rem',
                            backgroundColor: 'var(--background)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border-color)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: '700' }}>{itinerary.title}</h4>
                            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{itinerary.duration}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {itinerary.days.map((dayPlan) => (
                                <div key={dayPlan.day}>
                                    <h5 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>Day {dayPlan.day}: {dayPlan.title}</h5>
                                    <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        {dayPlan.activities.map((act, i) => (
                                            <li key={i} style={{ marginBottom: '0.15rem' }}>{act}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <style>{`
                @media(max-width: 768px) {
                    .ai-planner-form {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

// 2. Weather & Currency Converter Component
export const WeatherAndCurrency = () => {
    // Weather state
    const [selectedCity, setSelectedCity] = useState('Goa');
    const weatherData = {
        'Goa': { temp: '30°C', cond: 'Sunny', icon: Sun, color: '#F59E0B' },
        'Auli': { temp: '-2°C', cond: 'Heavy Snow', icon: CloudSnow, color: '#38BDF8' },
        'Kashmir': { temp: '14°C', cond: 'Light Showers', icon: CloudRain, color: '#64748B' },
        'Jaipur': { temp: '38°C', cond: 'Hot & Windy', icon: Sun, color: '#F97316' }
    };

    // Currency state
    const [inrAmount, setInrAmount] = useState('10000');
    const [usdAmount, setUsdAmount] = useState('120');
    const conversionRate = 83.5; // 1 USD = 83.5 INR

    const handleInrChange = (val) => {
        setInrAmount(val);
        if(val === '') setUsdAmount('');
        else setUsdAmount((parseFloat(val) / conversionRate).toFixed(2));
    };

    const handleUsdChange = (val) => {
        setUsdAmount(val);
        if(val === '') setInrAmount('');
        else setInrAmount((parseFloat(val) * conversionRate).toFixed(0));
    };

    const WeatherIcon = weatherData[selectedCity]?.icon || Sun;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="weather-currency-grid">
            {/* Weather Widget */}
            <div className="premium-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifycontent: 'space-between', gap: '1rem', backgroundColor: 'var(--card-bg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CloudSun size={20} className="text-secondary" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Destination Weather</h3>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {Object.keys(weatherData).map(city => (
                        <button
                            key={city}
                            type="button"
                            onClick={(e) => { e.preventDefault(); setSelectedCity(city); }}
                            style={{
                                padding: '0.35rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--border-color)',
                                backgroundColor: selectedCity === city ? 'var(--primary)' : 'transparent',
                                color: selectedCity === city ? '#FFFFFF' : 'var(--text-secondary)',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'var(--transition-fast)'
                            }}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <div>
                        <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>{weatherData[selectedCity]?.temp}</span>
                        <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{weatherData[selectedCity]?.cond}</span>
                    </div>
                    <WeatherIcon size={64} style={{ color: weatherData[selectedCity]?.color }} />
                </div>
            </div>

            {/* Currency Converter */}
            <div className="premium-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'var(--card-bg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowRightLeft size={20} className="text-secondary" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Currency Converter</h3>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className="form-input-group" style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>INR (₹)</span>
                        <input 
                            type="number" 
                            className="form-input"
                            value={inrAmount}
                            onChange={(e) => handleInrChange(e.target.value)}
                        />
                    </div>
                    
                    <span style={{ marginTop: '1.25rem', color: 'var(--text-secondary)' }}>=</span>

                    <div className="form-input-group" style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>USD ($)</span>
                        <input 
                            type="number" 
                            className="form-input"
                            value={usdAmount}
                            onChange={(e) => handleUsdChange(e.target.value)}
                        />
                    </div>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    Exchange rate: 1 USD = {conversionRate} INR
                </span>
            </div>
            
            <style>{`
                @media(max-width: 768px) {
                    .weather-currency-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

// 3. Destination Comparer Component
export const DestinationComparer = () => {
    const [dest1, setDest1] = useState(mockProducts[0]._id);
    const [dest2, setDest2] = useState(mockProducts[1]._id);

    const product1 = mockProducts.find(p => p._id === dest1) || mockProducts[0];
    const product2 = mockProducts.find(p => p._id === dest2) || mockProducts[1];

    return (
        <div className="premium-card" style={{ padding: '2.5rem', backgroundColor: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
                <TrendingUp size={24} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Compare Destinations</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'start' }} className="compare-grid">
                {/* Destination 1 Selector & Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-input-group">
                        <label className="form-label">First Destination</label>
                        <select className="form-input" value={dest1} onChange={(e) => setDest1(e.target.value)}>
                            {mockProducts.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                        </select>
                    </div>

                    <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Price starting from</span>
                        <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>₹{product1.price}</span>
                        
                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                            <div><strong>Category:</strong> {product1.category.name}</div>
                            <div><strong>Best Season:</strong> In Season</div>
                            <div><strong>Rating:</strong> ⭐ {product1.rating || "4.8"}</div>
                        </div>
                    </div>
                </div>

                {/* VS Separator */}
                <div style={{
                    alignSelf: 'center',
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    fontSize: '1rem',
                    fontWeight: '800',
                    boxShadow: 'var(--shadow-md)',
                    marginTop: '1.5rem'
                }} className="flex-center">
                    VS
                </div>

                {/* Destination 2 Selector & Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-input-group">
                        <label className="form-label">Second Destination</label>
                        <select className="form-input" value={dest2} onChange={(e) => setDest2(e.target.value)}>
                            {mockProducts.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                        </select>
                    </div>

                    <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Price starting from</span>
                        <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>₹{product2.price}</span>
                        
                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                            <div><strong>Category:</strong> {product2.category.name}</div>
                            <div><strong>Best Season:</strong> In Season</div>
                            <div><strong>Rating:</strong> ⭐ {product2.rating || "4.7"}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                @media(max-width: 768px) {
                    .compare-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                    .compare-grid > div:nth-child(2) {
                        margin: 1rem auto !important;
                    }
                }
            `}</style>
        </div>
    );
};
