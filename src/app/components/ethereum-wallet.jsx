"use client"
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import './ethereum-wallet.scss';

export const EthWallet = ({mnemonic}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [privateAddress, setPrivateAddress] = useState([]);
     



    const createSeed = async() => {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
         const hdNode = HDNodeWallet.fromSeed(seed);
         const child = hdNode.derivePath(derivationPath);
         const privateKey = child.privateKey;
         const wallet = new Wallet(privateKey);
         setCurrentIndex(currentIndex + 1);
        setAddresses([...addresses, wallet.address]);
        setPrivateAddress([...privateAddress, wallet.privateKey]);
        console.log(wallet.privateKey)
    }

    return (
        <div className="eth-section">
            <button onClick={createSeed} className="eth-button">
                Add ETH wallet
            </button>

            <div className="eth-public-key">
                {addresses.map((pub, index) => <div key={index}>
                    <div>Eth - {pub} </div>
                </div>)}
            </div>

            <div className="eth-private-key">
                {privateAddress.map((priv, index) => <div key={index}>
                    <div>
                        Private -{priv}
                    </div>
                </div>)}
            </div>
        </div>
    )
}