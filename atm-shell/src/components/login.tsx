import React from 'react';
import { sendGAEvent } from '@next/third-parties/google'

export default function Login() {
    return (
        <div>
            <button onClick={() => sendGAEvent({ event: 'loginClicked', value: 'login' })}>
                Login
            </button>
        </div>
    );
}