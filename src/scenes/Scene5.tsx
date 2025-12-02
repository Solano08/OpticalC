import { type FC, useState, Suspense, useEffect, useCallback } from 'react';
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

    const infoBlocks: InfoBlock[] = [
        {
            id: 1,
            title: "Chips Fotónicos Comerciales",
            phrases: [
                "Integración en inteligencia artificial avanzada",
                "Aplicación en vehículos autónomos",
                "Incorporación en dispositivos móviles",
                "Uso en centros de datos optimizados"
            ],
            position: 'top-left'
        },
        {
            id: 2,
            title: "Velocidad y Eficiencia",
            phrases: [
                "Cálculos complejos a la velocidad de la luz",
                "Consumo energético significativamente menor",
                "Revolución en la eficiencia energética",
                "Nuevos niveles de velocidad y capacidad"
            ],
            position: 'top-right'
        },
        {
            id: 3,
            title: "Nuevas Aplicaciones",
            phrases: [
                "Computación cuántica híbrida",
                "Procesamiento de datos en tiempo real",
                "Sistemas de comunicación avanzados",
                "Tecnologías emergentes"
            ],
            position: 'bottom-left'
        },
        {
            id: 4,
            title: "Impacto Tecnológico",
            phrases: [
                "Transformación de la industria",
                "Nuevos paradigmas computacionales",
                "Avances en investigación científica",
                "Futuro de la tecnología"
            ],
            position: 'bottom-right'
        }
    ];

    // Manejar la carga de Spline y cambiar "SPACE" a "FUTURE"
    const handleSplineLoad = (app: Application) => {
        setSplineApp(app);
        
        // Función para cambiar el texto "SPACE" a "FUTURE"
        const changeTextToFuture = () => {
            if (!app) return;

            // Método 1: Buscar por nombre común
            const textNames = ['Text', 'SPACE', 'Space', 'text', 'Title', 'FUTURE'];
            
            textNames.forEach(name => {
                try {
                    const textObject = app.findObjectByName(name) as { text?: string } | null;
                    if (textObject && textObject.text !== undefined) {
                        // Cambiar cualquier variante de SPACE a FUTURE
                        if (textObject.text === 'SPACE' || textObject.text === 'Space' || textObject.text === 'SPACE ' || textObject.text.trim() === 'SPACE') {
                            textObject.text = 'FUTURE';
                        }
                    }
                } catch {
                    // Objeto no encontrado
                }
            });

            // Método 2: Buscar todos los objetos y encontrar el de tipo texto
            try {
                const allObjects = app.getAllObjects();
                allObjects.forEach((obj) => {
                    const objWithText = obj as { text?: string; name?: string };
                    // Buscar objetos que tengan propiedad text
                    if (objWithText.text !== undefined) {
                        const textValue = objWithText.text.trim();
                        if (textValue === 'SPACE' || textValue === 'Space' || textValue === 'SPACE ') {
                            objWithText.text = 'FUTURE';
                        }
                    }
                    // También buscar por nombre
                    if (objWithText.name && (objWithText.name.includes('Text') || objWithText.name.includes('SPACE') || objWithText.name.includes('Space'))) {
                        if (objWithText.text !== undefined) {
                            const textValue = objWithText.text.trim();
                            if (textValue === 'SPACE' || textValue === 'Space' || textValue === 'SPACE ') {
                                objWithText.text = 'FUTURE';
                            }
                        }
                    }
                });
            } catch (error) {
                console.log('Error buscando objetos:', error);
            }
        };

        // Intentar cambiar el texto múltiples veces para asegurar que se encuentre
        changeTextToFuture();
        setTimeout(changeTextToFuture, 300);
        setTimeout(changeTextToFuture, 600);
        setTimeout(changeTextToFuture, 1000);
        setTimeout(changeTextToFuture, 2000);
    };

    // Manejar hover sobre la esfera central - activa cohete y esfera grande
    const handleSphereHover = useCallback((isHovering: boolean) => {
        if (!splineApp) return;

        // Si hay hover sobre la esfera, activar cohete y esfera grande, y mostrar bloques
        if (isHovering) {
            setIsHovered(true);
        } else {
            // Si no hay hover, ocultar bloques
            setIsHovered(false);
        }

        // Activar/desactivar animación del cohete y esfera grande
        const handleRocketAndSphere = () => {
            // Buscar el cohete por diferentes nombres posibles
            const rocketNames = ['Rocket', 'rocket', 'RocketShip', 'Rocket Ship', 'Cohete'];
            
            rocketNames.forEach(name => {
                try {
                    const rocket = splineApp.findObjectByName(name) as { visible?: boolean; animation?: { play: () => void; stop: () => void } } | null;
                    if (rocket) {
                        if (rocket.visible !== undefined) {
                            rocket.visible = isHovering;
                        }
                        // Activar animación si existe
                        if (rocket.animation) {
                            if (isHovering) {
                                rocket.animation.play();
                            } else {
                                rocket.animation.stop();
                            }
                        }
                    }
                } catch {
                    // Objeto no encontrado
                }
            });

            // Buscar la esfera grande (la que aparece con el cohete)
            const sphereNames = ['Sphere', 'sphere', 'Planet', 'planet', 'Earth', 'earth', 'Big Sphere', 'BigSphere'];
            
            sphereNames.forEach(name => {
                try {
                    const sphere = splineApp.findObjectByName(name) as { visible?: boolean } | null;
                    if (sphere && sphere.visible !== undefined) {
                        sphere.visible = isHovering;
                    }
                } catch {
                    // Objeto no encontrado
                }
            });

            // También buscar en todos los objetos
            try {
                const allObjects = splineApp.getAllObjects();
                allObjects.forEach((obj) => {
                    const objWithName = obj as { name?: string; visible?: boolean; animation?: { play: () => void; stop: () => void } };
                    const nameLower = objWithName.name?.toLowerCase() || '';
                    
                    // Buscar cohetes
                    if (nameLower.includes('rocket')) {
                        if (objWithName.visible !== undefined) {
                            objWithName.visible = isHovering;
                        }
                        if (objWithName.animation) {
                            if (isHovering) {
                                objWithName.animation.play();
                            } else {
                                objWithName.animation.stop();
                            }
                        }
                    }
                    
                    // Buscar esfera grande (excluir la esfera pequeña central)
                    if ((nameLower.includes('sphere') || nameLower.includes('planet') || nameLower.includes('earth')) 
                        && !nameLower.includes('small') && !nameLower.includes('center') && !nameLower.includes('central')) {
                        if (objWithName.visible !== undefined) {
                            objWithName.visible = isHovering;
                        }
                    }
                });
            } catch (error) {
                console.log('Error buscando objetos:', error);
            }
        };

        handleRocketAndSphere();

        // Ocultar/mostrar texto "FUTURE" cuando hay hover
        // El texto debe estar visible cuando NO hay hover (estado inicial)
        const handleText = () => {
            const textNames = ['Text', 'FUTURE', 'Future', 'text', 'Title'];
            
            textNames.forEach(name => {
                try {
                    const textObject = splineApp.findObjectByName(name) as { visible?: boolean; text?: string } | null;
                    if (textObject) {
                        if (textObject.visible !== undefined) {
                            // Mostrar texto cuando NO hay hover (estado inicial)
                            textObject.visible = !isHovering;
                        }
                    }
                } catch {
                    // Objeto no encontrado
                }
            });

            // Buscar en todos los objetos
            try {
                const allObjects = splineApp.getAllObjects();
                allObjects.forEach((obj) => {
                    const objWithText = obj as { text?: string; name?: string; visible?: boolean };
                    if (objWithText.text !== undefined || (objWithText.name && (objWithText.name.includes('Text') || objWithText.name.includes('FUTURE')))) {
                        if (objWithText.visible !== undefined) {
                            // Mostrar texto cuando NO hay hover (estado inicial)
                            objWithText.visible = !isHovering;
                        }
                    }
                });
            } catch (error) {
                console.log('Error manejando texto:', error);
            }
        };

        handleText();
    }, [splineApp]);

    // Manejar cuando el mouse entra/sale de la sección completa
    const handleSectionMouseLeave = useCallback(() => {
        // Volver al estado inicial cuando el mouse sale de la sección
        setIsHovered(false);
        
        if (splineApp) {
            // Buscar y ocultar cohete
            const rocketNames = ['Rocket', 'rocket', 'RocketShip', 'Rocket Ship', 'Cohete'];
            rocketNames.forEach(name => {
                try {
                    const rocket = splineApp.findObjectByName(name) as { visible?: boolean; animation?: { stop: () => void } } | null;
                    if (rocket) {
                        if (rocket.visible !== undefined) {
                            rocket.visible = false;
                        }
                        if (rocket.animation) {
                            rocket.animation.stop();
                        }
                    }
                } catch {
                    // Objeto no encontrado
                }
            });
            
            // Buscar y ocultar esfera grande
            const sphereNames = ['Sphere', 'sphere', 'Planet', 'planet', 'Earth', 'earth', 'Big Sphere', 'BigSphere'];
            sphereNames.forEach(name => {
                try {
                    const sphere = splineApp.findObjectByName(name) as { visible?: boolean } | null;
                    if (sphere && sphere.visible !== undefined) {
                        sphere.visible = false;
                    }
                } catch {
                    // Objeto no encontrado
                }
            });
            
            // Mostrar texto "FUTURE" (volver al estado inicial)
            const textNames = ['Text', 'FUTURE', 'Future', 'text', 'Title'];
            textNames.forEach(name => {
                try {
                    const textObject = splineApp.findObjectByName(name) as { visible?: boolean; text?: string } | null;
                    if (textObject && textObject.visible !== undefined) {
                        textObject.visible = true;
                    }
                } catch {
                    // Objeto no encontrado
                }
            });
            
            // Buscar en todos los objetos para mostrar texto FUTURE
            try {
                const allObjects = splineApp.getAllObjects();
                allObjects.forEach((obj) => {
                    const objWithText = obj as { text?: string; name?: string; visible?: boolean };
                    if (objWithText.text !== undefined || (objWithText.name && (objWithText.name.includes('Text') || objWithText.name.includes('FUTURE')))) {
                        if (objWithText.visible !== undefined) {
                            objWithText.visible = true;
                        }
                    }
                });
            } catch (error) {
                console.log('Error mostrando texto:', error);
            }
        }
    }, [splineApp]);

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
                                            className="relative w-full h-full"
                                            whileHover={{ scale: 1.03 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="liquid-glass p-5 md:p-6 relative overflow-visible h-full">
                                                {/* Contenido */}
                                                <div className="relative z-10">
                                                    <h3 
                                                        className="text-lg md:text-xl font-bold mb-4 leading-tight text-white"
                                                        style={{
                                                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
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
                                                                className="flex items-start gap-3 group"
                                                            >
                                                                {/* Bullet point */}
                                                                <div className="shrink-0 mt-1.5">
                                                                    <div 
                                                                        className="w-2 h-2 rounded-full bg-cyan-400"
                                                                        style={{
                                                                            boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)'
                                                                        }}
                                                                    />
                                                                </div>
                                                                
                                                                <span 
                                                                    className="flex-1 text-sm md:text-base leading-relaxed text-white/90"
                                                                    style={{
                                                                        fontWeight: 400
                                                                    }}
                                                                >
                                                                    {phrase}
                                                                </span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
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
                                            className="relative w-full h-full"
                                            whileHover={{ scale: 1.03 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="liquid-glass p-5 md:p-6 relative overflow-visible h-full">
                                                {/* Contenido */}
                                                <div className="relative z-10">
                                                    <h3 
                                                        className="text-lg md:text-xl font-bold mb-4 leading-tight text-white"
                                                        style={{
                                                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
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
                                                                className="flex items-start gap-3 group"
                                                            >
                                                                {/* Bullet point */}
                                                                <div className="shrink-0 mt-1.5">
                                                                    <div 
                                                                        className="w-2 h-2 rounded-full bg-cyan-400"
                                                                        style={{
                                                                            boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)'
                                                                        }}
                                                                    />
                                                                </div>
                                                                
                                                                <span 
                                                                    className="flex-1 text-sm md:text-base leading-relaxed text-white/90"
                                                                    style={{
                                                                        fontWeight: 400
                                                                    }}
                                                                >
                                                                    {phrase}
                                                                </span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
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
