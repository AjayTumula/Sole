
import Mnemonic from "./create-mnemonic";
import { SolanaWallet } from "./components/solana-wallet";
import { EthWallet } from "./components/ethereum-wallet";

export default function Home() {
  return (
   <main className="place-items-center p-20">
      <Mnemonic /> 
      <SolanaWallet />
      <EthWallet />
   </main>
  );
}
