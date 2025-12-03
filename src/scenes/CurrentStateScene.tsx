import { type FC, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SceneTransition from '../components/ui/SceneTransition';
import actualidadVideo from '../assets/video/actualidad.mp4';
import OrangeParticleBackground from '../components/ui/OrangeParticleBackground';

interface CurrentStateItem {
    id: number;
    title: string;
    phrase: string;
    content: string;
    color: string;
}

// Helper function for deterministic random number generation
const rng = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const CurrentStateScene: FC = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Pre-calculate particles data for the title - Reducido de 8 a 4 para mejor rendimiento
    const titleParticlesData = useMemo(() => {
        return Array.from({ length: 4 }, (_, i) => {
            const seed = 1000 + i;
            return {
                id: `title-particle-${i}`,
                left: 10 + rng(seed) * 80, // 10% to 90% of text width
                top: 10 + rng(seed * 2) * 80, // 10% to 90% of text height
                size: 1 + rng(seed * 3) * 2, // 1px to 3px
                duration: 3 + rng(seed * 4) * 3, // 3s to 6s
                delay: rng(seed * 5) * 2, // 0s to 2s
                xOffset: (rng(seed * 6) - 0.5) * 40, // -20px to 20px
                yOffset: (rng(seed * 7) - 0.5) * 40, // -20px to 20px
            };
        });
    }, []);

    const items: CurrentStateItem[] = [
        {
            id: 1,
            title: "Prototipos de Chips Ópticos",
            phrase: "En 2025, existen prototipos de chips ópticos que aceleran el procesamiento de inteligencia artificial con un consumo energético muy bajo",
            content: "En 2025, la computación óptica está en una etapa avanzada de investigación y desarrollo, con numerosos prototipos y avances significativos. Empresas como Lightmatter han presentado chips ópticos capaces de acelerar tareas de IA con un consumo energético mucho más bajo que los chips convencionales. Estos prototipos representan un paso importante hacia la integración de tecnologías fotónicas en aplicaciones comerciales.",
            color: "from-blue-500/20 to-cyan-500/20",
        },
        {
            id: 2,
            title: "Operaciones Tensoriales",
            phrase: "Se han desarrollado técnicas para realizar cálculos complejos en un solo pulso de luz, optimizando operaciones tensoriales",
            content: "La universidad de Aalto ha desarrollado una técnica que permite realizar operaciones tensoriales para inteligencia artificial en un solo pulso de luz, acelerando procesamientos que normalmente consumirían mucho tiempo y energía en procesadores electrónicos tradicionales. Este avance permite optimizar significativamente las operaciones matemáticas fundamentales para el aprendizaje automático.",
            color: "from-purple-500/20 to-pink-500/20",
        },
        {
            id: 3,
            title: "Aplicaciones en Desarrollo",
            phrase: "La computación óptica está siendo explorada para uso en centros de datos, análisis de imágenes y procesamiento de lenguaje natural",
            content: "Hay avances en memorias ópticas temporales y switches ópticos para centros de datos que permiten la interconexión eficiente y la reducción del consumo energético en redes de alta demanda. Aunque todavía mayormente en investigación, se prevé su incorporación en productos comerciales en los próximos años. Se estima que en los próximos 3 a 5 años podría incorporarse a grandes modelos de IA y sistemas reales.",
            color: "from-emerald-500/20 to-teal-500/20",
        }
    ];

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 py-24">
            {/* Elegant transitions - behind all content */}
            <SceneTransition variant="subtle-wave" fromColor="#FFF8E7" toColor="rgba(0,0,0,0.8)" position="top" intensity="medium" />
            <SceneTransition variant="subtle-wave" fromColor="rgba(0,0,0,0.8)" toColor="#000000" position="bottom" intensity="medium" />

            {/* Background Video */}
            <div className="absolute inset-0 overflow-hidden z-1">
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{
                        filter: hoveredId !== null ? 'grayscale(0%)' : 'grayscale(100%)',
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1]
                    }}
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ willChange: 'auto' }}
                        onLoadedMetadata={(e) => {
                            const video = e.currentTarget;
                            if (video) video.playbackRate = 0.5;
                        }}
                    >
                        <source src={actualidadVideo} type="video/mp4" />
                    </video>
                </motion.div>

                {/* Dark overlay for better text readability - reduces opacity on hover */}
                <motion.div
                    className="absolute inset-0 bg-black"
                    animate={{
                        opacity: hoveredId !== null ? 0.4 : 0.7,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1]
                    }}
                />

                {/* Orange particles above video, below content */}
                <OrangeParticleBackground />
            </div>

            {/* Main content - always above transitions */}
            <div className="relative z-10 max-w-7xl mx-auto w-full">
                {/* Title - always visible */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-20"
                >
                    {/* Title with particles and glow effect */}
                    <div className="relative inline-block mb-4">
                        <motion.h2
                            className="text-4xl md:text-6xl font-bold text-white relative z-10 select-none"
                            animate={{
                                textShadow: hoveredId !== null
                                    ? '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.4), 0 0 80px rgba(255,255,255,0.2)'
                                    : '0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2)',
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            style={{
                                fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            }}
                        >
                            Actualidad
                        </motion.h2>

                        {/* Particles inside the text - always visible */}
                        <div className="absolute inset-0 pointer-events-none overflow-visible">
                            {titleParticlesData.map((particle) => (
                                <motion.div
                                    key={particle.id}
                                    className="absolute rounded-full bg-white will-change-transform"
                                    style={{
                                        width: `${particle.size}px`,
                                        height: `${particle.size}px`,
                                        left: `${particle.left}%`,
                                        top: `${particle.top}%`,
                                    }}
                                    animate={{
                                        x: [0, particle.xOffset, 0],
                                        y: [0, particle.yOffset, 0],
                                        opacity: hoveredId !== null
                                            ? [0.7, 1, 0.7]
                                            : [0.3, 0.6, 0.3],
                                        scale: hoveredId !== null
                                            ? [0.9, 1.6, 0.9]
                                            : [0.8, 1.3, 0.8],
                                        boxShadow: hoveredId !== null
                                            ? '0 0 6px rgba(255, 255, 255, 1), 0 0 12px rgba(255, 255, 255, 0.8)'
                                            : '0 0 3px rgba(255, 255, 255, 0.6), 0 0 6px rgba(255, 255, 255, 0.4)',
                                    }}
                                    transition={{
                                        duration: particle.duration,
                                        repeat: Infinity,
                                        delay: particle.delay,
                                        ease: "easeInOut",
                                        opacity: {
                                            duration: 0.8,
                                            ease: [0.25, 0.1, 0.25, 1]
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
                        La computación óptica está en una etapa avanzada de investigación y desarrollo, con numerosos prototipos y avances significativos que prometen revolucionar la tecnología.
                    </p>
                </motion.div>

                {/* Cards container with liquid glass effect */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {items.map((item) => {
                        const isHovered = hoveredId === item.id;

                        return (
                            <motion.div
                                key={item.id}
                                className="relative group"
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Liquid Glass Card */}
                                <motion.div
                                    animate={{
                                        height: isHovered ? '520px' : '280px',
                                        scale: isHovered ? 1.02 : 1,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.25, 0.1, 0.25, 1] // Smooth easing
                                    }}
                                    className="relative w-full rounded-3xl overflow-hidden cursor-pointer will-change-[height,transform]"
                                    style={{
                                        background: isHovered
                                            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
                                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                                        backdropFilter: isHovered ? 'blur(16px)' : 'blur(12px)',
                                        WebkitBackdropFilter: isHovered ? 'blur(16px)' : 'blur(12px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        boxShadow: isHovered
                                            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.1)'
                                            : '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05)',
                                        transform: 'translateZ(0)', // Force GPU acceleration
                                    }}
                                >
                                    {/* Gradient overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30`} />

                                    {/* Noise texture for realism */}
                                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

                                    {/* Small floating particles - reducido de 3 a 2 por tarjeta */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 overflow-hidden pointer-events-none"
                                            >
                                                {[...Array(2)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute w-1.5 h-1.5 bg-white/40 rounded-full will-change-transform"
                                                        style={{
                                                            left: `${20 + (i * 25)}%`,
                                                            top: `${30 + (i % 2) * 40}%`,
                                                            transform: 'translateZ(0)', // Force GPU acceleration
                                                        }}
                                                        animate={{
                                                            y: [0, -30, 0],
                                                            opacity: [0.4, 0.8, 0.4],
                                                            scale: [0.8, 1.2, 0.8],
                                                        }}
                                                        transition={{
                                                            duration: 2 + i * 0.5,
                                                            repeat: Infinity,
                                                            delay: i * 0.3,
                                                            ease: "easeInOut"
                                                        }}
                                                    />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Content */}
                                    <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
                                        {/* Title and Phrase - Always visible */}
                                        <div className="mb-4">
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 drop-shadow-md">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-white/90 leading-relaxed">
                                                {item.phrase}
                                            </p>
                                        </div>

                                        {/* Expanded content - appears on hover */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{
                                                        duration: 0.4,
                                                        ease: 'easeOut',
                                                        opacity: { delay: 0.1 }
                                                    }}
                                                    className="overflow-hidden mt-4 flex-1 flex flex-col"
                                                >
                                                    <div className="w-full h-px bg-white/20 my-4" />
                                                    <motion.p
                                                        initial={{ y: 10 }}
                                                        animate={{ y: 0 }}
                                                        transition={{ delay: 0.2, duration: 0.3 }}
                                                        className="text-white/80 leading-relaxed text-sm md:text-base flex-1"
                                                    >
                                                        {item.content}
                                                    </motion.p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                    </div>

                                    {/* Shine effect on hover */}
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        animate={{ x: isHovered ? '100%' : '-100%' }}
                                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                                        style={{
                                            transform: 'skewX(-20deg)',
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CurrentStateScene;