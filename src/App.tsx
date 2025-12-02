import SmoothScroll from './components/layout/SmoothScroll';
import LoadingScreen from './scenes/LoadingScreen';
import HeroScene from './scenes/HeroScene';
import InfoScene from './scenes/InfoScene';
import CurrentStateScene from './scenes/CurrentStateScene';
import Scene3 from './scenes/Scene3';
import Scene5 from './scenes/Scene5';
import FunFactsScene from './scenes/FunFactsScene';
import { useLoading } from './context/LoadingContext';

function App() {
  const { isLoading } = useLoading();

  return (
    <SmoothScroll>
      <main className="relative w-full bg-primary text-secondary overflow-hidden">
        <LoadingScreen />

        {/* Main Content */}
        <div className={`relative z-10 transition-all duration-1000 ${isLoading ? 'blur-md scale-105' : 'blur-0 scale-100'}`}>
          <HeroScene />
          <InfoScene />
          <CurrentStateScene />
          <Scene3 />
          <Scene5 />
          <FunFactsScene />
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
