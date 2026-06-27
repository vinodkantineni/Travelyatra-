import React, { useState } from "react";

const RadioBox = ({ prices, selectedPrice, handleFilters }) => {
    const [localSelected, setLocalSelected] = useState("");
    const selected = selectedPrice !== undefined ? selectedPrice : localSelected;

    const handleChange = event => {
        const val = event.target.value;
        if (selectedPrice === undefined) {
            setLocalSelected(val);
        }
        handleFilters(val);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            padding: "0.5rem"
        }}>
            {prices.map((p, i) => {
                const isSelected = selected === `${p._id}`;
                return (
                    <label 
                        key={i} 
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.9rem",
                            fontWeight: "500",
                            color: isSelected ? "var(--primary)" : "var(--text-secondary)",
                            cursor: "pointer",
                            transition: "color 0.2s"
                        }}
                    >
                        <input
                            onChange={handleChange}
                            value={`${p._id}`}
                            checked={isSelected}
                            name="price-filter"
                            type="radio"
                            style={{
                                cursor: "pointer",
                                accentColor: "var(--primary)"
                            }}
                        />
                        {p.name}
                    </label>
                );
            })}
        </div>
    );
};

export default RadioBox;
