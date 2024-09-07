
import './hero-content.scss';
import SoleImage from '../../assets/sole.png';
import Button from '@/ui/button/button';
import Image from 'next/image';
import Mnemonic from "../create-mnemonic";
import { SolanaWallet } from './solana-wallet';
import { EthWallet } from './ethereum-wallet';
import { generateMnemonic } from 'bip39';
import { useRef, useState } from 'react';


export function WalletHeroContent () {

    const [mnemonic, setMnemonic] = useState("");
    const [ createWallet, setCreateWallet] = useState(true);
    const [ openMnemonic, setOpenMnemonic] = useState(false);
    const [ isHovered, setIsHovered]  = useState(false);
    const [ copySuccess, setCopySuccess ] = useState('');
    const [ copyButton, setCopyButton ] = useState(true);
    const [ isChecked, setIsChecked ] = useState(false);
    const divRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }
    
    const wordsArray = mnemonic.split(' ');

    const handleWallet = async (e) => {
        e.preventDefault();

        const createMnemonic = await generateMnemonic();
        setMnemonic(createMnemonic);
        
        setCreateWallet(false);
        setOpenMnemonic(true);
    }

    const copytoClipboard = () => {
        const textToCopy = divRef.current.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopySuccess('Copied')
        })
        setCopyButton(false);
    }


    const handleContinueButton = () => {
        localStorage.setItem('mnemonicWords', JSON.stringify(wordsArray));
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.value);
    }
    

    return <div className='wallet-hero-section'>
        <div className='sole-wrapper'>
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
               
                {!isHovered && (
                    <div className='disable-icon' style={{ display: isHovered ? 'none' : 'block' }}>
                        <i class="fa-regular fa-eye-slash" style={{color: '#ffffff'}}></i>
                    </div>
                )}
                
                <div ref={divRef} className={`mnemonic-grid ${isHovered ? 'clear' : 'blurred'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> 
                     {wordsArray.map((word, index) => (
                        <div key={index} className='mnemonic-word'>
                            {word}
                        </div>
                     ))}
                </div>
                
                
                {copyButton ? 
                    (<div className='copy-button'>
                        <button onClick={copytoClipboard}>Copy</button>  <span><i class="fa-solid fa-copy" style={{color: '#040a15'}}></i></span>
                     </div>) :
                     (<div className='copied-text'> 
                        <span><i class="fa-solid fa-circle-check" style={{color: '#00f048'}}></i></span> {copySuccess}
                    </div>)
                }                    

                <div className='checkout'>
                    <label>
                        <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
                            I saved my Secret Recovery Phrase
                    </label>
                </div>

                <div>
                    <Button onClick={handleContinueButton} disabled={!isChecked} >Continue</Button>  
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
    </div>
}