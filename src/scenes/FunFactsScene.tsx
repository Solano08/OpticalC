import { type FC, Suspense } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import SceneTransition from '../components/ui/SceneTransition';

const FunFactsScene: FC = () => {
    return (
        <section 
            className="relative w-full flex items-center justify-center overflow-hidden"
            style={{ 
                height: '100vh',
                minHeight: '100vh',
                maxHeight: '100vh',
                position: 'relative',
                width: '100%'
            }}
        >
            {/* Elegant transition from previous scene */}
            <SceneTransition variant="smooth-gradient" fromColor="rgba(15, 23, 42, 0.95)" toColor="rgba(30, 27, 75, 0.95)" position="top" intensity="medium" />

            {/* Spline Scene Container */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{
                    width: '100%',
                    height: '100vh',
                    minHeight: '100vh',
                    maxHeight: '100vh',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1
                }}
            >
                <Suspense fallback={
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white text-xl"
                        >
                            Cargando escena 3D...
                        </motion.div>
                    </div>
                }>
                    <Spline 
                        scene="https://prod.spline.design/fed9qcxdPSWkLu-W/scene.splinecode"
                        className="w-full h-full"
                        style={{
                            width: '100%',
                            height: '100vh',
                            minHeight: '100vh',
                            maxHeight: '100vh',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                    />
                </Suspense>

                {/* Dark overlay to darken the background */}
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 2
                    }}
                />
            </div>

            {/* GRACIAS text in the center */}
            <div className="relative z-30 flex items-center justify-center">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold text-white"
                    style={{
                        textShadow: '0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3), 0 0 120px rgba(255, 255, 255, 0.2)',
                        fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}
                >
                    GRACIAS
                </motion.h1>
            </div>
        </section>
    );
};

export default FunFactsScene;
