"use client"
import { generateMnemonic } from "bip39";
import { useState } from "react";
import './create-mnemonic.scss';


const Mnemonic = () => {
    const [mnemonic, setMnemonic] = useState("");

    return (
        <div className="mnemonic-component">
            <div className="seed-button">
                <button className="button" onClick={async function() {
                    const mn = await generateMnemonic();
                    setMnemonic(mn);
                }}>
                    Create seed phrase
                </button>
            </div>

            <div className="mnemonic">
                <div>{mnemonic}</div>
            </div>
        </div>
    )
}

export default Mnemonic;