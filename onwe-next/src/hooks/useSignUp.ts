import { useState } from 'react';

interface SignUpParams {
  emailAddress: string;
  password: string;
  username: string;
}

export const useSignUp = () => {

  const create = async ({ emailAddress, password, username }: SignUpParams) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name:username, email: emailAddress, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };


  const attemptEmailAddressVerification = async ({ code,emailAddress }: { code: string, emailAddress:string }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verifyEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({code, emailAddress }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const data = await response.json();
      return { status: 'complete'};
    } catch (error) {
      throw error;
    }
  };

  return {
    signUp: { create, attemptEmailAddressVerification },
    // setActive: async ({ session }: { session: string }) => {
    //   // Custom logic to set the active session, e.g., storing it in localStorage or context
    //   localStorage.setItem('sessionId', session);
    // },    
  };
};
