// slices/eventsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  id: number;
  title: string;
  photos: string[];
  date: string;
  time: string;
  saved: boolean;
  remainder: boolean;
  description: string;
}

interface EventsState {
  events: Event[];
  selectedEvent: Event | null;
}
const initialState: EventsState = {
    events: [
      {
        id: 1,
        title: 'Tech Conference 2024',
        photos: ['https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg', 'https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg'],
        date: '2024-07-01',
        time: '09:00 AM',
        saved: true,
        remainder: false,
        description: 'An annual conference focusing on technology advancements and innovations.'
      },
      {
        id: 2,
        title: 'Art Exhibition',
        photos: ['https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg', 'https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg'],
        date: '2024-05-20',
        time: '02:00 PM',
        saved: false,
        remainder: false,
        description: 'A showcase of modern art from upcoming artists around the world.'
      },
      {
        id: 3,
        title: 'Music Festival',
        photos: ['https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg', 'https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg'],
        date: '2024-08-15',
        time: '06:00 PM',
        saved: false,
        remainder: false,
        description: 'A vibrant festival featuring live performances by various artists.'
      },
      {
        id: 4,
        title: 'Startup Pitch Day',
        photos: ['https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg', 'https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg'],
        date: '2024-06-10',
        time: '10:00 AM',
        saved: true,
        remainder: true,
        description: 'An event for startups to pitch their ideas to potential investors.'
      },
      {
        id: 5,
        title: 'Community Meetup',
        photos: ['https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg', 'https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg'],
        date: '2024-06-18',
        time: '11:00 AM',
        saved: false,
        remainder: true,
        description: 'A local meetup for community members to network and share ideas.'
      },
    ],
    selectedEvent: null,
  };
  
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    selectEvent: (state, action: PayloadAction<Event | null>) => {
      state.selectedEvent = action.payload;
    },
    filterEvents: (state, action: PayloadAction<{ filterType: string }>) => {
      const { filterType } = action.payload;
      const today = new Date().toISOString().split('T')[0];

      switch (filterType) {
        case 'past':
          state.events = initialState.events.filter(event => new Date(event.date) < new Date(today));
          break;
        case 'upcoming':
          state.events = initialState.events.filter(event => new Date(event.date) >= new Date(today));
          break;
        case 'saved':
          state.events = initialState.events.filter(event => event.saved);
          break;
        case 'remainder':
          state.events = initialState.events.filter(event => event.remainder);
          break;
        default:
          break;
      }
    },
  },
});

export const { setEvents, selectEvent, filterEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
