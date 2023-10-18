import React, { useState, useEffect, useMemo } from "react";

export function useOrientation(setOrientation: (orientation: boolean) => void) {
    const [orientation, setOrientationState] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setOrientationState(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    setOrientation(orientation);
    return orientation;
}