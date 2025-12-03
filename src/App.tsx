import { lazy, Suspense } from 'react';
import SmoothScroll from './components/layout/SmoothScroll';
import LoadingScreen from './scenes/LoadingScreen';
import HeroScene from './scenes/HeroScene';
import { useLoading } from './context/LoadingContext';

// Lazy load de escenas para mejorar el rendimiento inicial
const InfoScene = lazy(() => import('./scenes/InfoScene'));
const CurrentStateScene = lazy(() => import('./scenes/CurrentStateScene'));
const Scene3 = lazy(() => import('./scenes/Scene3'));
const Scene5 = lazy(() => import('./scenes/Scene5'));
const RisksScene = lazy(() => import('./scenes/RisksScene'));
const FunFactsScene = lazy(() => import('./scenes/FunFactsScene'));

function App() {
  const { isLoading } = useLoading();

  return (
    <SmoothScroll>
      <main className="relative w-full bg-primary text-secondary overflow-hidden">
        <LoadingScreen />

        {/* Main Content */}
        <div className={`relative z-10 transition-all duration-1000 ${isLoading ? 'blur-md scale-105' : 'blur-0 scale-100'}`}>
          <HeroScene />
          <Suspense fallback={<div className="h-screen bg-gradient-to-br from-[#F8F9FA] via-[#F5F5F7] to-[#FAFAFA]" />}>
            <InfoScene />
          </Suspense>
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <CurrentStateScene />
          </Suspense>
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <Scene3 />
          </Suspense>
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <Scene5 />
          </Suspense>
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <RisksScene />
          </Suspense>
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <FunFactsScene />
          </Suspense>
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
