import React from "react";
import Menu from "./Menu";
import Footer from './FooterPage';
import "../styles.css";

const Layout = ({
    title = "",
    description = "",
    className = "",
    children
}) => (
    <div className="app-layout">
        <Menu />
        <main className={`main-content ${className}`} style={{ paddingTop: '80px', minHeight: '80vh' }}>
            {title && (
                <header className="page-header section-padding" style={{ paddingBottom: '2rem' }}>
                    <h1 className="h1 text-center font-weight-bold" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{title}</h1>
                    {description && <p className="text-center text-secondary" style={{ fontSize: '1.1rem' }}>{description}</p>}
                </header>
            )}
            <div>{children}</div>
        </main>
        <Footer />
    </div>
);

export default Layout;
