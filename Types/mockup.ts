import {TBooking, TBookingDetails, TBookingUpdated, TRoom} from './types';

let mockupData = [
  {
    checkin_date: '2024-02-20T00:00:00+00:00',
    checkout_date: '2024-02-25T00:00:00+00:00',
    id: '3134840e-7e5e-4623-bc76-a57228f53d5f',
  },
  {
    checkin_date: '2024-03-01T00:00:00+00:00',
    checkout_date: '2024-03-07T00:00:00+00:00',
    id: '4e39c081-6889-45ba-b02b-ba42e55bb5c5',
  },
  {
    checkin_date: '2024-04-10T00:00:00+00:00',
    checkout_date: '2024-04-15T00:00:00+00:00',
    id: '9daa7c6e-804b-4e45-8c35-9351512bdf00',
  },
];

let mockupUpdatedData: TBooking[] = [
  {
    checkin_date: '2024-02-20',
    checkout_date: '2024-02-25',
    id: '3134840e-7e5e-4623-bc76-a57228f53d5f',
  },
  {
    checkin_date: '2024-03-01',
    checkout_date: '2024-03-07',
    id: '4e39c081-6889-45ba-b02b-ba42e55bb5c5',
  },
  {
    checkin_date: '2024-04-10',
    checkout_date: '2024-04-15',
    id: '9daa7c6e-804b-4e45-8c35-9351512bdf00',
  },
];
let mockupState: TBookingUpdated[] = [
  {
    checkin_date: '2024-02-20',
    checkout_date: '2024-02-25',
    difference_in_days: 5,
    id: '3134840e-7e5e-4623-bc76-a57228f53d5f',
    reservation_dates: [
      '2024-02-20',
      '2024-02-21',
      '2024-02-22',
      '2024-02-23',
      '2024-02-24',
      '2024-02-25',
    ],
  },
  {
    checkin_date: '2024-03-01',
    checkout_date: '2024-03-07',
    difference_in_days: 6,
    id: '4e39c081-6889-45ba-b02b-ba42e55bb5c5',
    reservation_dates: [
      '2024-03-01',
      '2024-03-02',
      '2024-03-03',
      '2024-03-04',
      '2024-03-05',
      '2024-03-06',
      '2024-03-07',
    ],
  },
  {
    checkin_date: '2024-04-10',
    checkout_date: '2024-04-15',
    difference_in_days: 5,
    id: '9daa7c6e-804b-4e45-8c35-9351512bdf00',
    reservation_dates: [
      '2024-04-10',
      '2024-04-11',
      '2024-04-12',
      '2024-04-13',
      '2024-04-14',
      '2024-04-15',
    ],
  },
];

let reservationPeriodMockup = {
  id: '9daa7c6e-804b-4e45-8c35-9351512bdf00',
  periods: [
    {color: 'red', date: '2024-02-10', endingDay: false, startingDay: true},
    {color: 'red', date: '2024-02-11', endingDay: false, startingDay: false},
    {color: 'red', date: '2024-02-12', endingDay: false, startingDay: false},
    {color: 'red', date: '2024-02-13', endingDay: false, startingDay: false},
    {color: 'red', date: '2024-02-14', endingDay: false, startingDay: false},
    {color: 'red', date: '2024-02-15', endingDay: true, startingDay: false},
  ],
};

