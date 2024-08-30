
import './page.scss';
import Mnemonic from "./create-mnemonic";
import { SolanaWallet } from "./components/solana-wallet";
import { EthWallet } from "./components/ethereum-wallet";

export default function Home() {
  return (
   <div className="wallet-component">
      <Mnemonic /> 
      <SolanaWallet />
      <EthWallet />
   </div>
  );
}
