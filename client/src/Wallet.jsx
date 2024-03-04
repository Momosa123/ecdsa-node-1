import server from "./server";
import { useEffect, useState } from "react";

import { signMessage } from "./utils/signMessage";
import { hashMessage } from "./utils/hashMessage";
function Wallet({
  serverErrors,
  setServerErrors,

  balance,
  setBalance,
  setPublicKey,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [buttonContent, setButtonContent] = useState("Show");
  const PRIVATE_KEY =
    "6b911fd31cef7c81d4d0adb1ab7fb822ed2539b0ad9ab18d7725ac88b29b718e";

  useEffect(() => {
    setButtonContent(showPrivateKey ? "Hide" : "Show");
  }, [showPrivateKey]);
  function handleButtonClick(e) {
    e.preventDefault();

    setShowPrivateKey(previousValue => !previousValue);
    // setButtonContent(previousValue => (previousValue ? "Hide" : "Show"));
  }
  async function onSubmit(e) {
    e.preventDefault();
    setServerErrors(false);
    if (PRIVATE_KEY) {
      const message = "test";

      const signature = signMessage(message, PRIVATE_KEY);
      const publicKey = signature
        .recoverPublicKey(hashMessage(message))
        .toHex();
      console.log(publicKey);
      setPublicKey(publicKey);
      const stringPublicKey = JSON.stringify(publicKey);
      try {
        const {
          data: { balance },
        } = await server.get(`balance/${stringPublicKey}`);
        setBalance(balance);
      } catch (error) {
        setServerErrors(true);
        setErrorMessage(error.response.data.message);
      }
    } else {
      setBalance(0);
    }
  }
  function onPrivateKeyChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
  }
  function onMessageChange(evt) {
    const message = evt.target.value;
    setMessage(message);
  }
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <form action="">
        <div>
          Wallet privateKey
          <p style={{ width: "350px", marginBottom: "0px" }}>
            {(showPrivateKey && PRIVATE_KEY) ||
              PRIVATE_KEY.split("").map(el => "*")}
          </p>
          <button
            style={{ width: "fit-content", marginBottom: "20px" }}
            onClick={handleButtonClick}
          >
            {buttonContent}
          </button>
        </div>

        <button type="submit" onClick={onSubmit}>
          View my wallet balance
        </button>
      </form>
      {!serverErrors && <div className="balance">Balance: {balance}</div>}
      {serverErrors && <div className="balance">{errorMessage}</div>}
    </div>
  );
}

export default Wallet;
