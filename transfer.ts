import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmRawTransaction,
  PublicKey,
  sendAndConfirmTransaction} from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;
//DuLBUMSj4SwVLD4FPn8Fcc2569VmQZvckZ9NGR9EhdEX

if(!suppliedToPubkey){
  console.log(`Provide public key`);
  process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
console.log(`suppliedToPubkey : ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const transaction = new Transaction();;

const LAMPORTS_TO_SEND = 1000000000;

const sendSolInstructions = SystemProgram.transfer({
  fromPubkey:senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND
});

transaction.add(sendSolInstructions);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

const VAL_IN_SOL = LAMPORTS_TO_SEND*1e-9;
const VAL_IN_USD = VAL_IN_SOL*138.92;

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. \n val in sol - ${VAL_IN_SOL}, \n val in usd - ${VAL_IN_USD}`

);
console.log(`Transaction signature is ${signature}!`);
