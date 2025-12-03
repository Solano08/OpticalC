import { type FC, useState, Suspense, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';
import SceneTransition from '../components/ui/SceneTransition';

interface InfoBlock {
    id: number;
    title: string;
    phrases: string[];
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const Scene5: FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [splineApp, setSplineApp] = useState<Application | null>(null);
    
    // Cachear referencias a objetos Spline para evitar búsquedas repetitivas
    const splineObjectsRef = useRef<{
        textObject?: { text?: string; visible?: boolean };
        rocket?: { visible?: boolean; animation?: { play: () => void; stop: () => void } };
        bigSphere?: { visible?: boolean };
    }>({});

    // Memoizar infoBlocks para evitar recreación
    const infoBlocks: InfoBlock[] = useMemo(() => [
        {
            id: 1,
            title: "Chips Fotónicos",
            phrases: [
                "Procesamiento a velocidad de la luz",
                "IA avanzada integrada directamente en hardware",
                "Smartphones con IA instantánea",
                "Centros de datos ecológicos y ultrarrápidos",
                "Computación óptica accesible para todos"
            ],
            position: 'top-left'
        },
        {
            id: 2,
            title: "Tecnologías Nunca Antes Posibles gracias a la Luz",
            phrases: [
                "Hibridación Cuántica + Óptica",
                "Procesamiento biológico y molecular con fotones",
                "Simulación 3D en tiempo real",
                "Sensores médicos ópticos instantáneos",
                "IA inspirada en el cerebro pero fotónica"
            ],
            position: 'top-right'
        },
        {
            id: 3,
            title: "La Luz Revolución Tecnológica del Siglo XXI",
            phrases: [
                "Nuevos paradigmas basados en fotones",
                "Transformación de la industria tecnológica",
                "Avances científicos impulsados por simulaciones ópticas",
                "IA superpotenciada por redes fotónicas",
                "El futuro tecnológico se construye con luz"
            ],
            position: 'bottom-left'
        },
        {
            id: 4,
            title: "Cerebros Fotónicos y Universos Simulados con Luz",
            phrases: [
                "Redes neuronales hechas con fotones",
                "Procesos cognitivos instantáneos",
                "IA con razonamiento casi humano",
                "Simulaciones de mundos completos",
                "Exploración matemática de futuros posibles"
            ],
            position: 'bottom-right'
        }
    ], []);

    // Cachear objetos Spline una sola vez al cargar
    const cacheSplineObjects = useCallback((app: Application) => {
        if (!app) return;
        
        try {
            // Buscar y cachear objetos una sola vez
            const textNames = ['Text', 'SPACE', 'Space', 'text', 'Title', 'FUTURE'];
            for (const name of textNames) {
                try {
                    const obj = app.findObjectByName(name) as { text?: string; visible?: boolean } | null;
                    if (obj && obj.text !== undefined) {
                        splineObjectsRef.current.textObject = obj;
                        // Cambiar SPACE a FUTURE si es necesario
                        if (obj.text === 'SPACE' || obj.text === 'Space' || obj.text.trim() === 'SPACE') {
                            obj.text = 'FUTURE';
                        }
                        break; // Encontrado, salir del loop
                    }
                } catch {
                    continue;
                }
            }
            
            // Buscar cohete
            const rocketNames = ['Rocket', 'rocket', 'RocketShip', 'Rocket Ship', 'Cohete'];
            for (const name of rocketNames) {
                try {
                    const obj = app.findObjectByName(name) as { visible?: boolean; animation?: { play: () => void; stop: () => void } } | null;
                    if (obj) {
                        splineObjectsRef.current.rocket = obj;
                        break;
                    }
                } catch {
                    continue;
                }
            }
            
            // Buscar esfera grande
            const sphereNames = ['Sphere', 'sphere', 'Planet', 'planet', 'Earth', 'earth', 'Big Sphere', 'BigSphere'];
            for (const name of sphereNames) {
                try {
                    const obj = app.findObjectByName(name) as { visible?: boolean } | null;
                    if (obj && obj.visible !== undefined) {
                        // Verificar que no sea la esfera central
                        const nameLower = name.toLowerCase();
                        if (!nameLower.includes('small') && !nameLower.includes('center') && !nameLower.includes('central')) {
                            splineObjectsRef.current.bigSphere = obj;
                            break;
                        }
                    }
                } catch {
                    continue;
                }
            }
        } catch (error) {
            console.log('Error cacheando objetos Spline:', error);
        }
    }, []);

    // Manejar la carga de Spline - optimizado
    const handleSplineLoad = useCallback((app: Application) => {
        setSplineApp(app);
        cacheSplineObjects(app);
    }, [cacheSplineObjects]);

    // Manejar hover sobre la esfera central - optimizado usando cache
    const handleSphereHover = useCallback((isHovering: boolean) => {
        setIsHovered(isHovering);

        // Usar objetos cacheados en lugar de buscar cada vez
        const { textObject, rocket, bigSphere } = splineObjectsRef.current;

        // Actualizar cohete
        if (rocket) {
            if (rocket.visible !== undefined) {
                rocket.visible = isHovering;
            }
            if (rocket.animation) {
                if (isHovering) {
                    rocket.animation.play();
                } else {
                    rocket.animation.stop();
                }
            }
        }

        // Actualizar esfera grande
        if (bigSphere && bigSphere.visible !== undefined) {
            bigSphere.visible = isHovering;
        }

        // Actualizar texto FUTURE
        if (textObject && textObject.visible !== undefined) {
            textObject.visible = !isHovering;
        }
    }, []);

    // Manejar cuando el mouse entra/sale de la sección completa - optimizado
    const handleSectionMouseLeave = useCallback(() => {
        setIsHovered(false);
        handleSphereHover(false);
    }, [handleSphereHover]);

    // Escuchar eventos de hover de Spline - solo sobre la esfera central
    useEffect(() => {
        if (!splineApp) return;

        let isHoveringSphere = false;

        const handleMouseHover = (e: { target?: { name?: string } }) => {
            if (!e.target || !e.target.name) {
                // Si no hay target pero el mouse está en la sección, mantener bloques visibles
                // pero ocultar cohete y esfera grande
                if (isHoveringSphere) {
                    isHoveringSphere = false;
                    handleSphereHover(false);
                }
                return;
            }
            
            const nameLower = e.target.name.toLowerCase();
            
            // Detectar específicamente la esfera central (pequeña, no la grande)
            // Buscar nombres que indiquen la esfera central
            const isCentralSphere = (
                (nameLower.includes('sphere') && (nameLower.includes('center') || nameLower.includes('central') || nameLower.includes('small'))) ||
                (nameLower.includes('planet') && (nameLower.includes('center') || nameLower.includes('central') || nameLower.includes('small'))) ||
                // Si solo dice "sphere" o "planet" sin "big" o "large", asumimos que es la central
                ((nameLower === 'sphere' || nameLower === 'planet' || nameLower === 'earth') && 
                 !nameLower.includes('big') && !nameLower.includes('large') && !nameLower.includes('main'))
            );
            
            if (isCentralSphere) {
                if (!isHoveringSphere) {
                    isHoveringSphere = true;
                    handleSphereHover(true);
                }
            } else {
                // Si el hover es sobre otro objeto (no la esfera central), volver al estado inicial
                if (isHoveringSphere) {
                    isHoveringSphere = false;
                    handleSphereHover(false);
                    // Ocultar bloques cuando el mouse sale de la esfera
                    setIsHovered(false);
                }
            }
        };

        splineApp.addEventListener('mouseHover', handleMouseHover);

        return () => {
            splineApp.removeEventListener('mouseHover', handleMouseHover);
        };
    }, [splineApp, handleSphereHover]);

    return (
        <section 
            className="relative w-full flex items-center justify-center overflow-hidden bg-black"
            onMouseLeave={handleSectionMouseLeave}
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
                toColor="#000000" 
                position="top" 
                intensity="medium" 
            />

            {/* Spline Scene Container - tamaño completamente fijo */}
            <div 
                className="relative w-full"
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
                        scene="https://prod.spline.design/VkrWVC5OI4Q9Esv6/scene.splinecode"
                        onLoad={handleSplineLoad}
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
            </div>

            {/* Bloques de información - aparecen al hacer hover sobre la esfera */}
            <AnimatePresence>
                {isHovered && (
                    <div 
                        className="absolute inset-0 z-30 pointer-events-none"
                        style={{
                            width: '100vw',
                            height: '100vh',
                            minHeight: '100vh',
                            maxHeight: '100vh',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                    >
                        {/* Floating particles - reducido de 18 a 8 para mejor rendimiento */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(8)].map((_, i) => {
                                // Generar posiciones y movimientos determinísticos usando golden angle
                                const goldenAngle = 137.508;
                                const angle = (i * goldenAngle) % 360;
                                const angleRad = (angle * Math.PI) / 180;
                                
                                // Posición inicial distribuida uniformemente con más variación
                                const radius = 20 + (i % 4) * 15;
                                const startX = 50 + Math.cos(angleRad) * radius;
                                const startY = 50 + Math.sin(angleRad) * radius;
                                
                                // Movimiento suave y circular con más variación
                                const moveRadius = 10 + (i % 5) * 3;
                                
                                // Variar tamaños de partículas
                                const particleSize = 1.5 + (i % 3) * 0.5;
                                
                                return (
                                    <motion.div
                                        key={`particle-${i}`}
                                        className="absolute rounded-full"
                                        style={{
                                            width: `${particleSize}px`,
                                            height: `${particleSize}px`,
                                            left: `${startX}%`,
                                            top: `${startY}%`,
                                            transform: 'translateZ(0)',
                                            background: 'rgba(255, 255, 255, 0.6)',
                                            boxShadow: '0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(59, 130, 246, 0.6)',
                                        }}
                                        initial={{ 
                                            opacity: 0,
                                            scale: 0
                                        }}
                                        animate={{
                                            opacity: [0.3, 0.6, 0.3],
                                            scale: [0.8, 1, 0.8],
                                            x: [
                                                0,
                                                Math.cos(angleRad + Math.PI / 4) * moveRadius,
                                                Math.cos(angleRad + Math.PI / 2) * moveRadius * 0.6,
                                                0
                                            ],
                                            y: [
                                                0,
                                                Math.sin(angleRad + Math.PI / 4) * moveRadius,
                                                Math.sin(angleRad + Math.PI / 2) * moveRadius * 0.6,
                                                0
                                            ],
                                        }}
                                        transition={{
                                            duration: 10 + (i % 3) * 2,
                                            repeat: Infinity,
                                            delay: i * 0.4,
                                            ease: [0.25, 0.1, 0.25, 1]
                                        }}
                                    />
                                );
                            })}
                        </div>

                        <div 
                            className="w-full h-full flex flex-col items-center justify-center gap-6 md:gap-8 p-6 md:p-8 lg:p-10"
                            style={{
                                width: '100vw',
                                height: '100vh',
                                position: 'relative'
                            }}
                        >
                            {/* Fila superior - 2 bloques */}
                            <div className="flex flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 w-full px-4 md:px-8">
                                {infoBlocks.slice(0, 2).map((block, index) => (
                                    <motion.div
                                        key={block.id}
                                        initial={{ 
                                            opacity: 0,
                                            scale: 0.3,
                                            y: -50
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: 0
                                        }}
                                        exit={{ 
                                            opacity: 0,
                                            scale: 0.3,
                                            y: -50
                                        }}
                                        transition={{ 
                                            duration: 0.8,
                                            delay: index * 0.15,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                        className="pointer-events-auto flex-1"
                                        style={{
                                            maxWidth: '400px',
                                            minWidth: '280px'
                                        }}
                                    >
                                        <motion.div
                                            className="relative w-full h-full group/card"
                                            whileHover={{ scale: 1.03 }}
                                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                        >
                                            {/* Enhanced Liquid Glass Card */}
                                            <motion.div
                                                className="relative w-full h-full rounded-3xl overflow-hidden"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.08) 100%)',
                                                    backdropFilter: 'blur(16px) saturate(150%)',
                                                    WebkitBackdropFilter: 'blur(16px) saturate(150%)',
                                                    border: '1px solid rgba(255, 255, 255, 0.25)',
                                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
                                                    transform: 'translateZ(0)',
                                                }}
                                                whileHover={{
                                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.12) 100%)',
                                                    border: '1px solid rgba(255, 255, 255, 0.35)',
                                                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.15), 0 0 40px rgba(59, 130, 246, 0.15)',
                                                }}
                                                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                            >
                                                {/* Gradient overlay with color variation */}
                                                <div 
                                                    className="absolute inset-0 opacity-30 pointer-events-none"
                                                    style={{
                                                        background: index === 0 
                                                            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.1) 100%)'
                                                            : index === 1
                                                            ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)'
                                                            : index === 2
                                                            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)'
                                                            : 'linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)'
                                                    }}
                                                />

                                                {/* Noise texture for realism */}
                                                <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

                                                {/* Animated specular highlight */}
                                                <motion.div
                                                    className="absolute inset-0 pointer-events-none"
                                                    initial={{ opacity: 0.3 }}
                                                    animate={{ 
                                                        opacity: [0.3, 0.5, 0.3],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                                                </motion.div>

                                                {/* Floating particles - reducido de 4 a 2 por tarjeta */}
                                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                                    {[...Array(2)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="absolute w-1 h-1 bg-white/30 rounded-full"
                                                            style={{
                                                                left: `${15 + (i * 20)}%`,
                                                                top: `${20 + (i % 2) * 50}%`,
                                                                transform: 'translateZ(0)',
                                                            }}
                                                            animate={{
                                                                y: [0, -20, 0],
                                                                opacity: [0.2, 0.5, 0.2],
                                                                scale: [0.8, 1.2, 0.8],
                                                            }}
                                                            transition={{
                                                                duration: 3 + i * 0.5,
                                                                repeat: Infinity,
                                                                delay: i * 0.4,
                                                                ease: "easeInOut"
                                                            }}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Shine effect on hover */}
                                                <motion.div
                                                    initial={{ x: '-100%', opacity: 0 }}
                                                    whileHover={{ x: '100%', opacity: 1 }}
                                                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                                                    style={{
                                                        transform: 'skewX(-20deg)',
                                                    }}
                                                />

                                                {/* Content */}
                                                <div className="relative z-10 p-5 md:p-6 h-full">
                                                    <h3 
                                                        className="text-lg md:text-xl font-bold mb-4 leading-tight text-white relative"
                                                        style={{
                                                            textShadow: '0 2px 20px rgba(0, 0, 0, 0.6), 0 0 10px rgba(59, 130, 246, 0.3)'
                                                        }}
                                                    >
                                                        {block.title}
                                                    </h3>
                                                    
                                                    <ul className="space-y-2.5 md:space-y-3">
                                                        {block.phrases.map((phrase, idx) => (
                                                            <motion.li
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ 
                                                                    delay: 0.6 + index * 0.15 + idx * 0.1,
                                                                    duration: 0.5,
                                                                    ease: [0.16, 1, 0.3, 1]
                                                                }}
                                                                className="flex items-start gap-3 group/item"
                                                            >
                                                                {/* Enhanced Bullet point */}
                                                                <motion.div 
                                                                    className="shrink-0 mt-1.5 relative"
                                                                    whileHover={{ scale: 1.3 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <div 
                                                                        className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"
                                                                        style={{
                                                                            boxShadow: '0 0 12px rgba(59, 130, 246, 0.9), 0 0 24px rgba(59, 130, 246, 0.5)'
                                                                        }}
                                                                    />
                                                                    <motion.div
                                                                        className="absolute inset-0 rounded-full bg-cyan-400"
                                                                        animate={{
                                                                            scale: [1, 1.5, 1],
                                                                            opacity: [0.6, 0, 0.6],
                                                                        }}
                                                                        transition={{
                                                                            duration: 2,
                                                                            repeat: Infinity,
                                                                            delay: idx * 0.3,
                                                                            ease: "easeOut"
                                                                        }}
                                                                    />
                                                                </motion.div>
                                                                
                                                                <span 
                                                                    className="flex-1 text-sm md:text-base leading-relaxed text-white/95 group-hover/item:text-white transition-colors duration-200"
                                                                    style={{
                                                                        fontWeight: 400,
                                                                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                                                                    }}
                                                                >
                                                                    {phrase}
                                                                </span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            {/* Fila inferior - 2 bloques */}
                            <div className="flex flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 w-full px-4 md:px-8">
                                {infoBlocks.slice(2, 4).map((block, index) => (
                                    <motion.div
                                        key={block.id}
                                        initial={{ 
                                            opacity: 0,
                                            scale: 0.3,
                                            y: 50
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: 0
                                        }}
                                        exit={{ 
                                            opacity: 0,
                                            scale: 0.3,
                                            y: 50
                                        }}
                                        transition={{ 
                                            duration: 0.8,
                                            delay: (index + 2) * 0.15,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                        className="pointer-events-auto flex-1"
                                        style={{
                                            maxWidth: '400px',
                                            minWidth: '280px'
                                        }}
                                    >
                                        <motion.div
                                            className="relative w-full h-full group/card"
                                            whileHover={{ scale: 1.03 }}
                                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                        >
                                            {/* Enhanced Liquid Glass Card */}
                                            <motion.div
                                                className="relative w-full h-full rounded-3xl overflow-hidden"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.08) 100%)',
                                                    backdropFilter: 'blur(16px) saturate(150%)',
                                                    WebkitBackdropFilter: 'blur(16px) saturate(150%)',
                                                    border: '1px solid rgba(255, 255, 255, 0.25)',
                                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
                                                    transform: 'translateZ(0)',
                                                }}
                                                whileHover={{
                                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.12) 100%)',
                                                    border: '1px solid rgba(255, 255, 255, 0.35)',
                                                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.15), 0 0 40px rgba(59, 130, 246, 0.15)',
                                                }}
                                                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                            >
                                                {/* Gradient overlay with color variation */}
                                                <div 
                                                    className="absolute inset-0 opacity-30 pointer-events-none"
                                                    style={{
                                                        background: (index + 2) === 2 
                                                            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.1) 100%)'
                                                            : (index + 2) === 3
                                                            ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)'
                                                            : (index + 2) === 4
                                                            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)'
                                                            : 'linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)'
                                                    }}
                                                />

                                                {/* Noise texture for realism */}
                                                <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

                                                {/* Animated specular highlight */}
                                                <motion.div
                                                    className="absolute inset-0 pointer-events-none"
                                                    initial={{ opacity: 0.3 }}
                                                    animate={{ 
                                                        opacity: [0.3, 0.5, 0.3],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                                                </motion.div>

                                                {/* Floating particles - reducido de 4 a 2 por tarjeta */}
                                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                                    {[...Array(2)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="absolute w-1 h-1 bg-white/30 rounded-full"
                                                            style={{
                                                                left: `${15 + (i * 20)}%`,
                                                                top: `${20 + (i % 2) * 50}%`,
                                                                transform: 'translateZ(0)',
                                                            }}
                                                            animate={{
                                                                y: [0, -20, 0],
                                                                opacity: [0.2, 0.5, 0.2],
                                                                scale: [0.8, 1.2, 0.8],
                                                            }}
                                                            transition={{
                                                                duration: 3 + i * 0.5,
                                                                repeat: Infinity,
                                                                delay: i * 0.4,
                                                                ease: "easeInOut"
                                                            }}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Shine effect on hover */}
                                                <motion.div
                                                    initial={{ x: '-100%', opacity: 0 }}
                                                    whileHover={{ x: '100%', opacity: 1 }}
                                                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                                                    style={{
                                                        transform: 'skewX(-20deg)',
                                                    }}
                                                />

                                                {/* Content */}
                                                <div className="relative z-10 p-5 md:p-6 h-full">
                                                    <h3 
                                                        className="text-lg md:text-xl font-bold mb-4 leading-tight text-white relative"
                                                        style={{
                                                            textShadow: '0 2px 20px rgba(0, 0, 0, 0.6), 0 0 10px rgba(59, 130, 246, 0.3)'
                                                        }}
                                                    >
                                                        {block.title}
                                                    </h3>
                                                    
                                                    <ul className="space-y-2.5 md:space-y-3">
                                                        {block.phrases.map((phrase, idx) => (
                                                            <motion.li
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ 
                                                                    delay: 0.6 + (index + 2) * 0.15 + idx * 0.1,
                                                                    duration: 0.5,
                                                                    ease: [0.16, 1, 0.3, 1]
                                                                }}
                                                                className="flex items-start gap-3 group/item"
                                                            >
                                                                {/* Enhanced Bullet point */}
                                                                <motion.div 
                                                                    className="shrink-0 mt-1.5 relative"
                                                                    whileHover={{ scale: 1.3 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <div 
                                                                        className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"
                                                                        style={{
                                                                            boxShadow: '0 0 12px rgba(59, 130, 246, 0.9), 0 0 24px rgba(59, 130, 246, 0.5)'
                                                                        }}
                                                                    />
                                                                    <motion.div
                                                                        className="absolute inset-0 rounded-full bg-cyan-400"
                                                                        animate={{
                                                                            scale: [1, 1.5, 1],
                                                                            opacity: [0.6, 0, 0.6],
                                                                        }}
                                                                        transition={{
                                                                            duration: 2,
                                                                            repeat: Infinity,
                                                                            delay: idx * 0.3,
                                                                            ease: "easeOut"
                                                                        }}
                                                                    />
                                                                </motion.div>
                                                                
                                                                <span 
                                                                    className="flex-1 text-sm md:text-base leading-relaxed text-white/95 group-hover/item:text-white transition-colors duration-200"
                                                                    style={{
                                                                        fontWeight: 400,
                                                                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                                                                    }}
                                                                >
                                                                    {phrase}
                                                                </span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Scene5;
