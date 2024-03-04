const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { parse, stringify, toJSON, fromJSON } = require("flatted");

app.use(cors());
app.use(express.json());
const keys = {
  "23063c2b57a381ae75f9": "0x1",
  "0be8b445f0d4d013a494": "0x2",
  "2ea4918502f3792c5b35": "0x3",
};
const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
};

app.get("/balance/:stringPublicKey", (req, res) => {
  const { stringPublicKey } = req.params;
  const publicKey = JSON.parse(stringPublicKey);
  const slicePublicKey = publicKey.slice(-20);

  if (keys[slicePublicKey]) {
    const address = keys[slicePublicKey];
    const balance = balances[address] || 0;
    res.send({ balance });
  } else {
    res.status(400).send({ message: "Private key not good!" });
  }
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;
  const senderAddress = sender.slice(-20);
  const recipientAddress = recipient.slice(-20);
  const senderBalanceAddress = keys[senderAddress];
  const recipientBalanceAddress = keys[recipientAddress];
  console.log(balances[senderBalanceAddress]);

  setInitialBalance(senderBalanceAddress);
  setInitialBalance(recipientBalanceAddress);
  if (balances[senderBalanceAddress] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[senderBalanceAddress] -= amount;
    balances[recipientBalanceAddress] += amount;
    res.send({ balance: balances[senderBalanceAddress] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
