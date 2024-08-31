
import './page.scss';
import Mnemonic from "./create-mnemonic";
import { SolanaWallet } from "./components/solana-wallet";
import { EthWallet } from "./components/ethereum-wallet";
import { WalletHeroContent } from './components/hero-content';

export default function Home() {
  return (
   <div className="wallet-component">
    <div className='navbar-section'>
      Navbar
    </div>

    <div className='wallet-wrapper'>
        <WalletHeroContent/>
    </div>
   </div>
  );
}
