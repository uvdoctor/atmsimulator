import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { sendGAEvent } from "@next/third-parties/google";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [attempts, setAttempts] = useState<number>(1);
  const [errorText, setErrorText] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const encryptKey = async (pin: string) => {
    // create key
    const key = Buffer.from(
      crypto.getRandomValues(new Uint8Array(32))
    ).toString("base64");
      
    // prepare the secret key for encryption
    const secretKey = await crypto.subtle.importKey(
      "raw",
      Buffer.from(key, "base64"),
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );

      const encodedPlaintext = new TextEncoder().encode(pin);
    
    // create a random 96-bit initialization vector (IV)
      const iv = crypto.getRandomValues(new Uint8Array(12));
      
    // encrypt the text with the secret key
    const ciphertext = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      secretKey,
      encodedPlaintext

      // encode the text to encrypt
    );

    // return the encrypted text "ciphertext" and the IV
    // encoded in base64
    return {
      ciphertext: Buffer.from(ciphertext).toString("base64"),
      iv: Buffer.from(iv).toString("base64"),
      key: key,
    };
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setButtonDisabled(true);
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const pin = formData.get("pin")?.toString();
    if (!pin) {
      setErrorText("No pin provided");
      return;
    }
    const { ciphertext, iv, key } = await encryptKey(pin);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, ciphertext, iv, key }),
    });

    handleAuthResponse(response);
  }

  const handleAuthResponse = (response: any) => {
    if (response.ok) {
      login();
      router.replace("/dashboard");
      sendGAEvent("event", "user-login", { value: "User logged in" });
    } else {
      if (attempts < 3) {
        setErrorText(`Incorrect pin. Remaining attempts: ${3 - attempts}`);
        setAttempts(attempts + 1);
        sendGAEvent("event", "user-invalid-pin", {
          value: "User entered incorrect pin",
        });
      } else {
        setErrorText(
          "Sorry, 3 attempts exhausted. Please contact the bank for further assistance"
        );
        sendGAEvent("event", "user-blocked", {
          value: "User blocked after 3 attempts",
        });
      }
      setButtonDisabled(false);
    }
  };

  return (
    <>
      <label>Please enter bank account pin</label>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="username" value="1" />
        <input
          type="text"
          name="pin"
          placeholder="Pin"
          required
          autoComplete="off"
          minLength={4}
        />
        <br />
        <label className="error">{errorText}</label>
        <br />
        <br />
        <button type="submit" disabled={buttonDisabled} className="button">
          Login
        </button>
      </form>
    </>
  );
}
