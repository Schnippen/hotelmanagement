// Screens
export type StackTypes = {
  HomeScreen: undefined;
  CalendarScreen: undefined;
};

// Fetching data
export interface TBooking {
  id: string;
  guest_id?: {
    last_name: string | undefined;
    first_name: string | undefined;
  };
  payment_status_id?: number;
  checkin_date: string;
  checkout_date: string;
  num_adults?: number;
  num_children?: number;
  booking_amount?: number;
  booking_color?: string; // Color of the booking in calendar
}
export interface periods {
  date: string;
  startingDay: boolean;
  endingDay: boolean;
  color: string;
}

//used in calendarScreen
export type TBookingUpdated = TBooking & {
  difference_in_days?: number;
  reservation_dates: string[];
  reservation_period?: periods[];
};

export type TCalendarBooking = {
  id: string;
  periods: {
    color: string;
    date: string;
    endingDay: boolean;
    startingDay: boolean;
  }[];
}[];

//used in BookingDetailsScreen
export type TBookingDetails = TBooking & {
  guest_id: {
    last_name: string;
    first_name: string;
  };
  payment_status: {
    id?: number;
    payment_status_name: string;
  };
  booking_room: {
    room_id: {
      status_id: {
        status_name: string;
      };
    };
  };
};

export interface TRoom {
  id: string;
  floor_id: {
    floor_number: string;
  };
  room_class_id: {
    class_name: string;
  };
  status_id: {
    status_name: string;
  };
  room_number: string;
}
export type TselectedDatesOnCalendar = {
  startingDate: string | null;
  endingDate: string | null;
};

export interface TRoomDetailsComponentFull {
  id: string;
  status_id: {
    status_name: string;
  };
  floor_id: {
    floor_number: string;
  };
  room_class_id: {
    base_price: number;
    class_name: string;
    room_class_feature: {
      feature_id: {
        feature_name: string;
      };
    }[];
    room_class_bed_type: {
      num_beds: number;
      bed_type_id: {
        bed_type_name: string;
      };
    }[];
  };
}

//BookingChartScreen
export interface TBookingRoom {
  room_id: {
    id: string;
    floor_id: number;
    status_id: number;
    room_number: string;
    room_class_id: {
      id: number;
      base_price: number;
      class_name: string;
    };
  };
}

export interface Guest {
  last_name: string;
  first_name: string;
}

export interface TBookingChart {
  id: string;
  booking_color: string;
  checkin_date: string;
  checkout_date: string;
  booking_room: TBookingRoom;
  guest_id: Guest;
}
export interface TRoomFetch {
  id: string;
  room_number: string;
  room_class_id: {
    class_name: string;
  };
  floor_id: {
    floor_number: string;
  };
}
export type TBookingObject = {day: string; bookingID: string | null} | string[];

export interface TRoomBookings {
  [roomNumber: string]: TBookingObject[];
}

export type TBookingGrid<T extends string> = {
  [K in T]: TRoomBookings;
};
type TDateStrings = string[];
