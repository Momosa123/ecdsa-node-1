import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [serverErrors, setServerErrors] = useState(false);
  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        serverErrors={serverErrors}
        setServerErrors={setServerErrors}
        message={message}
        setMessage={setMessage}
        publicKey={publicKey}
        setPublicKey={setPublicKey}
      />
      <Transfer
        setBalance={setBalance}
        publicKey={publicKey}
        setPublicKey={setPublicKey}
      />
    </div>
  );
}

export default App;
