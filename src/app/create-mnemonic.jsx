"use client"
import { generateMnemonic } from "bip39";
import { useState } from "react";


const Mnemonic = () => {
    const [mnemonic, setMnemonic] = useState("");
    return (
        <div>
        <input type="text" value={mnemonic}></input>
            <button onClick={async function() {
                const mn = await generateMnemonic();
                setMnemonic(mn);
            }}>
                Create seed phrase
            </button>
        </div>
    )
}

export default Mnemonic;