import { type FC, Suspense, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import SceneTransition from '../components/ui/SceneTransition';

interface RiskCard {
    id: number;
    title: string;
    description: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const RisksScene: FC = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const riskCards: RiskCard[] = useMemo(() => [
        {
            id: 1,
            title: "Desafíos Técnicos",
            description: "La fabricación de componentes ópticos requiere precisión nanométrica y materiales especializados, lo que aumenta significativamente los costos de producción y limita la escalabilidad comercial.",
            position: 'top-left'
        },
        {
            id: 2,
            title: "Integración con Sistemas Existentes",
            description: "La transición de sistemas electrónicos a ópticos requiere una reestructuración completa de la infraestructura, generando costos de migración y posibles incompatibilidades con tecnologías actuales.",
            position: 'top-right'
        },
        {
            id: 3,
            title: "Complejidad de Diseño",
            description: "Los circuitos fotónicos son más complejos de diseñar y depurar que los circuitos electrónicos, requiriendo especialistas altamente capacitados y herramientas de diseño especializadas.",
            position: 'bottom-left'
        },
        {
            id: 4,
            title: "Sensibilidad Ambiental",
            description: "Los sistemas ópticos pueden ser más sensibles a variaciones de temperatura, vibraciones y contaminación, requiriendo condiciones ambientales controladas para un funcionamiento óptimo.",
            position: 'bottom-right'
        }
    ], []);

    const getCardPosition = (position: string) => {
        switch (position) {
            case 'top-left':
                return 'top-24 left-20 md:top-32 md:left-32 lg:top-40 lg:left-48';
            case 'top-right':
                return 'top-24 right-20 md:top-32 md:right-32 lg:top-40 lg:right-48';
            case 'bottom-left':
                return 'bottom-24 left-20 md:bottom-32 md:left-32 lg:bottom-40 lg:left-48';
            case 'bottom-right':
                return 'bottom-24 right-20 md:bottom-32 md:right-32 lg:bottom-40 lg:right-48';
            default:
                return '';
        }
    };

    const getParticlePosition = (position: string) => {
        switch (position) {
            case 'top-left':
                return { top: '-12px', left: '-12px' };
            case 'top-right':
                return { top: '-12px', right: '-12px' };
            case 'bottom-left':
                return { bottom: '-12px', left: '-12px' };
            case 'bottom-right':
                return { bottom: '-12px', right: '-12px' };
            default:
                return { top: '-12px', left: '-12px' };
        }
    };

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
            {/* Elegant transition */}
            <SceneTransition 
                variant="smooth-gradient" 
                fromColor="#000000" 
                toColor="rgba(185, 28, 28, 0.3)" 
                position="top" 
                intensity="medium" 
            />
            <SceneTransition 
                variant="smooth-gradient" 
                fromColor="rgba(185, 28, 28, 0.3)" 
                toColor="rgba(30, 27, 75, 0.95)" 
                position="bottom" 
                intensity="medium" 
            />

            {/* Spline Scene Container */}
            <div 
                className="absolute inset-0 w-full h-full"
                data-lenis-prevent
                style={{
                    width: '100%',
                    height: '100vh',
                    minHeight: '100vh',
                    maxHeight: '100vh',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    transform: 'translateZ(0) scale(1)',
                    willChange: 'auto'
                }}
            >
                <Suspense fallback={
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-950 via-red-900 to-orange-950">
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
                        scene="https://prod.spline.design/4KmX-Xf9Wizuimor/scene.splinecode"
                        className="w-full h-full"
                        data-lenis-prevent
                        style={{
                            width: '100%',
                            height: '100vh',
                            minHeight: '100vh',
                            maxHeight: '100vh',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            transform: 'scale(1)',
                            willChange: 'auto'
                        }}
                    />
                </Suspense>

                {/* Orange/Red overlay filter - Low performance cost */}
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.4) 0%, rgba(220, 38, 38, 0.5) 50%, rgba(249, 115, 22, 0.4) 100%)',
                        mixBlendMode: 'multiply',
                        zIndex: 2
                    }}
                />
            </div>

            {/* Risk Cards - One in each corner - Appear on hover */}
            <div className="absolute inset-0 z-30 pointer-events-none">
                {riskCards.map((card, index) => {
                    const isHovered = hoveredCard === card.id;
                    return (
                        <div
                            key={card.id}
                            className={`absolute ${getCardPosition(card.position)} pointer-events-auto`}
                            style={{
                                maxWidth: '380px',
                                width: 'calc(100% - 8rem)',
                            }}
                            onMouseEnter={() => setHoveredCard(card.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Enhanced Particle indicator - Always visible */}
                            <motion.div
                                className="absolute pointer-events-auto cursor-pointer z-10"
                                style={{
                                    ...getParticlePosition(card.position),
                                }}
                                initial={{ opacity: 0.7, scale: 0.9 }}
                                animate={{ 
                                    opacity: isHovered ? 1 : 0.7,
                                    scale: isHovered ? 1.15 : [0.9, 1.05, 0.9]
                                }}
                                transition={{ 
                                    opacity: { duration: 0.3 },
                                    scale: { 
                                        duration: isHovered ? 0.3 : 2.5,
                                        repeat: isHovered ? 0 : Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                whileHover={{ scale: 1.25 }}
                            >
                                {/* Outer pulsing glow ring - Enhanced */}
                                <motion.div 
                                    className="absolute rounded-full"
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, rgba(220, 38, 38, 0.15) 30%, transparent 70%)',
                                        filter: 'blur(2px)',
                                    }}
                                    animate={{
                                        scale: isHovered ? [1, 1.15, 1] : [1, 1.25, 1],
                                        opacity: isHovered ? [0.5, 0.7, 0.5] : [0.3, 0.5, 0.3]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: [0.4, 0, 0.6, 1]
                                    }}
                                />
                                
                                {/* Middle rotating glow ring - Enhanced */}
                                <motion.div 
                                    className="absolute rounded-full"
                                    style={{
                                        width: '42px',
                                        height: '42px',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        background: 'conic-gradient(from 0deg, rgba(249, 115, 22, 0.15) 0%, transparent 50%, rgba(220, 38, 38, 0.15) 100%)',
                                        border: '1px solid rgba(249, 115, 22, 0.15)',
                                    }}
                                    animate={{
                                        rotate: isHovered ? 0 : 360,
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        rotate: {
                                            duration: 12,
                                            repeat: Infinity,
                                            ease: "linear"
                                        },
                                        scale: {
                                            duration: 2.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                />
                                
                                {/* Main particle - Ultra modern design */}
                                <motion.div 
                                    className="relative rounded-full"
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 1) 0%, rgba(249, 115, 22, 0.95) 30%, rgba(220, 38, 38, 0.9) 70%, rgba(249, 115, 22, 0.8) 100%)',
                                        boxShadow: `
                                            0 0 16px rgba(249, 115, 22, 0.7),
                                            0 0 32px rgba(220, 38, 38, 0.4),
                                            0 0 48px rgba(249, 115, 22, 0.2),
                                            inset -2px -2px 8px rgba(0, 0, 0, 0.2),
                                            inset 2px 2px 8px rgba(255, 255, 255, 0.6)
                                        `,
                                        border: '1.5px solid rgba(255, 255, 255, 0.7)',
                                    }}
                                    animate={{
                                        scale: isHovered ? 1.1 : [1, 1.05, 1],
                                        boxShadow: isHovered ? [
                                            '0 0 20px rgba(249, 115, 22, 0.9), 0 0 40px rgba(220, 38, 38, 0.6), 0 0 60px rgba(249, 115, 22, 0.3)',
                                            '0 0 24px rgba(249, 115, 22, 1), 0 0 48px rgba(220, 38, 38, 0.7), 0 0 72px rgba(249, 115, 22, 0.4)',
                                            '0 0 20px rgba(249, 115, 22, 0.9), 0 0 40px rgba(220, 38, 38, 0.6), 0 0 60px rgba(249, 115, 22, 0.3)'
                                        ] : undefined
                                    }}
                                    transition={{
                                        scale: {
                                            duration: 2.5,
                                            repeat: Infinity,
                                            ease: [0.4, 0, 0.6, 1]
                                        },
                                        boxShadow: {
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                >
                                    {/* Inner core glow - Enhanced */}
                                    <div 
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 70%)',
                                        }}
                                    />
                                    
                                    {/* Highlight dot - Enhanced */}
                                    <motion.div 
                                        className="absolute rounded-full"
                                        style={{
                                            width: '5px',
                                            height: '5px',
                                            background: 'rgba(255, 255, 255, 1)',
                                            top: '28%',
                                            left: '28%',
                                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.5)',
                                        }}
                                        animate={{
                                            opacity: [0.7, 1, 0.7],
                                            scale: [0.9, 1.1, 0.9]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>

                                {/* Enhanced floating particles - reducido de 4 a 2 por indicador */}
                                {[...Array(2)].map((_, i) => {
                                    const angle = (i * 90) * Math.PI / 180;
                                    const baseRadius = 28;
                                    const radiusVariation = 4;
                                    
                                    return (
                                        <motion.div
                                            key={i}
                                            className="absolute rounded-full"
                                            style={{
                                                width: '6px',
                                                height: '6px',
                                                left: '50%',
                                                top: '50%',
                                                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(249, 115, 22, 0.9) 40%, rgba(220, 38, 38, 0.7) 100%)',
                                                boxShadow: `
                                                    0 0 8px rgba(249, 115, 22, 0.6),
                                                    0 0 16px rgba(220, 38, 38, 0.4),
                                                    0 0 24px rgba(249, 115, 22, 0.2),
                                                    inset 0 0 4px rgba(255, 255, 255, 0.8)
                                                `,
                                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                            }}
                                            animate={{
                                                x: [
                                                    Math.cos(angle) * (baseRadius - radiusVariation),
                                                    Math.cos(angle) * (baseRadius + radiusVariation),
                                                    Math.cos(angle) * (baseRadius - radiusVariation)
                                                ],
                                                y: [
                                                    Math.sin(angle) * (baseRadius - radiusVariation),
                                                    Math.sin(angle) * (baseRadius + radiusVariation),
                                                    Math.sin(angle) * (baseRadius - radiusVariation)
                                                ],
                                                opacity: [0.4, 0.9, 0.4],
                                                scale: [0.7, 1.2, 0.7],
                                                rotate: [0, 360]
                                            }}
                                            transition={{
                                                duration: 4 + i * 0.3,
                                                repeat: Infinity,
                                                ease: [0.4, 0, 0.6, 1], // Smooth cubic bezier
                                                delay: i * 0.2,
                                                times: [0, 0.5, 1]
                                            }}
                                        >
                                            {/* Subtle trailing glow effect */}
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
                                                    width: '16px',
                                                    height: '16px',
                                                    left: '50%',
                                                    top: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                }}
                                                animate={{
                                                    scale: [0.8, 1.4, 0.8],
                                                    opacity: [0, 0.4, 0]
                                                }}
                                                transition={{
                                                    duration: 4 + i * 0.3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: i * 0.2
                                                }}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ 
                                            opacity: 0,
                                            scale: 0.9,
                                            y: card.position.includes('bottom') ? -20 : 20,
                                            filter: 'blur(10px)'
                                        }}
                                        animate={{ 
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                            filter: 'blur(0px)'
                                        }}
                                        exit={{ 
                                            opacity: 0,
                                            scale: 0.9,
                                            y: card.position.includes('bottom') ? -20 : 20,
                                            filter: 'blur(10px)'
                                        }}
                                        transition={{ 
                                            duration: 0.4,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                        className="relative"
                                        style={{
                                            marginTop: card.position.includes('bottom') ? '0' : '2rem',
                                            marginBottom: card.position.includes('bottom') ? '2rem' : '0'
                                        }}
                                    >
                                        {/* Modern Liquid Glass Card */}
                                        <div 
                                            className="relative overflow-hidden rounded-3xl p-6 md:p-8"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
                                                backdropFilter: 'blur(16px)',
                                                WebkitBackdropFilter: 'blur(16px)',
                                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                                            }}
                                        >
                                            {/* Gradient overlay for orange/red theme */}
                                            <div 
                                                className="absolute inset-0 opacity-30"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
                                                }}
                                            />

                                            {/* Specular highlight */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />

                                            {/* Noise texture for realism */}
                                            <div 
                                                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                                style={{
                                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                                                    mixBlendMode: 'overlay'
                                                }}
                                            />

                                            {/* Content */}
                                            <div className="relative z-10">
                                                <h3 
                                                    className="text-xl md:text-2xl font-bold mb-4 leading-tight tracking-tight"
                                                    style={{
                                                        color: '#FED7AA',
                                                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                                                        fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                                                    }}
                                                >
                                                    {card.title}
                                                </h3>
                                                <p 
                                                    className="text-sm md:text-base leading-relaxed"
                                                    style={{
                                                        color: '#FEE2E2',
                                                        textShadow: '0 1px 5px rgba(0, 0, 0, 0.5)',
                                                        fontWeight: 400
                                                    }}
                                                >
                                                    {card.description}
                                                </p>
                                            </div>

                                            {/* Shine effect on hover */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                                                style={{
                                                    transform: 'skewX(-20deg)',
                                                }}
                                                animate={{
                                                    x: ['-100%', '200%']
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    repeatDelay: 3,
                                                    ease: 'easeInOut'
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default RisksScene;
