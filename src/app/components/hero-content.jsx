
import './hero-content.scss';
import SoleImage from '../../assets/sole.png';
import Button from '@/ui/button/button';
import Image from 'next/image';
import { generateMnemonic } from 'bip39';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { Wallet, HDNodeWallet } from "ethers";

export function WalletHeroContent () {


    const [ mnemonic, setMnemonic ] = useState("");
    const [ createWallet, setCreateWallet] = useState(true);
    const [ openMnemonic, setOpenMnemonic] = useState(false);
    const [ isHovered, setIsHovered]  = useState(false);
    const [ copySuccess, setCopySuccess ] = useState('');
    const [ copyButton, setCopyButton ] = useState(true);
    const [ isChecked, setIsChecked ] = useState(false);
    const [ walletShow, setWalletShow ] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]); 
    const [privateAddress, setPrivateAddress] = useState([]); 
    const [publicKeys, setPublicKeys] = useState([]); 
    const [privateKeys, setPrivateKeys] = useState([]); 
    const [wallets, setWallets] = useState([]);

    
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

        localStorage.setItem('mnemonic', createMnemonic);

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


    const createSeed = async (blockchainType) => {
        const seed = await mnemonicToSeed(mnemonic);
    
        if (blockchainType === 'ethereum') {
            const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivationPath);
            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);
    
            // Update state and store in localStorage
            setCurrentIndex(currentIndex + 1);
            setAddresses([...addresses, wallet.address]);
            setPrivateAddress([...privateAddress, wallet.privateKey]);

            localStorage.setItem('Eth-Pub-Key', JSON.stringify(wallet.address))
    
            // Add new wallet to the wallets array
            setWallets((prevWallets) => [...prevWallets, { type: 'ethereum', address: wallet.address, privateKey }]);
    
        } else if (blockchainType === 'solana') {
            const derivationPath = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(derivationPath, seed.toString('hex')).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
    
            // Update state and store in localStorage
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
            setPrivateKeys([...privateKeys, bs58.encode(secret)]);

            localStorage.setItem('Sol-Pub-Key', JSON.stringify(keypair.publicKey.toBase58()))
    
            // Add new wallet to the wallets array
            setWallets((prevWallets) => [...prevWallets, { type: 'solana', publicKey: keypair.publicKey.toBase58(), privateKey: bs58.encode(secret) }]);
        }
    };
    

    const handleContinueButton = async () => {
       
        localStorage.setItem('mnemonicWords', JSON.stringify(wordsArray));

        // router.push('/wallets')
        setWalletShow(true);
        setOpenMnemonic(false);

      await createSeed('solana');
      await createSeed('ethereum')
    }

    const handleAddWallet = (walletType) => {
        if (walletType === 'solana') {
            createSeed('solana');
        } else if (walletType === 'ethereum') {
            createSeed('ethereum');
        }
    };

    const handleDeleteWallet = (index) => {
        const updatedWallets = [...wallets.slice(0, index), ...wallets.slice(index + 1)];
        setWallets(updatedWallets);
    
    
        // Update local storage for Solana and Ethereum wallets
        const solanaWallets = updatedWallets.filter(wallet => wallet.type === 'solana');
        const ethereumWallets = updatedWallets.filter(wallet => wallet.type === 'ethereum');
        
        localStorage.setItem('Sol-Pub-Key', JSON.stringify(solanaWallets.map(w => w.publicKey)));
        localStorage.setItem('Eth-Pub-Key', JSON.stringify(ethereumWallets.map(w => w.address)));
    };

    const handleDeleteAllWallets = () => {
        setWallets([]);
        localStorage.removeItem('Sol-Pub-Key');
        localStorage.removeItem('Eth-Pub-Key');

        setWalletShow(false);
        setIsChecked(false);
        setCreateWallet(true);
    };
   
    

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

    { walletShow &&  <div className='show-wallet'>

                        <div className='add-wallet-section'>
                            <div className='add-wallet'>
                                <div><h3>Add Wallet</h3></div>
                                <select className='drop-down' onChange={(e) => handleAddWallet(e.target.value)}>
                                    <option value="">Select Wallet Type</option>
                                    <option value="solana">Solana</option>
                                    <option value="ethereum">Ethereum</option>
                                </select>
                            </div>
                            <div className='clear-wallet-section'>
                                
                                    <div>
                                        <Button className='clear-wallet' onClick={handleDeleteAllWallets}>Clear Wallets</Button>
                                    </div>
                                
                            </div>
                        </div>


                        <div className='new-wallet'>
                            {wallets && wallets.map((wallet, index) => (
                                <div key={index} className={`type-wallet`}>
                                    <h2>Wallet {index + 1}</h2>
                                    <div className='keys'>
                                    {wallet.type === 'solana' ? (
                                        <>
                                            <div>
                                                <h2>{wallet.type.charAt(0).toUpperCase() + wallet.type.slice(1)} Wallet</h2>
                                                <h3>Public Key</h3>
                                                {wallet.publicKey}
                                            </div>
                                            <div>Private Key - {wallet.privateKey}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div>Eth - {wallet.address}</div>
                                            <div>Private Key - {wallet.privateKey}</div>
                                        </>
                                    )}
                                    </div>
                                    <button onClick={() => handleDeleteWallet(index)}>Delete Wallet</button>
                                </div>
                            ))}
                        </div>
                </div>
                }
        </div>
    </div>
}