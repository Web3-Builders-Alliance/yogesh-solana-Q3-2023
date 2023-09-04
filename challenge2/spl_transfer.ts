import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../prereq/wba-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Define our Mint address
const mint = new PublicKey("BeQqsAY16KUfkG4MV8HyFc5FWNLvUUagZbChJv13Nx5X");

// Recipient address
const to = new PublicKey("DaPQS3C3wACmJuWbLid1VXbhg8RNBh3RZmSVQC6qjNHt");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromAta = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toAta = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);

    const txHash = await transfer(connection, keypair, fromAta.address, toAta.address, keypair.publicKey, 1000000000);
    console.log(`Success! Check out your TX here:
https://explorer.solana.com/tx/${txHash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();