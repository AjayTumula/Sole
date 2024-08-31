
import './hero-content.scss';
import Mnemonic from "../create-mnemonic";
import { SolanaWallet } from './solana-wallet';
import { EthWallet } from './ethereum-wallet';


export function WalletHeroContent () {


    return <div className='wallet-hero-section'>
        <div className='wallet-seed'>
            <Mnemonic/> 
        </div>
            
        <div className='wallet-buttons'>
            <div className='sol-wallet'>
                <SolanaWallet />
            </div> 
            <div className='eth-wallet'>
                <EthWallet />
            </div>
        </div>
    </div>
}