const populatingCalendarMOCKUP = {
  '2024-02-10': {
    periods: [{startingDay: true, endingDay: false, color: 'red'}],
  },
  '2024-02-11': {
    periods: [{startingDay: false, endingDay: false, color: 'red'}],
  },
  '2024-02-12': {
    periods: [{startingDay: false, endingDay: false, color: 'red'}],
  },
  '2024-02-13': {
    periods: [{startingDay: false, endingDay: false, color: 'red'}],
  },
  '2024-02-14': {
    periods: [{startingDay: false, endingDay: false, color: 'red'}],
  },
  '2024-02-15': {
    periods: [{startingDay: false, endingDay: true, color: 'red'}],
  },
};
const BookingData = [
  {
    checkin_date: '2024-02-20',
    checkout_date: '2024-02-25',
    difference_in_days: 5,
    id: '3134840e-7e5e-4623-bc76-a57228f53d5f',
    reservation_dates: [
      '2024-02-20',
      '2024-02-21',
      '2024-02-22',
      '2024-02-23',
      '2024-02-24',
      '2024-02-25',
    ],
  },
  {
    checkin_date: '2024-02-01',
    checkout_date: '2024-02-07',
    difference_in_days: 6,
    id: '4e39c081-6889-45ba-b02b-ba42e55bb5c5',
    reservation_dates: [
      '2024-02-01',
      '2024-02-02',
      '2024-02-03',
      '2024-02-04',
      '2024-02-05',
      '2024-02-06',
      '2024-02-07',
    ],
  },
  {
    checkin_date: '2024-02-10',
    checkout_date: '2024-02-15',
    difference_in_days: 5,
    id: '9daa7c6e-804b-4e45-8c35-9351512bdf00',
    reservation_dates: [
      '2024-02-10',
      '2024-02-11',
      '2024-02-12',
      '2024-02-13',
      '2024-02-14',
      '2024-02-15',
    ],
  },
];

const state = [
  {
    checkin_date: '2024-02-20',
    checkout_date: '2024-02-25',
    difference_in_days: 5,
    id: '3134840e-7e5e-4623-bc76-a57228f53d5f',
    reservation_dates: [
      '2024-02-20',
      '2024-02-21',
      '2024-02-22',
      '2024-02-23',
      '2024-02-24',
      '2024-02-25',
    ],
  },
  {
    checkin_date: '2024-02-01',
    checkout_date: '2024-02-07',
    difference_in_days: 6,
    id: '4e39c081-6889-45ba-b02b-ba42e55bb5c5',
    reservation_dates: [
      '2024-02-01',
      '2024-02-02',
      '2024-02-03',
      '2024-02-04',
      '2024-02-05',
      '2024-02-06',
      '2024-02-07',
    ],
  },
  {
    checkin_date: '2024-02-10',
    checkout_date: '2024-02-15',
    difference_in_days: 5,
    id: '9daa7c6e-804b-4e45-8c35-9351512bdf00',
    reservation_dates: [
      '2024-02-10',
      '2024-02-11',
      '2024-02-12',
      '2024-02-13',
      '2024-02-14',
      '2024-02-15',
    ],
  },
];

const createReservationPeriod = {
  id: '4e39c081-6889-45ba-b02b-ba42e55bb5c5',
  periods: [
    {color: 'red', date: '2024-02-01', endingDay: false, startingDay: true},
    {color: 'red', date: '2024-02-02', endingDay: false, startingDay: false},
    {color: 'red', date: '2024-02-03', endingDay: false, startingDay: false},
    {color: 'red', date: '2024-02-04', endingDay: false, startingDay: false},
    {color: 'red', date: '2024-02-05', endingDay: false, startingDay: false},
    {color: 'red', date: '2024-02-06', endingDay: false, startingDay: false},
    {color: 'red', date: '2024-02-07', endingDay: true, startingDay: false},
  ],
};

