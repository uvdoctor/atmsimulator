import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from "@/context/AuthContext";
import { sendGAEvent } from "@next/third-parties/google";

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [attempts, setAttempts] = useState<number>(1);
    const [errorText, setErrorText] = useState<string>("");
 
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    
        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
        const pin = formData.get('pin')
    
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, pin }),
        });
    
        handleAuthResponse(response);
    }

    const handleAuthResponse = (response: any) => {
        if (response.ok) {
            login();
            router.replace('/dashboard');
            sendGAEvent("event", "user-login", { value: "User logged in" });
        } else {
            if (attempts < 3) {
                setErrorText(`Incorrect pin. Remaining attempts: ${3 - attempts}`);
                setAttempts(attempts + 1);
                sendGAEvent("event", "user-invalid-pin", { value: "User entered incorrect pin" });
            } else {
                setErrorText("Sorry, 3 attempts exhausted. Please contact the bank for further assistance");
                sendGAEvent("event", "user-blocked", { value: "User blocked after 3 attempts" });
            }
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="username" value="1"  />
                <input type="text" name="pin" placeholder="Pin" required autoComplete="off" />
                <p><button type="submit">Login</button></p>
            </form>
            <p>{errorText}</p>
        </div>
    );
}
