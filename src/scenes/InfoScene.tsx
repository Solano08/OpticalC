import { type FC, Suspense } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import SceneTransition from '../components/ui/SceneTransition';
import img1 from '../assets/images/img1.png';
import img2 from '../assets/images/img2.png';


interface ObjectInfo {
    id: number;
    title: string;
    description: string;
    image: string;
    details: string[];
    extra: string;
}

// Component for generated Speed and Efficiency image
const SpeedEfficiencyImage: FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white rounded-lg p-8">
            <svg 
                viewBox="0 0 400 300" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background - White */}
                <rect width="400" height="300" fill="white" />
                
                {/* Light rays representing speed */}
                <g opacity="0.9">
                    {/* Main light beam */}
                    <path
                        d="M 50 150 L 350 150"
                        stroke="url(#lightGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                    />
                    
                    {/* Speed lines */}
                    {[80, 120, 160, 200, 240, 280, 320].map((x, i) => (
                        <g key={i}>
                            <line
                                x1={x}
                                y1={130}
                                x2={x + 20}
                                y2={150}
                                stroke="#3B82F6"
                                strokeWidth="3"
                                strokeLinecap="round"
                                opacity={0.7 - i * 0.05}
                            />
                            <line
                                x1={x}
                                y1={170}
                                x2={x + 20}
                                y2={150}
                                stroke="#3B82F6"
                                strokeWidth="3"
                                strokeLinecap="round"
                                opacity={0.7 - i * 0.05}
                            />
                        </g>
                    ))}
                    
                    {/* Photon particles */}
                    {[100, 150, 200, 250, 300].map((x, i) => (
                        <circle
                            key={i}
                            cx={x}
                            cy={150}
                            r="6"
                            fill="url(#photonGradient)"
                            opacity={0.8}
                        >
                            <animate
                                attributeName="opacity"
                                values="0.3;1;0.3"
                                dur="1.5s"
                                begin={`${i * 0.3}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    ))}
                    
                    {/* Energy efficiency indicator - Green leaf/checkmark */}
                    <g transform="translate(320, 80)">
                        <circle
                            cx="0"
                            cy="0"
                            r="25"
                            fill="#10B981"
                            opacity="0.2"
                        />
                        <path
                            d="M -8 -2 L -2 4 L 8 -6"
                            stroke="#10B981"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </g>
                    
                    {/* Speed indicator */}
                    <g transform="translate(320, 220)">
                        <path
                            d="M -15 0 L 0 -15 L 15 0 L 0 15 Z"
                            fill="#EF4444"
                            opacity="0.8"
                        />
                        <text
                            x="0"
                            y="5"
                            textAnchor="middle"
                            fontSize="12"
                            fill="white"
                            fontWeight="bold"
                        >
                            c
                        </text>
                    </g>
                </g>
                
                {/* Gradients */}
                <defs>
                    <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
                    </linearGradient>
                    <radialGradient id="photonGradient" cx="50%" cy="50%">
                        <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
};

const objectsData: ObjectInfo[] = [
    {
        id: 1,
        title: 'Concepto Fundamental',
        description: 'La computación óptica utiliza luz, en lugar de electricidad, para procesar y transmitir información',
        image: img1,
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
        image: 'generated', // Special marker for generated image
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
        image: img2,
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

            {/* Background Particles - reducido de 6 a 3 para mejor rendimiento */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[6]">
                {[
                    // Optimized particles - fewer count, less blur radius for performance
                    { width: 400, height: 400, color: 'bg-blue-300/20', top: '-10%', left: '-10%', delay: 0, duration: 35, blur: 'blur-2xl' },
                    { width: 300, height: 300, color: 'bg-orange-300/20', top: '20%', right: '-5%', delay: 2, duration: 30, blur: 'blur-2xl' },
                    { width: 350, height: 350, color: 'bg-blue-400/15', bottom: '10%', left: '10%', delay: 5, duration: 38, blur: 'blur-2xl' },
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
                            transform: 'translateZ(0)', // Force GPU acceleration
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

            {/* Bloques uno debajo de otro con animación suave al entrar - sin efecto de click */}
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
                        {/* Imagen - sin efecto de click */}
                        <div className={`relative group rounded-3xl ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 via-orange-100/20 to-blue-200/30 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500 opacity-50" />
                            <div className="relative h-[340px] md:h-[420px] bg-white/50 rounded-3xl border border-white/60 shadow-lg flex items-center justify-center overflow-hidden p-8">
                                {data.image === 'generated' ? (
                                    <SpeedEfficiencyImage />
                                ) : (
                                    <img
                                        src={data.image}
                                        alt={data.title}
                                        className="w-full h-full object-contain drop-shadow-xl relative z-10"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Texto */}
                        <div className={`space-y-8 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                            <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
                                {data.title}
                            </motion.h2>

                            <div className="space-y-6">
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
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default InfoScene;
