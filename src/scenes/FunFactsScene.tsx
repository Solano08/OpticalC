import { type FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SceneTransition from '../components/ui/SceneTransition';

interface FunFact {
    id: number;
    title: string;
    fact: string;
    icon: string;
    color: string;
}

const FunFactsScene: FC = () => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const funFacts: FunFact[] = [
        {
            id: 1,
            title: "Velocidad de la Luz",
            fact: "La luz viaja a casi 300,000 km/s, mientras que los electrones avanzan mucho más lento en los circuitos eléctricos. La luz viaja tan rápido que la información puede procesarse en el tiempo que tarda un pulso láser en cruzar un chip especializado, permitiendo operaciones simultáneas en paralelo, conocidas como computación tensorial óptica.",
            icon: "⚡",
            color: "from-yellow-400/20 to-orange-400/20"
        },
        {
            id: 2,
            title: "Paralelismo Masivo",
            fact: "Un chip óptico puede realizar múltiples tareas en paralelo multiplicando las ondas de luz, logrando un paralelo masivo. La luz puede codificar múltiples datos en distintas longitudes de onda, imprimiendo un potencial paralelo imposible de conseguir con electrones en cobre tradicional.",
            icon: "💡",
            color: "from-green-400/20 to-emerald-400/20"
        },
        {
            id: 3,
            title: "Eficiencia Energética",
            fact: "Los chips ópticos actuales pueden reducir el consumo energético hasta un orden de magnitud respecto a CPUs tradicionales, clave para el crecimiento sostenible de centros de datos con alta demanda energética.",
            icon: "🌊",
            color: "from-blue-400/20 to-cyan-400/20"
        },
        {
            id: 4,
            title: "Interferencias Reducidas",
            fact: "Los sistemas ópticos reducen los problemas de interferencias electromagnéticas presentes en la electrónica convencional, permitiendo una transmisión más limpia y confiable de datos.",
            icon: "🔬",
            color: "from-purple-400/20 to-pink-400/20"
        },
        {
            id: 5,
            title: "Temperatura Ambiente",
            fact: "La computación óptica opera a temperatura ambiente, a diferencia de muchas tecnologías prometedoras que requieren refrigeración extrema. Aunque la computación cuántica sigue siendo un campo muy explorado, la óptica pura tiene la ventaja de operar a temperatura ambiente sin necesidad de refrigeración extrema.",
            icon: "🔗",
            color: "from-indigo-400/20 to-violet-400/20"
        },
        {
            id: 6,
            title: "Revolución Tecnológica",
            fact: "El avance en fotónica y metamateriales está haciendo posible resolver problemas matemáticos complejos usando luz. La computación óptica abre la puerta a la próxima revolución tecnológica, integrando inteligencia artificial y nuevas arquitecturas que cambian la forma en que guardamos y procesamos la información.",
            icon: "🚀",
            color: "from-red-400/20 to-rose-400/20"
        }
    ];

    const toggleFact = (id: number) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950">
            {/* Elegant transition from previous scene */}
            <SceneTransition variant="smooth-gradient" fromColor="rgba(15, 23, 42, 0.95)" toColor="rgba(30, 27, 75, 0.95)" position="top" intensity="medium" />

            {/* Animated background elements */}
            <div className="absolute inset-0 z-1 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() * 300 + 50,
                            height: Math.random() * 300 + 50,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: `radial-gradient(circle, rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.1) 0%, transparent 70%)`,
                        }}
                        animate={{
                            x: [0, Math.random() * 100 - 50, 0],
                            y: [0, Math.random() * 100 - 50, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-20"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                        Datos Relevantes y Curiosidades
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        Descubre datos fascinantes sobre la computación óptica que demuestran por qué esta tecnología revolucionará el futuro de la informática.
                    </p>
                </motion.div>

                {/* Fun Facts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {funFacts.map((fact, index) => {
                        const isExpanded = expandedId === fact.id;

                        return (
                            <motion.div
                                key={fact.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <motion.button
                                    onClick={() => toggleFact(fact.id)}
                                    className="relative w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-3xl overflow-hidden"
                                >
                                    <motion.div
                                        animate={{
                                            height: isExpanded ? 'auto' : '200px'
                                        }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className={`relative w-full bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-8 overflow-hidden hover:bg-white/15 transition-all duration-300 ${isExpanded ? 'shadow-2xl shadow-purple-500/20' : ''}`}
                                    >
                                        {/* Gradient overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${fact.color} rounded-3xl opacity-50`} />

                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Icon and Title */}
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="text-4xl md:text-5xl">
                                                    {fact.icon}
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-bold text-white">
                                                    {fact.title}
                                                </h3>
                                            </div>

                                            {/* Fact content */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="w-full h-px bg-white/20 my-4" />
                                                        <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                                                            {fact.fact}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Click indicator */}
                                            <div className="mt-4 flex items-center justify-center">
                                                <motion.div
                                                    animate={{ 
                                                        rotate: isExpanded ? 180 : 0,
                                                        y: isExpanded ? 0 : [0, 5, 0]
                                                    }}
                                                    transition={{ 
                                                        rotate: { duration: 0.3 },
                                                        y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                                                    }}
                                                    className="text-white/60"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="m6 9 6 6 6-6" />
                                                    </svg>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FunFactsScene;
