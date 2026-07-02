import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import { 
  Search, 
  Heart, 
  Bell, 
  User, 
  Sun, 
  Moon, 
  Menu as MenuIcon, 
  X, 
  LogOut, 
  Globe
} from "lucide-react";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2563EB", fontWeight: "700" };
    }
    return {};
};

const Menu = ({ history }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    const handleSearchClick = () => {
        const searchSection = document.getElementById("booking-card");
        if (searchSection) {
            searchSection.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            history.push("/shop");
        }
    };

    const mockNotifications = [
        "Special Offer: 20% off on Kashmir Luxury tour!",
        "Your booking for Goa Yacht Cruise is confirmed.",
        "New adventure package added: Hot Air Ballooning in Jaipur!"
    ];

    return (
        <header className={`sticky-navbar ${scrolled ? "scrolled" : ""}`} style={{
            height: "clamp(70px, 5.5rem, 90px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10%",
            width: "100%",
            color: scrolled ? "var(--text-primary)" : "#FFFFFF",
            transition: "all 0.3s ease"
        }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Globe size={28} className="text-primary" style={{ color: "#2563EB" }} />
                <Link to="/" style={{
                    fontSize: "1.6rem",
                    fontWeight: "800",
                    letterSpacing: "-0.5px",
                    textDecoration: "none",
                    color: scrolled ? "var(--text-primary)" : "#FFFFFF"
                }}>
                    Travel<span style={{ color: "#2563EB" }}>Yatra</span>
                </Link>
            </div>

            {/* Navigation - Center */}
            <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <Link to="/" style={{ textDecoration: "none", fontSize: "0.95rem", fontWeight: "500", color: scrolled ? "var(--text-primary)" : "rgba(255, 255, 255, 0.9)", ...isActive(history, "/") }}>Home</Link>
                <Link to="/shop" style={{ textDecoration: "none", fontSize: "0.95rem", fontWeight: "500", color: scrolled ? "var(--text-primary)" : "rgba(255, 255, 255, 0.9)", ...isActive(history, "/shop") }}>Destinations</Link>
                <Link to="/shop?type=packages" style={{ textDecoration: "none", fontSize: "0.95rem", fontWeight: "500", color: scrolled ? "var(--text-primary)" : "rgba(255, 255, 255, 0.9)" }}>Packages</Link>
                <Link to="/shop?type=flights" style={{ textDecoration: "none", fontSize: "0.95rem", fontWeight: "500", color: scrolled ? "var(--text-primary)" : "rgba(255, 255, 255, 0.9)" }}>Flights</Link>
                <Link to="/shop?type=hotels" style={{ textDecoration: "none", fontSize: "0.95rem", fontWeight: "500", color: scrolled ? "var(--text-primary)" : "rgba(255, 255, 255, 0.9)" }}>Hotels</Link>
                <Link to="/gallery" style={{ textDecoration: "none", fontSize: "0.95rem", fontWeight: "500", color: scrolled ? "var(--text-primary)" : "rgba(255, 255, 255, 0.9)", ...isActive(history, "/gallery") }}>Gallery</Link>
                <Link to="/about" style={{ textDecoration: "none", fontSize: "0.95rem", fontWeight: "500", color: scrolled ? "var(--text-primary)" : "rgba(255, 255, 255, 0.9)", ...isActive(history, "/about") }}>About</Link>
            </nav>

            {/* Controls - Right */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <button onClick={handleSearchClick} aria-label="Search" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
                    <Search size={20} />
                </button>
                
                <Link to="/cart" aria-label="Wishlist" style={{ color: "inherit", position: "relative", display: "flex", alignItems: "center" }}>
                    <Heart size={20} />
                    {itemTotal() > 0 && (
                        <span style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            backgroundColor: "var(--danger)",
                            color: "#FFFFFF",
                            borderRadius: "50%",
                            width: "16px",
                            height: "16px",
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold"
                        }}>{itemTotal()}</span>
                    )}
                </Link>

                <div style={{ position: "relative" }}>
                    <button onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Notifications" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
                        <Bell size={20} />
                    </button>
                    {notificationsOpen && (
                        <div style={{
                            position: "absolute",
                            top: "35px",
                            right: "0",
                            width: "280px",
                            backgroundColor: "var(--card-bg)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "var(--radius-lg)",
                            boxShadow: "var(--shadow-lg)",
                            zIndex: 1000,
                            padding: "1rem",
                            color: "var(--text-primary)"
                        }}>
                            <h4 style={{ fontSize: "0.9rem", marginBottom: "0.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Notifications</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                {mockNotifications.map((note, index) => (
                                    <p key={index} style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{note}</p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button onClick={toggleTheme} aria-label="Toggle Theme" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
                    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* Authentication Links */}
                {!isAuthenticated() ? (
                    <div className="auth-buttons" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <Link to="/signin" style={{
                            textDecoration: "none",
                            color: scrolled ? "var(--text-primary)" : "#FFFFFF",
                            fontSize: "0.9rem",
                            fontWeight: "600"
                        }}>Login</Link>
                        <Link to="/signup" className="btn-premium" style={{
                            padding: "0.5rem 1.25rem",
                            fontSize: "0.85rem"
                        }}>Sign Up</Link>
                    </div>
                ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <Link to={isAuthenticated().user.role === 1 ? "/admin/dashboard" : "/user/dashboard"} aria-label="Dashboard" style={{ color: "inherit" }}>
                            <User size={20} />
                        </Link>
                        <button onClick={() => signout(() => history.push("/"))} aria-label="Signout" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
                            <LogOut size={20} />
                        </button>
                    </div>
                )}

                {/* Mobile Menu Icon */}
                <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Mobile Menu" style={{
                    display: "none",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: scrolled ? "var(--text-primary)" : "#FFFFFF"
                }}>
                    {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileOpen && (
                <div className="mobile-overlay glass-panel" style={{
                    position: "fixed",
                    top: "80px",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 999,
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem"
                }}>
                    <Link to="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", fontSize: "1.2rem", fontWeight: "600", color: "var(--text-primary)" }}>Home</Link>
                    <Link to="/shop" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", fontSize: "1.2rem", fontWeight: "600", color: "var(--text-primary)" }}>Destinations</Link>
                    <Link to="/shop?type=packages" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", fontSize: "1.2rem", fontWeight: "600", color: "var(--text-primary)" }}>Packages</Link>
                    <Link to="/shop?type=flights" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", fontSize: "1.2rem", fontWeight: "600", color: "var(--text-primary)" }}>Flights</Link>
                    <Link to="/shop?type=hotels" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", fontSize: "1.2rem", fontWeight: "600", color: "var(--text-primary)" }}>Hotels</Link>
                    <Link to="/gallery" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", fontSize: "1.2rem", fontWeight: "600", color: "var(--text-primary)" }}>Gallery</Link>
                    <Link to="/about" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", fontSize: "1.2rem", fontWeight: "600", color: "var(--text-primary)" }}>About Us</Link>
                    
                    {!isAuthenticated() ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                            <Link to="/signin" onClick={() => setMobileOpen(false)} style={{
                                textDecoration: "none",
                                color: "var(--text-primary)",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                textAlign: "center"
                            }}>Login</Link>
                            <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-premium" style={{
                                textAlign: "center"
                            }}>Sign Up</Link>
                        </div>
                    ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "1rem" }}>
                            <Link to={isAuthenticated().user.role === 1 ? "/admin/dashboard" : "/user/dashboard"} onClick={() => setMobileOpen(false)} style={{ color: "var(--text-primary)" }}>Dashboard</Link>
                            <button onClick={() => signout(() => { setMobileOpen(false); history.push("/"); })} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)", fontSize: "1rem", fontWeight: "600" }}>Signout</button>
                        </div>
                    )}
                </div>
            )}

            {/* Custom Responsive Styles injected into header */}
            <style>{`
                @media (max-width: 900px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .auth-buttons {
                        display: none !important;
                    }
                    .mobile-menu-btn {
                        display: block !important;
                    }
                }
            `}</style>
        </header>
    );
};

export default withRouter(Menu);
