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
    colorPhase: number;
    colorSpeed: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
}

interface SubtleColorParticleBackgroundProps {
    className?: string;
}

const SubtleColorParticleBackground: FC<SubtleColorParticleBackgroundProps> = ({ className = '' }) => {
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
            const z = Math.random();

            const { width: canvasWidth, height: canvasHeight } = getCanvasDimensions();

            return {
                x: Math.random() * canvasWidth,
                y: Math.random() * canvasHeight,
                z: z,
                size: 1 + z * 4, // Small particles
                opacity: Math.random(),
                baseOpacity: 0.15 + z * 0.35, // Subtle opacity
                twinkleSpeed: 0.005 + Math.random() * 0.01,
                twinklePhase: Math.random() * Math.PI * 2,
                colorPhase: Math.random() * Math.PI * 2,
                colorSpeed: 0.002 + Math.random() * 0.003, // Slow color change
                vx: (Math.random() - 0.5) * (0.1 + z * 0.3),
                vy: (Math.random() - 0.5) * (0.1 + z * 0.3) - 0.05,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            };
        };

        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < 100; i++) {
                particlesRef.current.push(createParticle());
            }
        };

        const getColorFromPhase = (phase: number) => {
            // Cycle through white -> subtle orange -> subtle yellow -> subtle red -> white
            const normalizedPhase = (Math.sin(phase) + 1) / 2; // 0 to 1

            // Base is always white with subtle color tints
            const r = 255;
            const g = 255 - (normalizedPhase * 60); // Reduce green slightly for warm tones
            const b = 255 - (normalizedPhase * 100); // Reduce blue more for warm tones

            return { r: Math.floor(r), g: Math.floor(g), b: Math.floor(b) };
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const { width: canvasWidth, height: canvasHeight } = getCanvasDimensions();

            const sortedParticles = [...particlesRef.current].sort((a, b) => a.z - b.z);

            sortedParticles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;

                if (p.x < -50) p.x = canvasWidth + 50;
                if (p.x > canvasWidth + 50) p.x = -50;
                if (p.y < -50) p.y = canvasHeight + 50;
                if (p.y > canvasHeight + 50) p.y = -50;

                p.twinklePhase += p.twinkleSpeed;
                p.opacity = p.baseOpacity + Math.sin(p.twinklePhase) * 0.2;

                // Update color phase
                p.colorPhase += p.colorSpeed;

                const depthScale = 0.2 + p.z * 0.8;
                const depthOpacity = p.opacity * (0.3 + p.z * 0.7);

                const size = p.size * depthScale;
                const coreSize = size * 0.3;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);

                const color = getColorFromPhase(p.colorPhase);
                const { r, g, b } = color;

                const gradient = ctx.createRadialGradient(0, 0, coreSize, 0, 0, size);
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${depthOpacity})`);
                gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${depthOpacity * 0.6})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.fill();

                if (p.z > 0.6) {
                    const glowSize = size * 1.8;
                    const glowGradient = ctx.createRadialGradient(0, 0, size, 0, 0, glowSize);
                    glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.1)`);
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
            if (animationFrameRef.current !== undefined) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        />
    );
};

export default SubtleColorParticleBackground;
