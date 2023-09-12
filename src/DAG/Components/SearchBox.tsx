import React, { useState } from 'react';

function SearchBox({ data, handleValue }: { data: string[]; handleValue: any; }) {
    console.log('data', data);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState(data);

    const handleInputChange = (event: { target: { value: any; }; }) => {
        const term = event.target.value;
        setSearchTerm(term);
        // Filter suggestions based on the input value
        const filteredSuggestions: any = data.filter((item: any) => (item).toLowerCase().includes(term.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion: React.SetStateAction<string>) => {
        // Update the search box with the clicked suggestion
        setSearchTerm(suggestion);
        handleValue(suggestion);
        // Clear the suggestions
        setSuggestions([]);
    };

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                name="funcLists" id="funcLists" className="funcLists"
            />
            {suggestions.length > 0 && (
                <div className="suggestion-list">
                    {suggestions.map((suggestion, index) => (
                        <p key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBox;
