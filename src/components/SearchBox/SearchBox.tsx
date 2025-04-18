import React from 'react';
import { Input } from "reactstrap";
import "./SearchBox.scss";

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    variant?: 'rounded' | 'square';
    className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
    value,
    onChange,
    placeholder = "Search",
    variant = 'rounded',
    className = ''
}) => {
    const handleClear = () => {
        onChange('');
    };

    return (
        <div className={`search-wrapper ${className}`}>
            <div className={`search-box ${variant}`}>
                <i className="bx bx-search search-icon"></i>
                <Input
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                {value && (
                    <i className="bx bx-x clear-icon" onClick={handleClear}></i>
                )}
            </div>
        </div>
    );
};

export default SearchBox; 