import { PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

// Eh5W4Md7NtPbFJ5h4aeccFKbTaKL9nzMV954x2pUFYCM
// const publickey = new PublicKey("Eh5W4Md7NtPbFJ5h4aeccFKbTaKL9nzMV954x2pUFYCM")

const suppliedPublicKey = process.argv[2]
//This line is used to speciy that the public key is taken in from the command line. 
//If it is not passed when the file is executed we throw an error and ask for it
if (!suppliedPublicKey) {
    throw new Error("Provide a public key ")
}

//Creates a new PublicKey object
const publickey = new PublicKey(suppliedPublicKey);

//tells if the address is valid by checking if it lies on the ed25519 curve
if (PublicKey.isOnCurve(publickey.toBytes()) == false) {
    console.log("Invalid wallet address")
}
else {
    const conn = new Connection("https://api.devnet.solana.com","confirmed")
    const lamportBalance = await conn.getBalance(publickey)
    const solBalance = lamportBalance/LAMPORTS_PER_SOL
    console.log(`Balance for ${publickey} is ${solBalance} SOL`)
}
