import { useState } from "react";
import "./App.css";
import CryptoJS from "crypto-js";

const SECRET_KEY = "secret-key";

function App() {
  const [text, setText] = useState<string>("");
  const [screen, setScreen] = useState<string>("encrypt");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [encryptedText, setEncryptedText] = useState<string>("");
  const [decryptedText, setDecryptedText] = useState<string>("");

  const encrypt = () => {
    try {
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        SECRET_KEY
      ).toString();
      console.log("data in encrypt is : ", data);
      setEncryptedText(data);
      setErrorMessage("");
    } catch (error) {
      console.log("error in encrypt is : ", error);
      setErrorMessage("Encryption Failed: Please check your input");
    }
  };

  const decrypt = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(text, SECRET_KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log("decryptedData in decrypt is : ", decryptedData);
      setDecryptedText(decryptedData);
      setErrorMessage("");
    } catch (error) {
      console.log("error in decrypt is : ", error);
      setErrorMessage("Decryption Failed: Please check your input");
    }
  };

  const switchScreen = (type: string) => {
    setText("");
    setEncryptedText("");
    setDecryptedText("");
    setErrorMessage("");
    setScreen(type);
  };

  const handleClick = () => {
    if (!text) {
      setErrorMessage("Please enter some text");
      return;
    }

    if (screen === "encrypt") {
      encrypt();
    } else {
      decrypt();
    }
  };
  return (
    <div className="container">
      <div>
        <button
          className={`btn btn-left ${screen === "encrypt" ? "active" : ""}`}
          onClick={() => switchScreen("encrypt")}
        >
          Encrypt
        </button>
        <button
          className={`btn btn-right ${screen === "decrypt" ? "active" : ""}`}
          onClick={() => switchScreen("decrypt")}
        >
          Decrypt
        </button>
      </div>
      <div className="card">
        <textarea
          style={{ color: "red" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          placeholder={
            screen === "encrypt"
              ? "Enter text to encrypt"
              : "Enter encrypted data to decrypt"
          }
        />

        {errorMessage && <div className="error">{errorMessage}</div>}

        <button
          className={`btn submit-btn ${
            screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"
          }`}
          onClick={handleClick}
        >
          {screen === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>

        {encryptedText || decryptedText ? (
          <div className="content">
            <label>
              {screen === "encrypt" ? "ENCRYPTED" : "Decrypted"} DATA
            </label>
            <p>{screen === "encrypt" ? encryptedText : decryptedText}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
