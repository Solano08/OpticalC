import { type FC, Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import SceneTransition from '../components/ui/SceneTransition';

const HeroScene: FC = () => {
    // Memoize team members to prevent re-creation
    const teamMembers = useMemo(() => ['David Solano', 'Duver Olmos', 'Juliana Tique', 'Camilo Torres'], []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black text-white">
            {/* Background Spline Scene */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                <Suspense fallback={
                    <div className="w-full h-full flex items-center justify-center bg-black">
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
                        scene="https://prod.spline.design/EsN54LeeKRcHG4PY/scene.splinecode"
                        className="w-full h-full"
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </Suspense>
                {/* Overlay oscuro para oscurecer el fondo */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
            </div>

            {/* Overlay UI */}
            <div className="absolute inset-0 z-20 flex flex-col p-6 md:p-12">

                {/* Team Members - Top Section with Advanced Liquid Glass Effect */}
                <motion.div
                    className="flex justify-center w-full mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
                        {teamMembers.map((name, index) => (
                            <motion.div
                                key={name}
                                className="group relative overflow-hidden rounded-full cursor-default"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                {/* Ultra-modern Liquid Glass Background */}
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl transition-colors duration-300 group-hover:bg-white/10" />

                                {/* Specular Highlight / Reflection */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30 pointer-events-none" />

                                {/* Diffused Glow (No visible contour/border) */}
                                <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.05)] pointer-events-none" />

                                {/* Content */}
                                <div className="relative px-4 py-3 flex items-center justify-center">
                                    <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide text-center whitespace-nowrap font-sans drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                                        {name}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Main Content - Centered */}
                <div className="flex flex-col items-center justify-center flex-grow">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative z-30 flex flex-col items-center"
                    >
                        {/* Apple-style Typography: Inter, Tight Tracking, Bold but not Black */}
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-center text-white leading-tight drop-shadow-lg"
                            style={{
                                fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                textShadow: '0 0 10px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.1)'
                            }}>
                            <span className="block text-white">
                                COMPUTACIÓN
                            </span>
                            <span className="block text-white">
                                ÓPTICA
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                        className="text-lg md:text-xl text-gray-300 mt-12 max-w-3xl text-center font-light tracking-wide px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                    >
                        Un paradigma tecnológico que utiliza la luz para procesar, almacenar y transmitir información a la velocidad de casi 300,000 km/s
                    </motion.p>
                </div>

                {/* Bottom Section */}
                <div className="absolute bottom-12 left-0 right-0 flex justify-center items-end z-30">
                    {/* Scroll Indicator (Center) */}
                    <motion.div
                        className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                    >
                        <motion.div
                            className="w-1 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                            animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>

            </div>

            {/* Elegant transition to next scene - behind all content */}
            <SceneTransition variant="smooth-gradient" fromColor="#000000" toColor="#000000" position="bottom" intensity="medium" />
        </section>
    );
};

export default HeroScene;
