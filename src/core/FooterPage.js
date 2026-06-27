import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Globe,
  X
} from "lucide-react";

const FooterPagePro = () => {
  const [modalContent, setModalContent] = useState(null); // 'privacy' | 'terms' | 'faqs' | null

  return (
    <footer style={{
      backgroundColor: "var(--card-bg)",
      borderTop: "1px solid var(--border-color)",
      padding: "5rem 10% 2rem 10%",
      color: "var(--text-secondary)",
      fontSize: "0.9rem"
    }}>
      {/* Top section: Brand and links */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
        gap: "4rem",
        marginBottom: "4rem"
      }} className="footer-links-grid">
        
        {/* Brand column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Globe size={24} style={{ color: "var(--primary)" }} />
            <Link to="/" style={{
              fontSize: "1.4rem",
              fontWeight: "800",
              letterSpacing: "-0.5px",
              textDecoration: "none",
              color: "var(--text-primary)"
            }}>
              Travel<span style={{ color: "var(--primary)" }}>Yatra</span>
            </Link>
          </div>
          <p style={{ lineHeight: "1.7", color: "var(--text-secondary)" }}>
            A premium travel platform that activates the traveling bug. We deliver hand-inspected luxury excursions, custom-tailored itineraries, and absolute peace of mind for modern world explorers.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} className="footer-social-link"><Facebook size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} className="footer-social-link"><Twitter size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} className="footer-social-link"><Linkedin size={18} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} className="footer-social-link"><Instagram size={18} /></a>
          </div>
        </div>

        {/* Explore column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "1px" }}>Explore</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li><Link to="/shop" style={{ textDecoration: "none", color: "inherit" }} className="footer-hover-link">Destinations</Link></li>
            <li><Link to="/gallery" style={{ textDecoration: "none", color: "inherit" }} className="footer-hover-link">Travel Gallery</Link></li>
            <li><Link to="/about" style={{ textDecoration: "none", color: "inherit" }} className="footer-hover-link">About Us</Link></li>
            <li><Link to="/team" style={{ textDecoration: "none", color: "inherit" }} className="footer-hover-link">Our Team</Link></li>
          </ul>
        </div>

        {/* Support column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "1px" }}>Support</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li><Link to="/cart" style={{ textDecoration: "none", color: "inherit" }} className="footer-hover-link">My Wishlist</Link></li>
            <li><Link to="/contact" style={{ textDecoration: "none", color: "inherit" }} className="footer-hover-link">Contact Us</Link></li>
            <li><button onClick={() => setModalContent('faqs')} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, color: "inherit" }} className="footer-hover-link">FAQs & Help</button></li>
            <li><button onClick={() => setModalContent('privacy')} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, color: "inherit" }} className="footer-hover-link">Privacy Policy</button></li>
          </ul>
        </div>

        {/* Contact column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "1px" }}>Contact Info</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <MapPin size={18} style={{ flexShrink: 0, marginTop: "0.15rem", color: "var(--primary)" }} />
              <span>Gorakhpur, UP 274203, India</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Mail size={18} style={{ flexShrink: 0, color: "var(--primary)" }} />
              <span>info@TravelYatra.com</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Phone size={18} style={{ flexShrink: 0, color: "var(--primary)" }} />
              <span>+91 123 456 7890</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom section: Copyright and legal links */}
      <div style={{
        borderTop: "1px solid var(--border-color)",
        paddingTop: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }} className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} TravelYatra. All rights reserved. Made for portfolio showcase.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <button onClick={() => setModalContent('terms')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }} className="footer-hover-link">Terms of Service</button>
          <button onClick={() => setModalContent('privacy')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }} className="footer-hover-link">Privacy Policy</button>
          <button onClick={() => setModalContent('privacy')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }} className="footer-hover-link">Cookie Preferences</button>
        </div>
      </div>

      {/* Luxury Blur Modal */}
      {modalContent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
           <div className="glass-panel" style={{
             width: '100%',
             maxWidth: '600px',
             borderRadius: 'var(--radius-xl)',
             padding: '2.5rem',
             backgroundColor: 'var(--card-bg)',
             border: '1px solid var(--border-color)',
             boxShadow: 'var(--shadow-2xl)',
             position: 'relative',
             maxHeight: '80vh',
             overflowY: 'auto',
             color: 'var(--text-primary)'
           }}>
              <button 
                onClick={() => setModalContent(null)} 
                aria-label="Close modal"
                style={{ 
                  position: 'absolute', 
                  top: '1.25rem', 
                  right: '1.25rem', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.25rem',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-color)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                 <X size={20} />
              </button>

              {modalContent === 'privacy' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '2rem' }}>•</span> Privacy Policy
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    <p>At TravelYatra, we prioritize protecting your private information. This Privacy Policy details how we collect, store, encrypt, and secure your personal booking coordinates, travel preferences, and contact records.</p>
                    <p><strong>1. Data Collection:</strong> We collect necessary login credentials, secure payment indicators, and voluntary itinerary specifications when you register or shortlist destinations.</p>
                    <p><strong>2. Information Safeguarding:</strong> All transactions are executed via industry-standard SSL encryption protocols. We will never sell or rent your personal coordinates to external marketing groups.</p>
                    <p><strong>3. Cookie Usage:</strong> TravelYatra employs functional cookies to maintain your selected styling themes (Light/Dark mode) and remember your shortlisted packages in the wishlist.</p>
                  </div>
                </div>
              )}

              {modalContent === 'terms' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '2rem' }}>•</span> Terms of Service
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    <p>Welcome to TravelYatra. By accessing or utilizing our luxury reservation engine, you explicitly agree to align with the following guidelines and legal terms.</p>
                    <p><strong>1. Reservation Validity:</strong> All listed itineraries, resort packages, and activities are subject to final operator availability and pricing adjustments before transaction approval.</p>
                    <p><strong>2. Cancellation Protocols:</strong> Refund percentages and administrative fees are calculated in strict alignment with specific airline or hotel partner rules and timeframe notifications.</p>
                    <p><strong>3. Intellectual Material:</strong> The premium photography, custom interfaces, brand assets, and structural coding displayed on this site represent intellectual property owned by TravelYatra.</p>
                  </div>
                </div>
              )}

              {modalContent === 'faqs' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '2rem' }}>•</span> FAQs & Help Center
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>Q: How do I change my package details?</strong>
                      <span>A: Please navigate to the "Contact Us" portal or communicate directly with our 24/7 VIP Concierge helpdesk to adjust passenger list or booking dates.</span>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>Q: Are flights included in the displayed package rates?</strong>
                      <span>A: Premium activities and package details specify if airfare is covered. Standard entries focus on local lodging, private transfers, and excursions.</span>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>Q: How are booking transactions processed?</strong>
                      <span>A: We implement Braintree integration (Sandbox environment for demo) to process digital payments in a secure, PCI-compliant environment.</span>
                    </div>
                  </div>
                </div>
              )}
           </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            gap: 1rem !important;
            text-align: center !important;
          }
        }
        @media (max-width: 600px) {
          .footer-links-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        .footer-social-link:hover {
          color: var(--primary) !important;
        }
        .footer-hover-link {
          transition: color 0.15s ease;
        }
        .footer-hover-link:hover {
          color: var(--primary) !important;
        }
      `}</style>
    </footer>
  );
};

export default FooterPagePro;