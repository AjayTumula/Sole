"use client"
import './page.scss';
import { WalletHeroContent } from './components/hero-content';
import Navbar from '@/ui/navbar/navbar';


export default function Home() {
  return (
    <div>
      
        <Navbar />
        <div className="wallet-component">    
          <WalletHeroContent />
      </div> 
    </div>
     
  );
}
