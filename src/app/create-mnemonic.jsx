"use client"
import { generateMnemonic } from "bip39";
import { useState } from "react";
import './create-mnemonic.scss';


const Mnemonic = () => {
    const [mnemonic, setMnemonic] = useState("");

    return (
        <div className="mnemonic-component">
        
            <button className="button" onClick={async function() {
                const mn = await generateMnemonic();
                setMnemonic(mn);
            }}>
                Create seed phrase
            </button>

            <div className="mnemonic">
                {/* <input type="text" value={mnemonic}></input> */}
                <div>{mnemonic}</div>
            </div>
        </div>
    )
}

export default Mnemonic;