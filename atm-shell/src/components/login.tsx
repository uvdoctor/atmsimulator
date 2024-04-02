import React from 'react';
import { sendGAEvent } from '@next/third-parties/google'
import LoginButton from './loginbutton';

export default function Login() {
    return (
        <div>
            <LoginButton />
        </div>
    );
}