const updatedReservationPeriods = [
  //new
  {
    id: '3134840e-7e5e-4623-bc76-a57228f53d5f',
    periods: [
      {color: 'red', date: '2024-02-20', endingDay: false, startingDay: true},
      {color: 'red', date: '2024-02-21', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-22', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-23', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-24', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-25', endingDay: true, startingDay: false},
    ],
  },
  //new
  {
    id: '4e39c081-6889-45ba-b02b-ba42e55bb5c5',
    periods: [
      {color: 'red', date: '2024-02-01', endingDay: false, startingDay: true},
      {color: 'red', date: '2024-02-02', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-03', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-04', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-05', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-06', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-07', endingDay: true, startingDay: false},
    ],
  },
  //new
  {
    id: '9daa7c6e-804b-4e45-8c35-9351512bdf00',
    periods: [
      {color: 'red', date: '2024-02-10', endingDay: false, startingDay: true},
      {color: 'red', date: '2024-02-11', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-12', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-13', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-14', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-02-15', endingDay: true, startingDay: false},
    ],
  },
];

export const MOCKUPbookingDetailsFETCHdata = [
  {
    booking_amount: 600,
    booking_color: 'green',
    checkin_date: '2024-03-10T01:00:00+00:00',
    checkout_date: '2024-03-15T01:00:00+00:00',
    guest_id: '291296af-e887-4514-b941-e61865e9ec56',
    id: '9daa7c6e-804b-4e45-8c35-9351512bdf00',
    num_adults: 2,
    num_children: 2,
    payment_status_id: 3,
  },
];

let MockupbookingDetails: TBookingDetails[] = [
  {
    id: '9daa7c6e-804b-4e45-8c35-9351512bdf00',
    payment_status_id: 3,
    checkin_date: '2024-03-10T01:00:00+00:00',
    checkout_date: '2024-03-15T01:00:00+00:00',
    num_adults: 2,
    num_children: 2,
    booking_amount: 600,
    booking_color: 'green',
    payment_status: {
      payment_status_name: 'Cancelled',
    },
    booking_room: {
      room_id: {
        status_id: {
          status_name: 'Under Maintenance',
        },
      },
    },
    guest_id: {
      last_name: 'Powers',
      first_name: 'Austin',
    },
  },
];

let mockupRoomsData: TRoom[] = [
  {
    id: '4fac5959-62c8-41a8-855a-e149e4fc6c76',
    floor_id: {
      floor_number: '3',
    },
    room_class_id: {
      class_name: 'Deluxe',
    },
    status_id: {
      status_name: 'Occupied',
    },
    room_number: '2',
  },
  {
    id: '0fad24a2-035e-4d12-9964-9ba84b4373c2',
    floor_id: {
      floor_number: '5',
    },
    room_class_id: {
      class_name: 'Standard',
    },
    status_id: {
      status_name: 'Available',
    },
    room_number: '1',
  },
  {
    id: 'b79b8ae7-e19a-4485-8f03-4215b943aca6',
    floor_id: {
      floor_number: '1',
    },
    room_class_id: {
      class_name: 'Suite',
    },
    status_id: {
      status_name: 'Under Maintenance',
    },
    room_number: '3',
  },
];
let mockupRoomDetailsSceen = [
  {
    id: '0fad24a2-035e-4d12-9964-9ba84b4373c2',
    status_id: {
      status_name: 'Available',
    },
    floor_id: {
      floor_number: '2nd Floor',
    },
    room_class_id: {
      base_price: 100,
      class_name: 'Standard',
      room_class_feature: [
        {
          feature_id: {
            feature_name: 'Grill accessories',
          },
        },
        {
          feature_id: {
            feature_name: 'Kettle',
          },
        },
      ],
      room_class_bed_type: [
        {
          num_beds: 2,
          bed_type_id: {
            bed_type_name: 'Single',
          },
        },
      ],
    },
  },
];

const MOCKUP_AUTHsession = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsImtpZCI6IlYybU81RGcrYWVkM2xZUmMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzExMzgwMTU2LCJpYXQiOjE3MTEzNzY1NTYsImlzcyI6Imh0dHBzOi8vcWZiYWF2Z3RuY3BsbnZocm9udWMuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjgzYjM0M2QxLTMyMGEtNDdhYS05NGRiLTJmYmMyNmQ5YzY1YyIsImVtYWlsIjoiZXhhbXBsZUBlbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxMTM3NjU1Nn1dLCJzZXNzaW9uX2lkIjoiNzJkZGZmZTYtNmNiZi00YjBiLWFmYTQtOGY4MWVjZTdiZWJhIn0.Zx-T88sdcBtqBByRZ5lXd5n9X541XUuujh-4ojYcQA0',
  token_type: 'bearer',
  expires_in: 3600,
  expires_at: 1711380156,
  refresh_token: 'oZPf526W1nt5EIA1fgridQ',
  user: {
    id: '83b343d1-320a-47aa-94db-2fbc26d9c65c',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'example@email.com',
    email_confirmed_at: '2024-03-25T14:22:16.924603Z',
    phone: '',
    confirmed_at: '2024-03-25T14:22:16.924603Z',
    last_sign_in_at: '2024-03-25T14:22:36.083528542Z',
    app_metadata: {provider: 'email', providers: ['email']},
    user_metadata: {},
    identities: [
      {
        identity_id: '4177cf17-d89f-4c16-bca5-f3e22ca97968',
        id: '83b343d1-320a-47aa-94db-2fbc26d9c65c',
        user_id: '83b343d1-320a-47aa-94db-2fbc26d9c65c',
        identity_data: {
          email: 'example@email.com',
          email_verified: false,
          phone_verified: false,
          sub: '83b343d1-320a-47aa-94db-2fbc26d9c65c',
        },
        provider: 'email',
        last_sign_in_at: '2024-03-25T14:22:16.921699Z',
        created_at: '2024-03-25T14:22:16.921757Z',
        updated_at: '2024-03-25T14:22:16.921757Z',
        email: 'example@email.com',
      },
    ],
    created_at: '2024-03-25T14:22:16.905095Z',
    updated_at: '2024-03-25T14:22:36.086071Z',
  },
};

