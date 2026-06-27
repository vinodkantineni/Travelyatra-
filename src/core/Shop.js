import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import { SlidersHorizontal } from "lucide-react";

const Shop = ({ history }) => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [], search: "" }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        getFilteredProducts(0, limit, newFilters).then(data => {
            if (data && data.error) {
                setError(data.error);
            } else if (data) {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const resetAllFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSelectedPrice("");
        
        const clearedFilters = { category: [], price: [], search: "", type: "" };
        loadFilteredResults(clearedFilters);
        setMyFilters({ filters: clearedFilters });
        history.push("/shop");
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data && data.error) {
                setError(data.error);
            } else if (data) {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
                    <button onClick={loadMore} className="btn-premium">
                        Load More Places
                    </button>
                </div>
            )
        );
    };

    useEffect(() => {
        init();
        
        const params = new URLSearchParams(window.location.search);
        const search = params.get('search') || params.get('q') || "";
        const type = params.get('type') || "";
        
        let initialFilters = { category: [], price: [], search: "", type: "" };
        if (search) {
            setSearchQuery(search);
            initialFilters.search = search;
        } else {
            setSearchQuery("");
            initialFilters.search = "";
        }
        if (type) {
            initialFilters.type = type;
        }
        
        setSelectedCategory("");
        setSelectedPrice("");
        
        loadFilteredResults(initialFilters);
        setMyFilters({ filters: initialFilters });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.search]);

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(newFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title="Incredible Destinations"
            description="Explore our curated collection of hand-picked luxury stays, adventure tours, and spiritual journeys."
            className="section-padding"
        >
            {/* Category Filter Bar */}
            <div style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: 'var(--radius-2xl)',
                padding: '1.5rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '2.5rem'
            }}>
                <Checkbox
                    categories={categories}
                    selectedCategory={selectedCategory}
                    handleFilters={filters => {
                        const cat = filters[0] || "";
                        setSelectedCategory(cat);
                        setSearchQuery("");
                        
                        const newFilters = { ...myFilters };
                        newFilters.filters["category"] = filters;
                        newFilters.filters["search"] = "";
                        newFilters.filters["type"] = "";
                        
                        loadFilteredResults(newFilters.filters);
                        setMyFilters(newFilters);
                    }}
                />
            </div>

            {/* Content Split layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '280px 1fr',
                gap: '3rem',
                alignItems: 'start'
            }} className="shop-grid-layout">
                
                {/* Left Sidebar Filters */}
                <aside style={{
                    position: 'sticky',
                    top: '100px',
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2rem',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                        <SlidersHorizontal size={18} className="text-primary" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Filters</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Search Keyword
                        </h4>
                        <input 
                            type="text"
                            placeholder="e.g. Goa, Kashmir..."
                            value={searchQuery}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearchQuery(val);
                                setSelectedCategory("");
                                
                                const newFilters = { ...myFilters };
                                newFilters.filters["search"] = val;
                                newFilters.filters["category"] = [];
                                newFilters.filters["type"] = "";
                                
                                loadFilteredResults(newFilters.filters);
                                setMyFilters(newFilters);
                            }}
                            className="form-input"
                            style={{ 
                                padding: '0.6rem 0.75rem', 
                                fontSize: '0.85rem',
                                width: '100%',
                                backgroundColor: 'var(--background)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Budget Range
                        </h4>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters => handleFilters(filters, "price")}
                        />
                    </div>
                </aside>

                {/* Right Destinations Grid */}
                <div>
                    {filteredResults.length > 0 ? (
                        <div className="grid-cols-3">
                            {filteredResults.map((product, i) => (
                                <Card key={i} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '6rem 2rem',
                            backgroundColor: 'var(--card-bg)',
                            borderRadius: 'var(--radius-xl)',
                            border: '1px dashed var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>No Destinations Found</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Try adjusting your filters or search keywords.</p>
                            </div>
                            <button 
                                type="button"
                                onClick={resetAllFilters} 
                                className="btn-premium"
                                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                    
                    {loadMoreButton()}
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .shop-grid-layout {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    aside {
                        position: relative !important;
                        top: auto !important;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default withRouter(Shop);
