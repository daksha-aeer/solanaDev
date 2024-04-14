import "dotenv/config"

import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";

const k = Keypair.generate();
console.log(k.publicKey.toBase58());

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log("✅ Finished! We've loaded our secret key securely, using an env file!");

