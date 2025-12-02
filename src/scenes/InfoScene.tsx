import { type FC, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import SceneTransition from '../components/ui/SceneTransition';
import opticalProcessorImg from '../assets/images/optical_processor.png';
import lightTransmissionImg from '../assets/images/light_transmission.png';
import quantumOpticalImg from '../assets/images/quantum_optical.png';


interface ObjectInfo {
    id: number;
    title: string;
    description: string;
    image: string;
    details: string[];
    extra: string;
}

const objectsData: ObjectInfo[] = [
    {
        id: 1,
        title: 'Concepto Fundamental',
        description: 'La computación óptica utiliza luz, en lugar de electricidad, para procesar y transmitir información',
        image: opticalProcessorImg,
        details: [
            'Procesamiento mediante fotones en lugar de electrones',
            'Manipulación de datos usando propiedades de la luz',
            'Transformación de datos binarios en pulsos de luz',
            'Operaciones de lógica y cálculos complejos con luz',
        ],
        extra: 'La computación óptica es un paradigma tecnológico que utiliza la luz, mediante fotones, para procesar, almacenar y transmitir información, en lugar de usar electrones como en la computación electrónica tradicional. Lo que hace única a esta tecnología es que la luz puede viajar extremadamente rápido (casi 300,000 km/s) y puede codificar datos en propiedades como la amplitud, fase y longitud de onda, lo que permite cálculos masivamente paralelos y a gran velocidad.',
    },
    {
        id: 2,
        title: 'Velocidad y Eficiencia',
        description: 'Los fotones viajan a la velocidad de la luz, permitiendo cálculos y transmisión de datos extremadamente rápidos',
        image: lightTransmissionImg,
        details: [
            'Velocidad de transmisión casi instantánea',
            'Cálculos paralelos masivos',
            'Menor consumo energético que sistemas electrónicos',
            'Generación mínima de calor',
        ],
        extra: 'Los dispositivos ópticos generan mucho menos calor y consumen menos energía que los electrónicos, superando así limitaciones térmicas y energéticas. Además, los sistemas ópticos generan menos calor, reduciendo la necesidad de enfriamiento y el consumo energético. Esta tecnología promete superar las limitaciones de velocidad y consumo de la computación electrónica tradicional.',
    },
    {
        id: 3,
        title: 'Componentes y Arquitectura',
        description: 'En la computación óptica, la información se codifica en haces y ondas de luz, manipulados con lentes, espejos y láseres',
        image: quantumOpticalImg,
        details: [
            'Elementos fotónicos: lentes, espejos, láseres y fibras ópticas',
            'Diseño de circuitos fotónicos completamente ópticos o híbridos',
            'Codificación de datos en propiedades de la luz',
            'Arquitecturas que combinan luz con electrónica cuando es necesario',
        ],
        extra: 'Para hacer posible la computación óptica, se emplean elementos fotónicos como lentes, espejos, láseres y fibras ópticas, además de un diseño de circuitos fotónicos que puede ser completamente óptico o híbrido, combinando luz con electrónica cuando es necesario. En esencia, los datos binarios se transforman en pulsos de luz que se manipulan para realizar operaciones de lógica y cálculos complejos.',
    }
];

const InfoScene: FC = () => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <section className="relative bg-gradient-to-br from-[#F8F9FA] via-[#F5F5F7] to-[#FAFAFA] py-24 md:py-32">
            {/* Elegant transitions - behind all content */}
            <SceneTransition variant="smooth-gradient" fromColor="#000000" toColor="#F8F9FA" position="top" intensity="medium" />
            <SceneTransition variant="smooth-gradient" fromColor="#F8F9FA" toColor="#FFF8E7" position="bottom" intensity="medium" />
            
            {/* Spline Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                <Suspense fallback={
                    <div className="w-full h-full bg-gradient-to-br from-[#F8F9FA] via-[#F5F5F7] to-[#FAFAFA]" />
                }>
                    <Spline 
                        scene="https://prod.spline.design/YFnIN8clpj34Zz2R/scene.splinecode"
                        className="w-full h-full"
                    />
                </Suspense>
                {/* Overlay sutil para mejorar legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FA]/80 via-[#F5F5F7]/80 to-[#FAFAFA]/80 z-[5]" />
            </div>

            {/* Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[6]">
                {[
                    // Optimized particles - fewer count, less blur radius for performance
                    { width: 400, height: 400, color: 'bg-blue-300/20', top: '-10%', left: '-10%', delay: 0, duration: 35, blur: 'blur-3xl' },
                    { width: 300, height: 300, color: 'bg-orange-300/20', top: '20%', right: '-5%', delay: 2, duration: 30, blur: 'blur-3xl' },
                    { width: 350, height: 350, color: 'bg-blue-400/15', bottom: '10%', left: '10%', delay: 5, duration: 38, blur: 'blur-3xl' },

                    // Small particles
                    { width: 60, height: 60, color: 'bg-blue-400/40', top: '15%', left: '25%', delay: 1, duration: 15, blur: 'blur-xl' },
                    { width: 80, height: 80, color: 'bg-orange-300/40', top: '30%', right: '15%', delay: 3, duration: 18, blur: 'blur-xl' },
                    { width: 50, height: 50, color: 'bg-white/30', bottom: '25%', left: '15%', delay: 2, duration: 20, blur: 'blur-lg' },
                ].map((particle, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${particle.color} ${particle.blur} mix-blend-multiply will-change-transform`}
                        style={{
                            width: particle.width,
                            height: particle.height,
                            top: particle.top,
                            left: particle.left,
                            right: particle.right,
                            bottom: particle.bottom,
                        }}
                        animate={{
                            x: ['-10%', '10%', '-10%'],
                            y: ['-10%', '10%', '-10%'],
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                            delay: particle.delay,
                        }}
                    />
                ))}

                {/* Comets / Light Rays - REMOVED as per request */}

            </div>

            {/* Bloques uno debajo de otro con animación suave al entrar */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 space-y-24">
                {objectsData.map((data, index) => (
                    <motion.div
                        key={data.id}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''
                            }`}
                    >
                        {/* Imagen (click para expandir/contraer) */}
                        <motion.button
                            type="button"
                            onClick={() => setExpandedId((prev) => (prev === data.id ? null : data.id))}
                            className={`relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-3xl ${index % 2 !== 0 ? 'lg:order-2' : ''
                                }`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 via-orange-100/20 to-blue-200/30 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500 opacity-50" />
                            <div className="relative h-[340px] md:h-[420px] bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg flex items-center justify-center overflow-hidden p-8 group-hover:border-white/80 transition-all duration-300 cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <img
                                    src={data.image}
                                    alt={data.title}
                                    className="w-full h-full object-contain drop-shadow-xl relative z-10"
                                />
                            </div>
                        </motion.button>

                        {/* Texto */}
                        <div className={`space-y-8 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                            <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
                                {data.title}
                            </motion.h2>

                            <div className="relative min-h-[200px]">
                                <AnimatePresence mode="wait">
                                    {expandedId === data.id ? (
                                        <motion.div
                                            key="expanded"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                            className="space-y-6"
                                        >
                                            <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                                                {data.extra}
                                            </p>
                                            <ul className="space-y-3">
                                                {data.details.map((detail, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-orange-300" />
                                                        <span className="text-slate-800 text-sm md:text-base">{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="summary"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                            className="space-y-6"
                                        >
                                            <p className="text-lg md:text-2xl text-slate-700 leading-relaxed font-medium">
                                                {data.description}
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {data.details.map((detail, i) => (
                                                    <div
                                                        key={i}
                                                        className="liquid-glass p-5 hover:bg-white/80 transition-all duration-300"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-orange-300" />
                                                            <span className="text-slate-800 font-semibold text-sm md:text-base">
                                                                {detail}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default InfoScene;
