import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { hashMessage } from "./hashMessage";
export function signMessage(msg, privateKey) {
  const hashedMessage = hashMessage(msg);
  const signature = secp256k1.sign(hashedMessage, privateKey);
  return signature;
}
