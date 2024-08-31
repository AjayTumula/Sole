"use client"

import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import './solana-wallet.scss';  


export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [privateKeys, setPrivateKeys] = useState([]);

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

    return <div className="solana-section">
        <button onClick={createSeed}>
            Add Solana wallet
        </button>

        <div className="sol-public-key">
            {publicKeys.map((p, index) => <div key={index}>
                {p.toBase58()}
            </div>)}
        </div>

        <div>
            {privateKeys.map((priv, index) => <div key={index}>
                {priv}
            </div>)}
        </div>
    </div>
}