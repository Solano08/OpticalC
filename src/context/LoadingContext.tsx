import { createContext, useContext, useState, useEffect, type ReactNode, type FC } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    progress: number;
    setProgress: (progress: number) => void;
    videoShouldRestart: boolean;
    triggerVideoRestart: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [videoShouldRestart, setVideoShouldRestart] = useState(false);

    const triggerVideoRestart = () => {
        setVideoShouldRestart(true);
        // Reset after a short delay to allow the effect to trigger
        setTimeout(() => setVideoShouldRestart(false), 100);
    };


    // Simulate loading progress for demo purposes (replace with real asset loading logic later)
    useEffect(() => {
        if (!isLoading) {
            setProgress(100);
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 15;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isLoading]);

    // Auto-close disabled - user must click to continue
    // useEffect(() => {
    //     // Only proceed if both conditions are true
    //     if (progress >= 100 && minTimeElapsed && isLoading) {
    //         const timeout = setTimeout(() => {
    //             setIsLoading(false);
    //         }, 500); // Small delay before closing
    //         return () => clearTimeout(timeout);
    //     }
    // }, [progress, minTimeElapsed, isLoading]);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, progress, setProgress, videoShouldRestart, triggerVideoRestart }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
