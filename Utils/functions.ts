import {
  TBooking,
  TBookingChart,
  TBookingGrid,
  TBookingUpdated,
  TRoomFetch,
} from '../Types/types';

export const changeDateFormat = (date: string) => {
  let dateToChange = date;
  const dateObject = new Date(dateToChange);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's zero-based
  const day = String(dateObject.getDate()).padStart(2, '0');
  const shortDate = `${year}-${month}-${day}`;
  //console.log(shortDate)
  return shortDate;
};

export const updateDateFormat = (fetchedData: TBooking[]) => {
  return fetchedData.map(item => ({
    ...item,
    checkin_date: changeDateFormat(item.checkin_date),
    checkout_date: changeDateFormat(item.checkout_date),
  }));
};

export const calculateReservationDays = (BookingData: TBooking[]) => {
  return BookingData.map(({checkin_date, checkout_date, id, booking_color}) => {
    const checkinDate = new Date(checkin_date);
    const checkoutDate = new Date(checkout_date);

    // Calculate the difference in days
    const differenceInDays = Math.round(
      (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Create array of reservation days for calendar component to render
    const reservationDates: string[] = [];
    for (let i = 0; i <= differenceInDays; i++) {
      const currentDate = new Date(checkinDate);
      currentDate.setDate(checkinDate.getDate() + i);
      reservationDates.push(currentDate.toISOString().split('T')[0]);
    }

    // Return the updated booking object
    return {
      id,
      checkin_date,
      checkout_date,
      difference_in_days: differenceInDays,
      reservation_dates: reservationDates,
      booking_color,
    };
  });
};

//TODO
//create object for bookings than can be later interpreted and rendered in Caendnar component
//add color argumenr, export that to function in futures
export const createReservationPeriod = (state: TBookingUpdated[]) => {
  //let color = 'red';
  const updatedReservationPeriods = state.map(
    ({id, reservation_dates, booking_color}) => {
      const periods = reservation_dates.map((date, index) => ({
        date,
        startingDay: index === 0,
        endingDay: index === reservation_dates.length - 1,
        color: booking_color ? booking_color : randomHexColor,
      }));
      console.log('createReservationPeriod:', {id, periods});
      return {id, periods};
    },
  );
  return updatedReservationPeriods;
  //return setReservationPeriodsStates(updatedReservationPeriods);
};

//TODO typescript the periods
//populates the calendar with objects created by function above to be rendered in Calendar Component
export const populateCalendar = (reservationPeriods: any) => {
  console.log('populateCalendar() runs');

  const markedDates: Record<string, {periods: any[]}> = {}; // Initialize markedDates object
  // Iterate over each reservation period
  reservationPeriods.forEach(({id, periods}: {id: string; periods: any}) => {
    // Iterate over each period in the reservation
    periods.forEach(
      ({
        date,
        startingDay,
        endingDay,
        color,
      }: {
        date: string;
        startingDay: string;
        endingDay: string;
        color: string;
      }) => {
        // Create or update the markedDates object with the current period
        markedDates[date] = {
          periods: [
            ...(markedDates[date]?.periods || []), // Keep existing periods for the date
            {startingDay, endingDay, color}, // Add the new period
          ],
        };
      },
    );
  });
  //console.log("populateCalendar():",markedDates)
  return markedDates;
};

//this \/ is for creating transparent current date
export const calculateCurrentDate = () => {
  // Create a new Date object
  const currentDate = new Date();
  // Get the year, month, and day from the Date object
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
  const day = String(currentDate.getDate()).padStart(2, '0');
  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;
  //console.log(formattedDate);
  return formattedDate;
};

const randomHexColor = getRandomHexColor();
function getRandomHexColor() {
  // Generate random RGB values
  const r = Math.floor(Math.random() * 256); // Red component
  const g = Math.floor(Math.random() * 256); // Green component
  const b = Math.floor(Math.random() * 256); // Blue component

  // Convert RGB to hexadecimal format
  const hexColor =
    '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  return hexColor;
}

export const subtractDates = (
  currentDateString: string,
  endDateString: string,
) => {
  // Assuming startDateString and endDateString are in the format "YYYY-MM-DD"
  // Parse the date strings into Date objects
  const startDate = new Date(currentDateString);
  const endDate = new Date(endDateString);
  // Convert the dates to milliseconds
  const startDateMilliseconds = startDate.getTime();
  const endDateMilliseconds = endDate.getTime();
  // Calculate the difference in milliseconds
  const differenceMilliseconds = endDateMilliseconds - startDateMilliseconds;
  // Convert milliseconds to days
  const differenceDays = differenceMilliseconds / (1000 * 60 * 60 * 24);
  //console.log(differenceDays); // Output the difference in days

  //TODO language change in future
  const result =
    differenceDays === 1
      ? 'Tommorrow'
      : differenceDays > 1
      ? differenceDays + ' days in the future'
      : differenceDays === 0
      ? 'Today'
      : -differenceDays + ' days ago';
  return result;
};

export const subtractDatesForBookingCalendar = (
  startingDate: string,
  endDateString: string,
) => {
  // Assuming startDateString and endDateString are in the format "YYYY-MM-DD"
  // Parse the date strings into Date objects
  const startDate = new Date(startingDate);
  const endDate = new Date(endDateString);
  // Convert the dates to milliseconds
  const startDateMilliseconds = startDate.getTime();
  const endDateMilliseconds = endDate.getTime();
  // Calculate the difference in milliseconds
  const differenceMilliseconds = endDateMilliseconds - startDateMilliseconds;
  // Convert milliseconds to days
  const differenceDays = differenceMilliseconds / (1000 * 60 * 60 * 24);
  //console.log(differenceDays); // Output the difference in days
  //console.log("subtractDatesForBookingCalendar():",differenceDays)
  return differenceDays;
};

export const getDayInfo = (dateString: string) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Satur'];
  const monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(dateString);
  const dayIndex = date.getDay();
  const monthIndex = date.getMonth();
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  const dayName = daysOfWeek[dayIndex];
  const monthName = monthsOfYear[monthIndex];

  const result = {
    dayName,
    monthName,
    dayNumber,
    year,
  };

  return result;
};

//TODO work on objects, i am sissy xD
export const flattenObj = (ob: Record<string, any> | Record<string, any>[]) => {
  // If ob is an array, take the first element
  if (Array.isArray(ob)) {
    ob = ob[0];
  }

  let result: {[key: string]: any} = {};

  // Type guard to check if ob is an object
  if (typeof ob === 'object' && ob !== null && !Array.isArray(ob)) {
    for (const key in ob) {
      if (Object.prototype.hasOwnProperty.call(ob, key)) {
        const value = ob[key];
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          const flattened = flattenObj(value);
          for (const nestedKey in flattened) {
            result[`${key}.${nestedKey}`] = flattened[nestedKey];
          }
        } else {
          result[key] = value;
        }
      }
    }
  }
  //console.log("flattenObj()",JSON.stringify(result,null,2))
  return result;
};

