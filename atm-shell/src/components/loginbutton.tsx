'use client'

import { sendGAEvent } from '@next/third-parties/google'

export default function LoginButton() {
  return (
        <button onClick={() => console.log("Button clicked")}>Click Me</button>
    );
}
