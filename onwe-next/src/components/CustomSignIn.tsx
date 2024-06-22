// components/CustomSignIn.tsx
import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";

const CustomSignIn: React.FC<{ switchToSignup: () => void }> = ({ switchToSignup }) => {
  const { signIn } = useSignIn();
  const [error, setError] = useState("");

  const signInWithGoogle = () =>
    signIn?.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/'
    });

  return (
    <div>
      <h2>Sign In</h2>
      {error && <p>{error}</p>}
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <p onClick={switchToSignup}>Do not have an account? Sign up</p>
    </div>
  );
};

export default CustomSignIn;
