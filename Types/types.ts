
// Screens
export type StackTypes= {
    HomeScreen: undefined;
    CalendarScreen:undefined;
  };
  


// Fetching data
export interface TBooking {
  id: string;
  guest_id?: string; 
  payment_status_id?: number;
  checkin_date: string; 
  checkout_date: string;
  num_adults?: number; 
  num_children?: number; 
  booking_amount?: number; 
}
export interface periods {
  date: string;
  startingDay: boolean;
  endingDay: boolean;
  color: string;
}


export type TBookingUpdated = TBooking & { difference_in_days?: number; reservation_dates: string[];reservation_period?:periods[] };
  