//TODO calendar theme
/*   theme={{
      backgroundColor: '#ffffff',
      calendarBackground: '#ffffff',
      textSectionTitleColor: '#b6c1cd',
      textSectionTitleDisabledColor: '#d9e1e8',
      selectedDayBackgroundColor: '#00adf5',
      selectedDayTextColor: '#ffffff',
      todayTextColor: '#00adf5',
      dayTextColor: '#2d4150',
      textDisabledColor: '#d9e1e8',
      dotColor: '#00adf5',
      selectedDotColor: '#ffffff',
      arrowColor: 'orange',
      disabledArrowColor: '#d9e1e8',
      monthTextColor: 'blue',
      indicatorColor: 'blue',
      textDayFontFamily: 'monospace',
      textMonthFontFamily: 'monospace',
      textDayHeaderFontFamily: 'monospace',
      textDayFontWeight: '300',
      textMonthFontWeight: 'bold',
      textDayHeaderFontWeight: '300',
      textDayFontSize: 16,
      textMonthFontSize: 16,
      textDayHeaderFontSize: 16
    }} */
/* async function signOut() {
  const {error} = await supabase.auth.signOut();
} */ //https://supabase.com/docs/guides/auth/sessions may be usefull
/* Admin:  RBAC

Full access to all features and data.
Can manage users, rooms, bookings, and other resources.
Can perform CRUD operations on all data entities.
Can configure system settings and permissions.
Front Desk Staff:

Access to booking management features.
Can view, create, update, and delete bookings.
Access to room status information (occupied, vacant, reserved).
Limited access to financial data (billing, payments).
Housekeeping:

Access to room status information.
Can update room status (cleaning, maintenance, inspection).
View room service requests and work orders.
Maintenance Staff:

Access to maintenance requests.
Can view, update, and close maintenance tickets.
Access to room status information for maintenance purposes.
Guest:

Limited access to self-service features.
Can view own bookings, check-in/check-out status.
Can request room service, maintenance, or other services.
Access to guest-facing features such as room service menu, amenities, and local information.
Manager:

Similar to Admin but with restricted permissions.
Can view financial reports, occupancy rates, and other analytics.
Can manage staff schedules, shifts, and assignments.
Can approve or reject special requests and discounts.
 */
