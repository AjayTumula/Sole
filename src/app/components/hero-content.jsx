
import './hero-content.scss';
import SoleImage from '../../assets/sole.png';
import Button from '@/ui/button/button';
import Image from 'next/image';
import Mnemonic from "../create-mnemonic";
import { SolanaWallet } from './solana-wallet';
import { EthWallet } from './ethereum-wallet';


export function WalletHeroContent () {


    return <div className='wallet-hero-section'>

        <div className='sole-wrapper'>
            <div className='sole-text'>
                <div>
                <Image style={{marginLeft: '50px', marginTop: '30px'}} src={SoleImage}/>
                <p>To get started, create a new wallet</p>
                </div>

                <div className='add-wallet-button'>
                <Button>Create a new wallet</Button>
                </div>
            </div>
        </div>
        <div className='wallet-seed'>
            {/* <Mnemonic/>  */}
        </div>
            
        {/* <div className='wallet-buttons'>
            <div className='sol-wallet'>
                <SolanaWallet />
            </div> 
            <div className='eth-wallet'>
                <EthWallet />
            </div>
        </div> */}
    </div>
}