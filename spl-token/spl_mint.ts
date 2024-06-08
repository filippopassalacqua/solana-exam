import { Keypair, Connection, PublicKey, LAMPORTS_PER_SOL  } from "@solana/web3.js";
import  { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import wallet from '../wallet.json'

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
const connection = new Connection("https://api.devnet.solana.com", "finalized");


(async () =>{
  const mint = new PublicKey("6zsZGgSS3cLutznExGK1mU7WKMzrxormoqJzNmSQWHR5")

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey)


    await mintTo(
      connection,
      keypair, 
      mint,
      tokenAccount.address,
      keypair,
      50e6
    )

  console.log(`Minted 50 token to ${tokenAccount.address.toBase58()}`)
    
})()