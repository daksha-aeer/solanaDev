import * as web3 from "@solana/web3.js"
import { Connection, SystemProgram } from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const sender = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection("https://api.devnet.solana.com/", "confirmed")
const LAMPORTS_TO_SEND = 1000000;
const rec = process.argv[2];

const receiver = new web3.PublicKey(rec);

const transaction = new web3.Transaction();

const sendSolInstructions = SystemProgram.transfer({
  fromPubkey:sender.publicKey,
  toPubkey: receiver,
  lamports: LAMPORTS_TO_SEND
});

transaction.add(sendSolInstructions);


const instruction = new web3.TransactionInstruction({
  keys: [
    {
      pubkey: receiver,
      isSigner: false,
      isWritable: true
    },
  ],
  programId: receiver
})

transaction.add(instruction)

const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [sender]
)

console.log(`transaction complete. signature is ${signature}`);