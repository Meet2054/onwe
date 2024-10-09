import BottomPage from "./bottomsection";
import { FeatureSection, Header } from "./herosection";
import MiddleSection from "./middlesection";

const App: React.FC = () => {
    
  
    return (
      <main className="flex overflow-auto  flex-col px-9 pt-9 pb-72 bg-neutral-900 max-md:px-5 max-md:pb-24">
        <Header />
        <FeatureSection />
        <MiddleSection />
        <BottomPage />
      </main>
    );
  };
  
  export default App;