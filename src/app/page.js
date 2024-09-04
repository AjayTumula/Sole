"use client"
import './page.scss';


import { WalletHeroContent } from './components/hero-content';
import Navbar from '@/ui/navbar/navbar';

export default function Home() {
  return (
   <div className="wallet-component">
    <div className='navbar-section'>
      <Navbar/>
    </div>

    <div className='sole-wrapper'>
      <WalletHeroContent />
    </div>

    
   </div>
  );
}
