import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

//const publicKey = new PublicKey("J3nDQQQza8sWydofLXoToZ7nJxqJ6eR9d61GjtFMYird");
const sharedKey = process.argv[2];
const publicKey = new PublicKey(sharedKey);
const connection = new Connection("https://api.mainnet-beta.solana.com/", "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSol = balanceInLamports/LAMPORTS_PER_SOL;

console.log(
  `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSol}!`
);
