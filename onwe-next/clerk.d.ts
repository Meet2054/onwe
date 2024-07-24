
type ServerGetToken = (options?: ServerGetTokenOptions) => Promise<string | null>;
// clerk.d.ts
interface ClerkSession {
  getToken({ template }: { template: string }): Promise<string>;
  // Add other session methods and properties as needed
}

interface Clerk {
  session: ClerkSession;
  // Add other Clerk properties and methods as needed
}

declare global {
  interface Window {
    Clerk: Clerk;
  }
}

export {}; // This ensures the file is a module and the global declarations are applied
