import { type FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SceneTransition from '../components/ui/SceneTransition';
import feynmanImg from '../assets/images/feynman_blackboard.jpg';

const Scene3: FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Elegant transitions - behind all content */}
            <SceneTransition variant="fade-edge" fromColor="#000000" toColor="#000000" position="top" intensity="soft" />
            <SceneTransition variant="fade-edge" fromColor="#000000" toColor="#000000" position="bottom" intensity="soft" />

            {/* Background Image */}
            <div className="absolute inset-0 z-1">
                <img
                    src={feynmanImg}
                    alt="Richard Feynman at blackboard"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-black/40" />
            </div>

            {/* Main content - always above transitions */}
            <div className="relative z-10 text-center p-8 max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-2xl md:text-4xl lg:text-5xl font-['Courier_Prime'] text-white mb-6 tracking-tight drop-shadow-2xl leading-tight cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={isHovered ? 'spanish' : 'english'}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            {isHovered ? '"Hay mucho espacio en el fondo"' : '"There\'s plenty of room at the bottom"'}
                        </motion.span>
                    </AnimatePresence>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base md:text-lg text-white/80 font-['Courier_Prime'] tracking-widest uppercase"
                >
                    — Richard Feynman
                </motion.p>
            </div>
        </section>
    );
};

export default Scene3;
