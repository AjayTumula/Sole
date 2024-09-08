
import './hero-content.scss';
import SoleImage from '../../assets/sole.png';
import Button from '@/ui/button/button';
import Image from 'next/image';
import { generateMnemonic } from 'bip39';
import { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import WalletPage from '../wallets/page';
import { SeedContext, useSeed } from '@/app/context/SoleSeedContext';
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";

export function WalletHeroContent () {

    // const { createSolanaSeed } = useSeed();

    const [ mnemonic, setMnemonic ] = useState("");
    const [ createWallet, setCreateWallet] = useState(true);
    const [ openMnemonic, setOpenMnemonic] = useState(false);
    const [ isHovered, setIsHovered]  = useState(false);
    const [ copySuccess, setCopySuccess ] = useState('');
    const [ copyButton, setCopyButton ] = useState(true);
    const [ isChecked, setIsChecked ] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [privateKeys, setPrivateKeys] = useState([]);
    const [ wallets, setWallets ] = useState(false);
    
    const divRef = useRef(null);
    const router = useRouter();

    

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }
    
    

    const handleWallet = async (e) => {
        e.preventDefault();

        const createMnemonic = await generateMnemonic();
        setMnemonic(createMnemonic);

        setCreateWallet(false);
        setOpenMnemonic(true);
    }

    const wordsArray = mnemonic.split(' ');

    const copytoClipboard = () => {
        const textToCopy = divRef.current.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopySuccess('Copied')
        })
        setCopyButton(false);
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.value);
    }

 

    const createSeed = () => {
            const seed = mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey]); 
            setPrivateKeys([...privateKeys, bs58.encode(secret)])
    }


    const handleContinueButton = () => {
        createSeed();
        localStorage.setItem('mnemonicWords', JSON.stringify(wordsArray));
        // router.push('/wallets')
        setWallets(true);
        setOpenMnemonic(false);
    }

   
    

    return <div>
    <div className='wallet-hero-section'>
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
    </div>
    { wallets && 
                    <div className='sol'>
                    <div><button onClick={() => createSeed()}>Add Wallet</button></div>
                    <div className="sol-public-key">
                        <h3>Solana Wallet - {currentIndex}</h3>
                        <div className='sol-pub-key'>
                            <h4>Public Key - </h4>
                            <div>
                                {publicKeys.map((p, index) => <div key={index}>
                                {p.toBase58()}
                                </div>)}
                            </div>
                        </div>
                       
                        <div className='sol-private-key'>
                            <h4>Private Key - </h4>
                            {privateKeys.map((priv, index) => <div key={index}>
                                {priv}
                            </div>)}
                        </div>
                    
                    </div>
                    </div>
                }
        </div>
    </div>
}