// slices/eventsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Event {
  id: number;
  title: string;
  subtitle: string;
  photo: string;
  date: string;
  time: string;
  saved: boolean;
  remainder: boolean;
  description: string;
  bg?: string;
}

interface EventsState {
  events: Event[];
  selectedEvent: Event | null;
}
const initialState: EventsState = {
  events: [
    {
      id: 1,
      title: "Tech Conference",
      subtitle:"GDSC Event",
      photo:
        "https://s3-alpha-sig.figma.com/img/4cd8/e220/ddd169e762b3b25fdc70c413d229c963?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CcQqHFF~fVJcDq92kyfTGkVXPN1gjBz6BZgVhT7C9Gy67jGKk1h4pfLyNUKd2TIaxnAN4nQbsLGGIlOv3eve4ryCkGkfwJ5Ao3Ef7pvOlucMO2~gS5FQmODLPtzbmkZOzahRqHBKXmX6tigZYWhtjvkhYBxihtNAnqbqPLKw8xfiRkXPVI2Ij10rKJ9MQKCMFDGmUeFe2w1jZaj-zKwVJmFP3NT0hC1SHM0ZFIUB3FFlKPfsvcz7FcZMuBHYxQY-k9yBh0Lg7w4w44fzeHhJbYb5LGIjMSznN4OvS2CbmPDq-a-K~eYpidRAOLYSpUFe8thwimfeGWNzanoG0fntcQ__",
      date: "2024-07-01",
      time: "09:00 AM",
      saved: true,
      remainder: false,
      description:
        "An annual conference focusing on technology advancements and innovations",
      bg: "f13ef3",
    },
    {
      id: 2,
      title: "Art Exhibition",
      subtitle:"GDSC Event",
      photo:
        "https://s3-alpha-sig.figma.com/img/4cd8/e220/ddd169e762b3b25fdc70c413d229c963?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CcQqHFF~fVJcDq92kyfTGkVXPN1gjBz6BZgVhT7C9Gy67jGKk1h4pfLyNUKd2TIaxnAN4nQbsLGGIlOv3eve4ryCkGkfwJ5Ao3Ef7pvOlucMO2~gS5FQmODLPtzbmkZOzahRqHBKXmX6tigZYWhtjvkhYBxihtNAnqbqPLKw8xfiRkXPVI2Ij10rKJ9MQKCMFDGmUeFe2w1jZaj-zKwVJmFP3NT0hC1SHM0ZFIUB3FFlKPfsvcz7FcZMuBHYxQY-k9yBh0Lg7w4w44fzeHhJbYb5LGIjMSznN4OvS2CbmPDq-a-K~eYpidRAOLYSpUFe8thwimfeGWNzanoG0fntcQ__",
      date: "2024-07-01",
      time: "02:00 PM",
      saved: false,
      remainder: false,
      description:
        "A showcase of modern art from upcoming artists around the world.",
    },
    {
      id: 3,
      title: "Music Festival",
      subtitle:"GDSC Event",
      photo: "https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg",
      date: "2024-08-18",
      time: "06:00 PM",
      saved: false,
      remainder: false,
      description:
        "A vibrant festival featuring live performances by various artists.",
    },
    {
      id: 4,
      title: "Startup Pitch Day",
      subtitle:"GDSC Event",
      photo: "https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg",
      date: "2024-07-10",
      time: "10:00 AM",
      saved: true,
      remainder: true,
      description:
        "An event for startups to pitch their ideas to potential investors.",
    },
    {
      id: 5,
      title: "Community Meetup",
      subtitle:"GDSC Event",
      photo: "https://i1.sndcdn.com/artworks-000521624880-pf34mu-t500x500.jpg",
      date: "2024-09-18",
      time: "11:00 AM",
      saved: false,
      remainder: true,
      description:
        "A local meetup for community members to network and share ideas.",
    },
  ],
  selectedEvent: null,
};

const eventsSlice = createSlice({
  name: "events",
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
      const today = new Date().toISOString().split("T")[0];

      switch (filterType) {
        case "past":
          state.events = initialState.events.filter(
            (event) => new Date(event.date) < new Date(today)
          );
          break;
        case "upcoming":
          state.events = initialState.events.filter(
            (event) => new Date(event.date) >= new Date(today)
          );
          break;
        // case 'saved':
        //   state.events = initialState.events.filter(event => event.saved);
        //   break;
        case "remainder":
          state.events = initialState.events.filter((event) => event.remainder);
          break;
        default:
          break;
      }
    },
  },
});

export const { setEvents, selectEvent, filterEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
