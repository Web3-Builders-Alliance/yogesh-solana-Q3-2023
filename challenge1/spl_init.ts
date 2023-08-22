import { createMint } from "@solana/spl-token";
import { Connection, Keypair } from "@solana/web3.js";
import wallet from "../prereq/wba-wallet.json";

// Create a devnet connection
const connection = new Connection("https://api.devnet.solana.com");
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

(async () => {
  try {
    const mintId = await createMint(
      connection,
      keypair,
      keypair.publicKey,
      null,
      6
    );
    console.log(mintId);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
