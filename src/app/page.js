
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
      <div className='sole-text'>
        <h1>Sole</h1>
        <div>To get started, Create a new wallet</div>
      </div>

      <div className='wallet-creation'>
          <WalletHeroContent/>
      </div>
    </div>
   </div>
  );
}
