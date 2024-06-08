import { Keypair, Connection, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";

//6Gyzh95iBHZBiPmQZ4pMdFnVuXTxebnhdq2EjgUHwhje
import wallet from "../wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";


const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const toKeygen = Keypair.generate()
const to = toKeygen.publicKey;

const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async() => {
  try {

  const mint = new PublicKey("6zsZGgSS3cLutznExGK1mU7WKMzrxormoqJzNmSQWHR5")

  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey)

  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    to)

    await transfer(
      connection,
      keypair,
      fromTokenAccount.address,
      toTokenAccount.address,
      keypair,
      50e6,
    )
    


  } catch (error) {
    console.log(error)
  }
})();