export function organizeBookingsIntoGrid(
  bookings: TBookingChart[],
  rooms: TRoomFetch[],
  startDate: Date,
  endDate: Date,
) {
  const bookingGrid: TBookingGrid<string> = {};
  const dates: Array<Date> = [];
  const currentDate = new Date(startDate);
  // Iterate through each day within the date range
  while (currentDate <= endDate) {
    // Add the current date to the array of dates
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }
  if (!bookings || !rooms) {
    throw new Error('Bookings or rooms are null');
  }
  // Initialize the booking grid with empty arrays for each room type and room number
  rooms.forEach(room => {
    const roomType = room.room_class_id.class_name;
    if (!bookingGrid[roomType]) {
      bookingGrid[roomType] = {};
    }
    bookingGrid[roomType][room.room_number] = [];
  });

  // Populate the booking grid with booking IDs
  bookings.forEach(booking => {
    const roomType = booking.booking_room.room_id.room_class_id.class_name;
    const roomNumber = booking.booking_room.room_id.room_number;
    const checkinDate = new Date(booking.checkin_date);
    const checkoutDate = new Date(booking.checkout_date);

    // Check if the booking falls within the date range
    if (checkinDate <= endDate && checkoutDate >= startDate) {
      // Iterate over dates and add the booking object to the corresponding room and date
      dates.forEach(date => {
        if (date) {
          const bookingObject = {
            day: date.toISOString(),
            bookingID:
              date >= checkinDate && date <= checkoutDate ? booking.id : null,
          }; // Convert date to ISO string format
          bookingGrid[roomType][roomNumber].push(bookingObject);
        }
      });
    }
  });

  // Return the booking grid and dates
  console.log(JSON.stringify(bookingGrid), dates);
  return {bookingGrid, dates};
}
