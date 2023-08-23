import {
  bundlrStorage,
  keypairIdentity,
  Metaplex,
  toMetaplexFile,
} from "@metaplex-foundation/js";
import { Commitment, Connection, Keypair } from "@solana/web3.js";
import { readFile } from "fs/promises";
import wallet from "../prereq/wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair))
  .use(
    bundlrStorage({
      address: "https://devnet.bundlr.network",
      providerUrl: "https://api.devnet.solana.com",
      timeout: 60000,
    })
  );

(async () => {
  try {
    // const image = await readFile('./image/generug.png');
    // const metaPlexImage = toMetaplexFile(image, 'newRug.png');
    // const imgUri = await metaplex.storage().upload(metaPlexImage);
    // const { uri: metadataUri } = await metaplex.nfts().uploadMetadata({
    //     name:"ydQ3NFT",
    //     description:'New Rug',
    //     symbol:'ydRug',
    //     image:imgUri,
    //     attributes: [
    //       { color: 'blue', size: 'large' },
    //       { trait_type: 'empty', value: 'empty' },
    //       { trait_type: 'empty', value: 'empty' },
    //     ],
    //     properties: {
    //       files: [
    //         {
    //           type: "./image/generug.png",
    //           uri: imgUri,
    //         },
    //       ]
    //     },
    //     creators: [
    //       {
    //         address: keypair.publicKey.toBase58(),
    //         share: 100
    //       }
    //     ]
    // })
    const metadataUri =
      "https://arweave.net/Rl-Zwkpoihrg0nhsZaw4V9ANVQTTOrarSwgk8AerUfg";
    const { nft } = await metaplex.nfts().create({
      uri: metadataUri,
      name: "ydQ3NFT",
      sellerFeeBasisPoints: 10000,
    });

    console.log(`Success! Check out your mint TX here:
https://explorer.solana.com/tx/${nft.address}?cluster=devnet`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
