// types.d.ts
export interface Event {
    category?:string;
    clubId?:number;
    id: number;
    title: string;
    description: string,
    media: string[];
    link?: string;
    dateOfEvent: string;
    time: string;
    saved: boolean;
    remainder: boolean;
  }
  
 
