import { type FC, useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    z: number;
    size: number;
    opacity: number;
    baseOpacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
    color: { r: number; g: number; b: number };
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
}

interface AggressiveOrangeParticleBackgroundProps {
    className?: string;
}

const AggressiveOrangeParticleBackground: FC<AggressiveOrangeParticleBackgroundProps> = ({ className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let dpr = window.devicePixelRatio || 1;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                dpr = window.devicePixelRatio || 1;
                const width = parent.clientWidth;
                const height = parent.clientHeight;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';
                ctx.scale(dpr, dpr);
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const getCanvasDimensions = () => {
            return {
                width: canvas.width / dpr,
                height: canvas.height / dpr
            };
        };

        const createParticle = (): Particle => {
            const z = Math.random(); // Profundidad: 0 (lejos) a 1 (cerca)

            // Naranja más vibrante y vivo con variaciones
            const colorVariation = Math.random();
            // Aplicar más brillo a partículas cercanas directamente en los colores
            const brightnessFactor = 0.85 + z * 0.15;
            const color = {
                r: 255,
                g: Math.min(255, (100 + Math.random() * 70 + colorVariation * 30) * brightnessFactor), // 100-200 (más variado y brillante)
                b: Math.min(255, (10 + Math.random() * 40 + colorVariation * 15) * brightnessFactor)   // 10-65 (más variado y brillante)
            };

            const { width: canvasWidth, height: canvasHeight } = getCanvasDimensions();

            return {
                x: Math.random() * canvasWidth,
                y: Math.random() * canvasHeight,
                z: z,
                // Smaller, more elegant size range
                size: 1 + z * 5,
                opacity: Math.random(),
                baseOpacity: 0.2 + z * 0.5, // Closer particles are much brighter
                twinkleSpeed: 0.005 + Math.random() * 0.01,
                twinklePhase: Math.random() * Math.PI * 2,
                color,
                // Parallax effect: closer particles move faster
                vx: (Math.random() - 0.5) * (0.1 + z * 0.4),
                vy: (Math.random() - 0.5) * (0.1 + z * 0.4) - 0.05, // Slight upward drift
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            };
        };

        const initParticles = () => {
            particlesRef.current = [];
            // Reduced from 150 to 80 for better performance while maintaining visual richness
            for (let i = 0; i < 80; i++) {
                particlesRef.current.push(createParticle());
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Ordenar partículas por profundidad (z) para renderizar las más lejanas primero
            const sortedParticles = [...particlesRef.current].sort((a, b) => a.z - b.z);

            sortedParticles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;

                p.twinklePhase += p.twinkleSpeed;
                const twinkle = Math.sin(p.twinklePhase) * 0.12; // Twinkle más pronunciado
                p.opacity = Math.max(0.08, Math.min(0.55, p.baseOpacity + twinkle));

                // Wrap around screen
                const { width: canvasWidth, height: canvasHeight } = getCanvasDimensions();
                if (p.y < -20) p.y = canvasHeight + 20;
                if (p.y > canvasHeight + 20) p.y = -20;
                if (p.x < -20) p.x = canvasWidth + 20;
                if (p.x > canvasWidth + 20) p.x = -20;

                // Depth-based blur simulation (using globalAlpha and size)
                const depthScale = 0.2 + p.z * 0.8; // 0.2 to 1.0
                const depthOpacity = p.opacity * (0.3 + p.z * 0.7); // More opaque when closer

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.globalAlpha = depthOpacity;

                // High quality rendering
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                // Particle Gradient - Richer Orange/Gold
                const size = p.size * depthScale;
                const coreSize = size * 0.3;

                // Dynamic brightness based on depth
                // const brightness = 0.8 + p.z * 0.4; // Unused

                const gradient = ctx.createRadialGradient(0, 0, coreSize, 0, 0, size);

                // Richer colors
                const r = p.color.r;
                const g = p.color.g;
                const b = p.color.b;

                gradient.addColorStop(0, `rgba(${Math.min(255, r * 1.2)}, ${Math.min(255, g * 1.2)}, ${Math.min(255, b * 1.2)}, 1)`); // Bright core
                gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.8)`); // Main color
                gradient.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, 0.2)`); // Soft edge
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`); // Fade out

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.fill();

                // Subtle Glow for closer particles
                if (p.z > 0.6) {
                    const glowSize = size * 2; // Reduced glow size
                    const glowGradient = ctx.createRadialGradient(0, 0, size, 0, 0, glowSize);
                    glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.15)`);
                    glowGradient.addColorStop(1, 'rgba(0,0,0,0)');

                    ctx.fillStyle = glowGradient;
                    ctx.beginPath();
                    ctx.arc(0, 0, glowSize, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
        />
    );
};

export default AggressiveOrangeParticleBackground;

