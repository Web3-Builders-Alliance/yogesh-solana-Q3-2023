import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import wallet from "../prereq/wba-wallet.json";

const connection = new Connection("https://api.devnet.solana.com");
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const mintPublicKey = new PublicKey(
  "BeQqsAY16KUfkG4MV8HyFc5FWNLvUUagZbChJv13Nx5X"
);
const token_decimals = 1_000_000n;

(async () => {
  try {
    const a_Token_Id = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mintPublicKey,
      keypair.publicKey
    );
    const txhash = await mintTo(connection,keypair,mintPublicKey, a_Token_Id.address,keypair,1000n * token_decimals);
    console.log(`Success! Check out your mint TX here:
https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
