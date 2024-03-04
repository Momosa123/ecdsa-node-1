import { useState } from "react";
import server from "./server";

function Transfer({ publicKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = setter => evt => setter(evt.target.value);
  const JOHN_PUBLIC_KEY =
    "028c99982a4e1f3fa57ae10075dca438ff0a9a481a422023063c2b57a381ae75f9";
  const KATIE_PUBLIC_KEY =
    "029350422f8f58509cc428cbccc86da64873da78bcb18b0be8b445f0d4d013a494";
  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: publicKey,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>Recipient</label>
      <select
        onChange={e => setRecipient(e.target.value)}
        value={recipient}
        name="recipient"
        id="recipient"
      >
        <option value="">--Please choose a recipient--</option>
        <option value={KATIE_PUBLIC_KEY}>
          Katie ({KATIE_PUBLIC_KEY.slice(-20)})
        </option>
        <option value={JOHN_PUBLIC_KEY}>
          John ({JOHN_PUBLIC_KEY.slice(-20)})
        </option>
      </select>
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
