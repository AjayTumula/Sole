"use client"
import './page.scss';
import { WalletHeroContent } from './components/hero-content';
import SeedProvider from './context/SoleSeedContext';



export default function Home() {
  return (
   
      <div className="wallet-component">
        
          <WalletHeroContent />
      </div>
    
  );
}
