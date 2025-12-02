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
}

interface ParticleBackgroundProps {
    className?: string;
}

const ParticleBackground: FC<ParticleBackgroundProps> = ({ className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const createParticle = (): Particle => {
            const z = Math.random();
            const temp = Math.random();
            let color;

            // Blue, Orange, Red palette
            if (temp < 0.4) {
                // Blue (various shades)
                color = { r: 60 + Math.random() * 50, g: 100 + Math.random() * 100, b: 255 };
            } else if (temp < 0.7) {
                // Orange
                color = { r: 255, g: 140 + Math.random() * 50, b: 50 };
            } else {
                // Red
                color = { r: 255, g: 60 + Math.random() * 50, b: 60 };
            }

            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: z,
                size: 0.5 + z * 1.5, // Slightly larger for visibility
                opacity: Math.random(),
                baseOpacity: 0.1 + z * 0.3, // Subtle opacity
                twinkleSpeed: 0.005 + Math.random() * 0.01,
                twinklePhase: Math.random() * Math.PI * 2,
                color,
                vx: (Math.random() - 0.5) * 0.2, // Subtle horizontal movement
                vy: (Math.random() - 0.5) * 0.2 - 0.1 // Subtle vertical movement (slight upward drift)
            };
        };

        const initParticles = () => {
            particlesRef.current = [];
            // Moderate count for background
            for (let i = 0; i < 150; i++) {
                particlesRef.current.push(createParticle());
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                p.twinklePhase += p.twinkleSpeed;
                const twinkle = Math.sin(p.twinklePhase) * 0.2;
                p.opacity = Math.max(0.05, Math.min(0.8, p.baseOpacity + twinkle));

                // Wrap around screen
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;

                ctx.save();
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 1)`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Subtle glow for larger particles
                if (p.z > 0.7) {
                    const glowGradient = ctx.createRadialGradient(
                        p.x, p.y, 0,
                        p.x, p.y, p.size * 4
                    );
                    glowGradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.2)`);
                    glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    ctx.fillStyle = glowGradient;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
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

export default ParticleBackground;
