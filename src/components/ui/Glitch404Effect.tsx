import { type FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchInstance {
    id: string;
    x: number;
    y: number;
    delay: number;
}

const Glitch404Effect: FC = () => {
    const [glitches, setGlitches] = useState<GlitchInstance[]>([]);

    useEffect(() => {
        const createGlitch = () => {
            const id = Math.random().toString(36).substring(7);
            const x = Math.random() * 80 + 10; // 10% a 90% del ancho
            const y = Math.random() * 80 + 10; // 10% a 90% del alto
            const delay = Math.random() * 0.3; // Delay aleatorio hasta 0.3s

            const newGlitch: GlitchInstance = {
                id,
                x,
                y,
                delay
            };

            setGlitches(prev => [...prev, newGlitch]);

            // Remover después de la animación
            setTimeout(() => {
                setGlitches(prev => prev.filter(g => g.id !== id));
            }, 800);
        };

        // Crear el primer glitch después de un delay inicial
        const initialDelay = setTimeout(() => {
            createGlitch();
        }, 2000);

        // Crear glitches periódicamente (cada 3-6 segundos)
        const interval = setInterval(() => {
            createGlitch();
        }, 3000 + Math.random() * 3000);

        return () => {
            clearTimeout(initialDelay);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
            <AnimatePresence>
                {glitches.map((glitch) => (
                    <motion.div
                        key={glitch.id}
                        initial={{ opacity: 0, scale: 0.5, filter: 'blur(15px)' }}
                        animate={{
                            opacity: [0, 0.4, 0.5, 0.3, 0],
                            scale: [0.5, 0.7, 0.65, 0.6, 0.5],
                            filter: [
                                'blur(15px)',
                                'blur(12px)',
                                'blur(10px)',
                                'blur(12px)',
                                'blur(15px)'
                            ],
                            x: [
                                0,
                                (Math.random() - 0.5) * 10,
                                (Math.random() - 0.5) * 8,
                                0
                            ],
                            y: [
                                0,
                                (Math.random() - 0.5) * 10,
                                (Math.random() - 0.5) * 8,
                                0
                            ]
                        }}
                        exit={{ opacity: 0, scale: 0.3, filter: 'blur(20px)' }}
                        transition={{
                            duration: 0.8,
                            delay: glitch.delay,
                            ease: [0.4, 0, 0.2, 1],
                            times: [0, 0.3, 0.6, 0.8, 1]
                        }}
                        className="absolute"
                        style={{
                            left: `${glitch.x}%`,
                            top: `${glitch.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <div
                            className="relative"
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 'clamp(0.8rem, 1.5vw, 2rem)',
                                fontWeight: 700,
                                color: '#ff0000',
                                textShadow: `
                                    0 0 8px rgba(255, 0, 0, 0.6),
                                    0 0 15px rgba(255, 0, 0, 0.4),
                                    0 0 25px rgba(255, 0, 0, 0.2),
                                    1px 1px 0px rgba(0, 0, 0, 0.8)
                                `,
                                letterSpacing: '0.05em',
                                filter: 'contrast(1.1) brightness(0.9)',
                                opacity: 0.6
                            }}
                        >
                            {/* Efecto de glitch con múltiples capas */}
                            <motion.span
                                className="absolute inset-0"
                                animate={{
                                    clipPath: [
                                        'inset(0% 0% 0% 0%)',
                                        'inset(20% 0% 60% 0%)',
                                        'inset(0% 0% 0% 0%)',
                                        'inset(10% 0% 80% 0%)',
                                        'inset(0% 0% 0% 0%)'
                                    ],
                                    x: [0, -3, 0, 3, 0]
                                }}
                                transition={{
                                    duration: 0.15,
                                    repeat: 3,
                                    ease: 'linear'
                                }}
                                style={{
                                    color: '#ff0080',
                                    mixBlendMode: 'screen'
                                }}
                            >
                                404
                            </motion.span>
                            <motion.span
                                className="absolute inset-0"
                                animate={{
                                    clipPath: [
                                        'inset(0% 0% 0% 0%)',
                                        'inset(60% 0% 20% 0%)',
                                        'inset(0% 0% 0% 0%)',
                                        'inset(80% 0% 10% 0%)',
                                        'inset(0% 0% 0% 0%)'
                                    ],
                                    x: [0, 3, 0, -3, 0]
                                }}
                                transition={{
                                    duration: 0.15,
                                    repeat: 3,
                                    ease: 'linear',
                                    delay: 0.05
                                }}
                                style={{
                                    color: '#00ffff',
                                    mixBlendMode: 'screen'
                                }}
                            >
                                404
                            </motion.span>
                            <span className="relative">404</span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Glitch404Effect;

