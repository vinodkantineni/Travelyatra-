import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Clock, CreditCard } from 'lucide-react';

export default function HomeIcon() {
    const features = [
        {
            icon: ShieldCheck,
            title: "Verified Stays",
            description: "Every hotel and villa listed on our platform is hand-inspected and verified for absolute quality and luxury standards.",
            color: "#2563EB"
        },
        {
            icon: Sparkles,
            title: "Best Prices",
            description: "Get access to exclusive negotiated rates, loyalty upgrades, and our best price guarantee on all premium trips.",
            color: "#0EA5E9"
        },
        {
            icon: Clock,
            title: "24/7 VIP Support",
            description: "A dedicated concierge is always available by call or chat to assist you with instant modifications or recommendations.",
            color: "#F59E0B"
        },
        {
            icon: CreditCard,
            title: "Secure Payments",
            description: "Complete checkout with bank-grade encryption, support for international cards, and flexible payment terms.",
            color: "#22C55E"
        }
    ];

    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
    };

    return (
        <section className="section-padding" style={{ backgroundColor: 'var(--background)' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--primary)'
                }}>Luxury Travel Redefined</span>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    marginTop: '0.5rem',
                    color: 'var(--text-primary)'
                }}>Why Book With Us?</h2>
                <div style={{
                    width: '60px',
                    height: '4px',
                    backgroundColor: 'var(--primary)',
                    margin: '1.25rem auto 0 auto',
                    borderRadius: '2px'
                }}></div>
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid-cols-4"
            >
                {features.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={idx}
                            variants={cardVariants}
                            className="premium-card"
                            style={{
                                padding: '2.5rem 2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: '1.25rem',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <div style={{
                                width: '4.5rem',
                                height: '4.5rem',
                                borderRadius: 'var(--radius-xl)',
                                backgroundColor: `${item.color}15`,
                                color: item.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifycontent: 'center',
                                transition: 'transform 0.3s ease'
                            }} className="feature-icon-wrapper flex-center">
                                <Icon size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{item.title}</h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6'
                            }}>{item.description}</p>
                        </motion.div>
                    );
                })}
            </motion.div>

            <style>{`
                .premium-card:hover .feature-icon-wrapper {
                    transform: scale(1.1) rotate(5deg);
                }
            `}</style>
        </section>
    );
}
