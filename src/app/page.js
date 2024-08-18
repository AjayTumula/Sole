import Image from "next/image";
import Mnemonic from "./create-mnemonic";
import { SolanaWallet } from "./components/solana-wallet";
import { EthWallet } from "./components/ethereum-wallet";

export default function Home() {
  return (
   <main>
      <Mnemonic /> 
      <SolanaWallet />
      <EthWallet />
   </main>
  );
}
