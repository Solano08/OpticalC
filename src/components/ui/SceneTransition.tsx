import { type FC, useMemo } from 'react';

interface SceneTransitionProps {
    variant?: 'smooth-gradient' | 'subtle-wave' | 'fade-edge' | 'geometric' | 'minimal' | 'liquid';
    fromColor?: string;
    toColor?: string;
    position?: 'top' | 'bottom';
    intensity?: 'soft' | 'medium' | 'strong';
}

/**
 * Componente de transición optimizado para escenas
 * Usa CSS puro y técnicas de GPU acceleration para máximo rendimiento
 * Sin animaciones JS pesadas que causen lag
 */
const SceneTransition: FC<SceneTransitionProps> = ({
    variant = 'smooth-gradient',
    fromColor = '#000000',
    toColor = 'transparent',
    position = 'bottom',
    intensity = 'medium'
}) => {
    const isTop = position === 'top';

    // Intensidad determina la altura de la transición
    const heightMap = {
        soft: 'h-24 md:h-32',
        medium: 'h-32 md:h-48',
        strong: 'h-48 md:h-64'
    };

    const height = heightMap[intensity];

    // Generar ID único para gradientes para evitar conflictos
    const gradientId = useMemo(() => {
        // Crear ID único basado en las props sin usar funciones impuras
        const hash = `${variant}-${position}-${fromColor}-${toColor}`.split('').reduce((acc, char) => {
            const hash = char.charCodeAt(0) + ((acc << 5) - acc);
            return hash & hash;
        }, 0);
        return `grad-${variant}-${position}-${Math.abs(hash).toString(36)}`;
    }, [variant, position, fromColor, toColor]);

    // Convertir colores hex a rgba si es necesario
    const parseColor = (color: string, opacity: number = 1): string => {
        if (color === 'transparent') return 'transparent';
        if (color.startsWith('rgba') || color.startsWith('rgb')) return color;
        
        // Extraer valores hex
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    // Variante: Smooth Gradient - La más suave y eficiente
    if (variant === 'smooth-gradient') {
        return (
            <div 
                className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 right-0 ${height} pointer-events-none z-0 will-change-transform`}
                style={{ 
                    transform: 'translateZ(0)', // GPU acceleration
                    backfaceVisibility: 'hidden',
                    isolation: 'isolate' // Crea nuevo stacking context
                }}
            >
                <div
                    className={`w-full h-full ${isTop ? 'bg-gradient-to-b' : 'bg-gradient-to-t'}`}
                    style={{
                        backgroundImage: isTop
                            ? `linear-gradient(to bottom, ${fromColor} 0%, ${parseColor(fromColor, 0.98)} 10%, ${parseColor(fromColor, 0.92)} 20%, ${parseColor(fromColor, 0.8)} 35%, ${parseColor(fromColor, 0.6)} 50%, ${parseColor(fromColor, 0.35)} 65%, ${parseColor(fromColor, 0.15)} 80%, ${parseColor(fromColor, 0.05)} 90%, ${toColor} 100%)`
                            : `linear-gradient(to top, ${fromColor} 0%, ${parseColor(fromColor, 0.98)} 10%, ${parseColor(fromColor, 0.92)} 20%, ${parseColor(fromColor, 0.8)} 35%, ${parseColor(fromColor, 0.6)} 50%, ${parseColor(fromColor, 0.35)} 65%, ${parseColor(fromColor, 0.15)} 80%, ${parseColor(fromColor, 0.05)} 90%, ${toColor} 100%)`,
                        maskImage: isTop
                            ? 'linear-gradient(to bottom, black 0%, black 25%, transparent 100%)'
                            : 'linear-gradient(to top, black 0%, black 25%, transparent 100%)',
                        WebkitMaskImage: isTop
                            ? 'linear-gradient(to bottom, black 0%, black 25%, transparent 100%)'
                            : 'linear-gradient(to top, black 0%, black 25%, transparent 100%)'
                    }}
                />
            </div>
        );
    }

    // Variante: Subtle Wave - Onda sutil sin animación pesada
    if (variant === 'subtle-wave') {
        return (
            <div 
                className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 right-0 ${height} pointer-events-none z-0 overflow-hidden will-change-transform`}
                style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
            >
                <svg 
                    className="w-full h-full" 
                    preserveAspectRatio="none" 
                    viewBox="0 0 1200 200"
                    style={{ transform: 'translateZ(0)' }}
                >
                    <defs>
                        <linearGradient id={`${gradientId}-wave`} x1="0%" y1={isTop ? "0%" : "100%"} x2="0%" y2={isTop ? "100%" : "0%"}>
                            <stop offset="0%" stopColor={fromColor} stopOpacity={isTop ? 1 : 0} />
                            <stop offset="50%" stopColor={parseColor(fromColor, 0.5)} stopOpacity="0.5" />
                            <stop offset="100%" stopColor={toColor} stopOpacity={isTop ? 0 : 1} />
                        </linearGradient>
                    </defs>
                    <path
                        d={isTop 
                            ? "M0,0 L1200,0 L1200,80 Q900,60 600,80 T0,80 Z"
                            : "M0,120 Q300,140 600,120 T1200,120 L1200,200 L0,200 Z"
                        }
                        fill={`url(#${gradientId}-wave)`}
                        style={{ transform: 'translateZ(0)' }}
                    />
                </svg>
            </div>
        );
    }

    // Variante: Fade Edge - Solo desvanecimiento en los bordes
    if (variant === 'fade-edge') {
        return (
            <div 
                className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 right-0 ${height} pointer-events-none z-0 will-change-transform`}
                style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
            >
                <div
                    className={`w-full h-full ${isTop ? 'bg-gradient-to-b' : 'bg-gradient-to-t'}`}
                    style={{
                        backgroundImage: isTop
                            ? `linear-gradient(to bottom, ${fromColor} 0%, ${parseColor(fromColor, 0.8)} 30%, ${parseColor(fromColor, 0.3)} 60%, ${toColor} 100%)`
                            : `linear-gradient(to top, ${fromColor} 0%, ${parseColor(fromColor, 0.8)} 30%, ${parseColor(fromColor, 0.3)} 60%, ${toColor} 100%)`
                    }}
                />
            </div>
        );
    }

    // Variante: Geometric - Diseño geométrico moderno
    if (variant === 'geometric') {
        return (
            <div 
                className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 right-0 ${height} pointer-events-none z-0 overflow-hidden will-change-transform`}
                style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
            >
                <svg 
                    className="w-full h-full" 
                    preserveAspectRatio="none" 
                    viewBox="0 0 1200 200"
                    style={{ transform: 'translateZ(0)' }}
                >
                    <defs>
                        <linearGradient id={`${gradientId}-geo`} x1="0%" y1={isTop ? "0%" : "100%"} x2="100%" y2={isTop ? "100%" : "0%"}>
                            <stop offset="0%" stopColor={fromColor} stopOpacity={isTop ? 1 : 0} />
                            <stop offset="100%" stopColor={toColor} stopOpacity={isTop ? 0 : 1} />
                        </linearGradient>
                    </defs>
                    <path
                        d={isTop 
                            ? "M0,0 L1200,0 L1200,100 L600,150 L0,100 Z"
                            : "M0,100 L600,50 L1200,100 L1200,200 L0,200 Z"
                        }
                        fill={`url(#${gradientId}-geo)`}
                        style={{ transform: 'translateZ(0)' }}
                    />
                </svg>
            </div>
        );
    }

    // Variante: Minimal - Ultra minimalista y eficiente
    if (variant === 'minimal') {
        return (
            <div 
                className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 right-0 ${height} pointer-events-none z-0 will-change-transform`}
                style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
            >
                <div
                    className={`w-full h-full ${isTop ? 'bg-gradient-to-b' : 'bg-gradient-to-t'}`}
                    style={{
                        backgroundImage: isTop
                            ? `linear-gradient(to bottom, ${fromColor} 0%, ${parseColor(fromColor, 0.5)} 50%, ${toColor} 100%)`
                            : `linear-gradient(to top, ${fromColor} 0%, ${parseColor(fromColor, 0.5)} 50%, ${toColor} 100%)`
                    }}
                />
            </div>
        );
    }

    // Variante: Liquid - Onda fluida elegante (optimizada sin animaciones pesadas)
    if (variant === 'liquid') {
        const liquidHeight = intensity === 'strong' ? 'h-40 md:h-56' : intensity === 'soft' ? 'h-28 md:h-36' : 'h-32 md:h-48';
        return (
            <div 
                className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 right-0 ${liquidHeight} pointer-events-none z-0 overflow-hidden will-change-transform`}
                style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
            >
                <svg 
                    className="w-full h-full" 
                    preserveAspectRatio="none" 
                    viewBox="0 0 1440 320"
                    style={{ transform: 'translateZ(0)' }}
                >
                    <defs>
                        <linearGradient id={`${gradientId}-liquid`} x1="0%" y1={isTop ? "0%" : "100%"} x2="0%" y2={isTop ? "100%" : "0%"}>
                            <stop offset="0%" stopColor={fromColor} stopOpacity={isTop ? 1 : 0} />
                            <stop offset="25%" stopColor={parseColor(fromColor, 0.9)} stopOpacity="0.9" />
                            <stop offset="50%" stopColor={parseColor(fromColor, 0.7)} stopOpacity="0.7" />
                            <stop offset="75%" stopColor={parseColor(fromColor, 0.4)} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={toColor} stopOpacity={isTop ? 0 : 1} />
                        </linearGradient>
                    </defs>
                    {/* Onda principal con forma más orgánica y elegante */}
                    <path
                        d={isTop 
                            ? "M0,0 L1440,0 L1440,160 Q1080,200 720,160 Q360,120 0,160 Z"
                            : "M0,160 Q360,200 720,160 Q1080,120 1440,160 L1440,320 L0,320 Z"
                        }
                        fill={`url(#${gradientId}-liquid)`}
                        style={{ transform: 'translateZ(0)' }}
                    />
                    {/* Onda secundaria para más profundidad visual */}
                    <path
                        d={isTop 
                            ? "M0,40 L1440,40 L1440,140 Q1080,180 720,140 Q360,100 0,140 Z"
                            : "M0,180 Q360,220 720,180 Q1080,140 1440,180 L1440,320 L0,320 Z"
                        }
                        fill={`url(#${gradientId}-liquid)`}
                        fillOpacity="0.6"
                        style={{ transform: 'translateZ(0)' }}
                    />
                </svg>
            </div>
        );
    }

    // Default: smooth-gradient
    return (
        <div 
            className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 right-0 ${height} pointer-events-none z-0 will-change-transform`}
            style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
        >
            <div
                className={`w-full h-full ${isTop ? 'bg-gradient-to-b' : 'bg-gradient-to-t'}`}
                style={{
                    backgroundImage: isTop
                        ? `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`
                        : `linear-gradient(to top, ${fromColor} 0%, ${toColor} 100%)`
                }}
            />
        </div>
    );
};

export default SceneTransition;