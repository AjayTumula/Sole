
import './hero-content.scss';
import SoleImage from '../../assets/sole.png';
import Button from '@/ui/button/button';
import Image from 'next/image';
import Mnemonic from "../create-mnemonic";
import { SolanaWallet } from './solana-wallet';
import { EthWallet } from './ethereum-wallet';
import { generateMnemonic } from 'bip39';
import { useState } from 'react';


export function WalletHeroContent () {

    const [mnemonic, setMnemonic] = useState("");
    const [ createWallet, setCreateWallet] = useState(true);
    const [ openMnemonic, setOpenMnemonic] = useState(false);
    
    const wordsArray = mnemonic.split(' ');

    const handleWallet = async (e) => {
        e.preventDefault();

        const createMnemonic = await generateMnemonic();
        setMnemonic(createMnemonic);
        
        setCreateWallet(false);
        setOpenMnemonic(true);
    }


    return <div className='wallet-hero-section'>

        { createWallet && (
            <div className='sole-card'>
                <div className='create-wallet'>
                    <div className='sole-text'>
                        <Image src={SoleImage}/>
                        <p>To get started, create a new wallet</p>
                    </div>

                    <div className='add-wallet-button'>
                        <Button onClick={handleWallet}>Create a new wallet</Button>
                    </div>                   
                </div>
            </div>
        )}
        
        { openMnemonic && (
            <div className='mnemonic-wrapper'>
                <h2>Secret Recovery Phrase</h2>
                <p>This phrase is the ONLY way to recover your wallet. DO NOT
                    share it withanyone!</p>
                <div className='mnemonic-grid'> 
                     {wordsArray.map((word, index) => (
                        <div key={index} className='mnemonic-word'>
                            {word}
                        </div>
                     ))}
                </div>
            </div>
        )}

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