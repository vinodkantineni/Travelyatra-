import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';
import { Globe, User, Mail, Lock } from 'lucide-react';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            minHeight: "75vh",
            borderRadius: "var(--radius-2xl)",
            overflow: "hidden",
            boxShadow: "var(--shadow-xl)",
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            margin: "2rem auto",
            maxWidth: "1000px"
        }} className="auth-split-grid">
            
            {/* Left Column: Form */}
            <div style={{ padding: "3.5rem 3rem", display: "flex", flexDirection: "column", justifycontent: "center", gap: "1.5rem" }}>
                <div>
                    <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "1px" }}>Join Us</span>
                    <h2 style={{ fontSize: "2rem", fontWeight: "800", marginTop: "0.25rem" }}>Create An Account</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Start booking custom luxury getaways around the globe today.</p>
                </div>

                <form onSubmit={clickSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="form-input-group">
                        <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <User size={14} className="text-secondary" /> Full Name
                        </label>
                        <input 
                            onChange={handleChange('name')} 
                            type="text" 
                            className="form-input" 
                            value={name} 
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="form-input-group">
                        <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <Mail size={14} className="text-secondary" /> Email Address
                        </label>
                        <input 
                            onChange={handleChange('email')} 
                            type="email" 
                            className="form-input" 
                            value={email} 
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="form-input-group">
                        <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <Lock size={14} className="text-secondary" /> Password
                        </label>
                        <input 
                            onChange={handleChange('password')} 
                            type="password" 
                            className="form-input" 
                            value={password} 
                            placeholder="Min 6 characters"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-premium" style={{ width: "100%", padding: "0.85rem", marginTop: "0.5rem" }}>
                        Create Account
                    </button>
                </form>

                <div style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Already have an account? <Link to="/signin" style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "none" }}>Sign In</Link>
                </div>
            </div>

            {/* Right Column: Visual */}
            <div style={{
                position: "relative",
                backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "3rem",
                color: "#FFFFFF"
            }} className="auth-visual-panel">
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(15, 23, 42, 0.4)",
                    zIndex: 1
                }} />
                
                <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                        <Globe size={24} style={{ color: "#38BDF8" }} />
                        <span style={{ fontWeight: "800", fontSize: "1.2rem", letterSpacing: "-0.5px" }}>TravelYatra</span>
                    </div>
                    <p style={{ fontSize: "1.1rem", fontWeight: "500", fontStyle: "italic", opacity: 0.95 }}>
                        "To travel is to live, explore new sights, and gather unforgettable memories."
                    </p>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .auth-split-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .auth-visual-panel {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );

    const showError = () => (
        <div className="custom-toast" style={{ 
            display: error ? 'flex' : 'none',
            backgroundColor: "var(--card-bg)",
            borderLeftColor: "var(--danger)",
            position: "fixed",
            top: "6rem",
            right: "2rem",
            zIndex: 1000
        }}>
            <span style={{ color: "var(--danger)", fontWeight: 600 }}>{error}</span>
        </div>
    );

    const showSuccess = () => (
        <div className="custom-toast" style={{ 
            display: success ? 'flex' : 'none',
            backgroundColor: "var(--card-bg)",
            borderLeftColor: "var(--success)",
            position: "fixed",
            top: "6rem",
            right: "2rem",
            zIndex: 1000
        }}>
            <span style={{ color: "var(--success)", fontWeight: 600 }}>New account created. Please <Link to="/signin" style={{ color: "var(--primary)", textDecoration: "underline" }}>Sign In</Link>.</span>
        </div>
    );

    return (
        <Layout title="" description="">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
