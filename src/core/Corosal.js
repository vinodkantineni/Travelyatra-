import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Hotel, 
  Briefcase, 
  Calendar, 
  Users, 
  MapPin, 
  IndianRupee, 
  Compass, 
  Activity, 
  ArrowDown,
  Train,
  Bus,
  Car
} from 'lucide-react';

const Corosal = ({ history }) => {
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

    const [activeTab, setActiveTab] = useState('flights');
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState(getTodayDate());
    const [checkOut, setCheckOut] = useState(getTomorrowDate());
    const [guests, setGuests] = useState('2 Guests');
    const [budget, setBudget] = useState('₹10,000 - ₹30,000');
    const [dateError, setDateError] = useState('');
    
    const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
    const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!destination.trim()) {
            setDateError("Please specify a destination!");
            return;
        }
        if (new Date(checkIn) >= new Date(checkOut)) {
            setDateError("Check-out date must be after check-in date!");
            return;
        }
        setDateError('');
        history.push(`/shop?search=${encodeURIComponent(destination)}&type=${activeTab}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&budget=${budget}`);
    };

    const tabs = [
        { id: 'flights', label: 'Flights', icon: Plane },
        { id: 'hotels', label: 'Hotels', icon: Hotel },
        { id: 'packages', label: 'Packages', icon: Briefcase },
        { id: 'activities', label: 'Activities', icon: Activity },
        { id: 'trains', label: 'Trains', icon: Train },
        { id: 'buses', label: 'Buses', icon: Bus },
        { id: 'cars', label: 'Cars', icon: Car }
    ];

    const guestOptions = ["1 Guest", "2 Guests", "3 Guests", "4+ Guests", "Family (2+2)"];
    const budgetOptions = ["Under ₹10,000", "₹10,000 - ₹30,000", "₹30,000 - ₹70,000", "₹70,000+"];

    // Luxury travel image from Unsplash
    const heroImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80";

    return (
        <section style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 10%',
            textAlign: 'center'
        }}>
            {/* Background Image with Ken Burns Zoom Effect */}
            <motion.div 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: 10, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -2
                }}
            />

            {/* Gradient Overlay for luxury feel */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.55) 60%, rgba(248, 250, 252, 1) 100%)',
                zIndex: -1
            }} />

            {/* Hero Main Content */}
            <div style={{ marginTop: '-4rem', zIndex: 10, maxWidth: '800px', color: '#FFFFFF' }}>
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: 'clamp(2.2rem, 3.5vw, 5rem)',
                        fontWeight: 800,
                        letterSpacing: '-1.5px',
                        lineHeight: 1.1,
                        marginBottom: '1rem',
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}
                >
                    Discover Your Next Adventure
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        fontSize: 'clamp(1rem, 1.4vw, 1.4rem)',
                        fontWeight: 400,
                        opacity: 0.95,
                        marginBottom: '2.5rem',
                        textShadow: '0 4px 16px rgba(0,0,0,0.5)'
                    }}
                >
                    Book flights, hotels and unforgettable experiences in one place.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', marginBottom: '4rem' }}
                >
                    <button onClick={() => history.push('/shop')} className="btn-premium">
                        <Compass size={18} />
                        Explore Now
                    </button>
                    <button onClick={() => history.push('/contact')} className="btn-premium-secondary">
                        Plan My Trip
                    </button>
                </motion.div>
            </div>

            {/* Floating Booking Search Card */}
            <motion.div 
                id="booking-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="glass-panel"
                style={{
                    width: '90%',
                    maxWidth: '1200px',
                    borderRadius: 'var(--radius-2xl)',
                    padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                    boxShadow: 'var(--shadow-xl)',
                    zIndex: 20,
                    textAlign: 'left',
                    position: 'absolute',
                    bottom: '2rem'
                }}
            >
                {/* Search Box Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isSelected = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'none',
                                    border: 'none',
                                    color: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                                    padding: '0.5rem 1.25rem',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'color 0.2s'
                                }}
                            >
                                <Icon size={18} />
                                {tab.label}
                                {isSelected && (
                                    <motion.div 
                                        layoutId="activeSearchTab"
                                        style={{
                                            position: 'absolute',
                                            bottom: '-0.85rem',
                                            left: 0,
                                            right: 0,
                                            height: '3px',
                                            backgroundColor: 'var(--primary)',
                                            borderRadius: '2px'
                                        }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Form fields */}
                <form onSubmit={handleSearch} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr) auto',
                    gap: '1rem',
                    alignItems: 'end'
                }} className="booking-grid">
                    {dateError && (
                        <div style={{
                            gridColumn: '1 / -1',
                            backgroundColor: 'rgba(239, 68, 68, 0.12)',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            color: '#EF4444',
                            padding: '0.6rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                        }}>
                            • {dateError}
                        </div>
                    )}
                    
                    {/* Destination */}
                    <div className="form-input-group">
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={14} className="text-primary" /> Destination
                        </label>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Where to?" 
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                    </div>

                    {/* Check In */}
                    <div className="form-input-group">
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Calendar size={14} className="text-primary" /> Check In
                        </label>
                        <input 
                            type="date" 
                            className="form-input" 
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>

                    {/* Check Out */}
                    <div className="form-input-group">
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Calendar size={14} className="text-primary" /> Check Out
                        </label>
                        <input 
                            type="date" 
                            className="form-input" 
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>

                    {/* Guests Dropdown */}
                    <div className="form-input-group" style={{ position: 'relative' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Users size={14} className="text-primary" /> Guests
                        </label>
                        <button 
                            type="button"
                            className="form-input" 
                            onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                            style={{ textAlign: 'left', cursor: 'pointer', background: 'var(--card-bg)' }}
                        >
                            {guests}
                        </button>
                        {showGuestsDropdown && (
                            <div style={{
                                position: 'absolute',
                                bottom: '105%',
                                left: 0,
                                width: '100%',
                                backgroundColor: 'var(--card-bg)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-lg)',
                                zIndex: 100
                            }}>
                                {guestOptions.map((opt) => (
                                    <div 
                                        key={opt}
                                        onClick={() => { setGuests(opt); setShowGuestsDropdown(false); }}
                                        style={{ padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem' }}
                                        className="dropdown-hover"
                                    >
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Budget Dropdown */}
                    <div className="form-input-group" style={{ position: 'relative' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <IndianRupee size={14} className="text-primary" /> Budget
                        </label>
                        <button 
                            type="button"
                            className="form-input" 
                            onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
                            style={{ textAlign: 'left', cursor: 'pointer', background: 'var(--card-bg)' }}
                        >
                            {budget}
                        </button>
                        {showBudgetDropdown && (
                            <div style={{
                                position: 'absolute',
                                bottom: '105%',
                                left: 0,
                                width: '100%',
                                backgroundColor: 'var(--card-bg)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-lg)',
                                zIndex: 100
                            }}>
                                {budgetOptions.map((opt) => (
                                    <div 
                                        key={opt}
                                        onClick={() => { setBudget(opt); setShowBudgetDropdown(false); }}
                                        style={{ padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem' }}
                                        className="dropdown-hover"
                                    >
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <button type="submit" className="btn-premium" style={{ height: '44px', width: '100%', whiteSpace: 'nowrap' }}>
                        Search
                    </button>
                </form>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    bottom: '20vh',
                    color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    zIndex: 5
                }}
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight * 0.9,
                        behavior: 'smooth'
                    });
                }}
            >
                Scroll Down
                <ArrowDown size={14} />
            </motion.div>

            <style>{`
                @media (max-width: 900px) {
                    .booking-grid {
                        grid-template-columns: 1fr !important;
                    }
                    #booking-card {
                        position: relative !important;
                        bottom: auto !important;
                        margin-top: 2rem;
                        width: 90% !important;
                    }
                    section {
                        height: auto !important;
                        min-height: 100vh;
                        padding-top: 8rem !important;
                        padding-bottom: 4rem !important;
                    }
                }
                .dropdown-hover:hover {
                    background-color: var(--primary) !important;
                    color: #FFFFFF !important;
                }
            `}</style>
        </section>
    );
};

export default withRouter(Corosal);
