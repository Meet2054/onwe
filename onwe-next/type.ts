declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
    NEXT_PUBLIC_CLERK_FALLBACK_REDIRECT_URL: string;
    NEXT_PUBLIC_CLERK_FORCE_REDIRECT_URL: string;
    NEXT_PUBLIC_API_URL: string;
  }
}
