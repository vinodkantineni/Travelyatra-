import React, { useState } from "react";

const CheckBox = ({ categories, selectedCategory, handleFilters }) => {
    const [localSelected, setLocalSelected] = useState("");
    const selected = selectedCategory !== undefined ? selectedCategory : localSelected;

    const handleChange = (id) => {
        const nextVal = selected === id ? "" : id;
        if (selectedCategory === undefined) {
            setLocalSelected(nextVal);
        }
        handleFilters(nextVal ? [nextVal] : []);
    };

    return (
        <div style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%"
        }}>
            {categories.map((c, i) => {
                const isChecked = selected === c._id;
                return (
                    <button
                        key={i}
                        type="button"
                        onClick={() => handleChange(c._id)}
                        style={{
                            padding: "0.5rem 1.25rem",
                            borderRadius: "var(--radius-2xl)",
                            border: `1px solid ${isChecked ? "var(--primary)" : "var(--border-color)"}`,
                            backgroundColor: isChecked ? "var(--primary)" : "var(--card-bg)",
                            color: isChecked ? "#FFFFFF" : "var(--text-secondary)",
                            fontWeight: "600",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                    >
                        {c.name}
                    </button>
                );
            })}
        </div>
    );
};

export default CheckBox;
