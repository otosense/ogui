import React, { useEffect, useState } from 'react';

export function usePersistentState(key: string, defaultValue: any) {
    // Initialize state with the saved value or the defaultValue
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    // Use useEffect to save the state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}