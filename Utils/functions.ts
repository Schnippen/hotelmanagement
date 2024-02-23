import { TBooking } from "../Types/types";

export const changeDateFormat=(date:string)=>{
    let dateToChange =date
    const dateObject = new Date(dateToChange);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');
    const shortDate = `${year}-${month}-${day}`;
    //console.log(shortDate)
    return shortDate
    }

    export const updateDateFormat = (fetchedData:TBooking[]) => {
        return fetchedData.map(item => ({
          ...item,
          checkin_date: changeDateFormat(item.checkin_date),
          checkout_date: changeDateFormat(item.checkout_date)
        }));
      };


      export const calculateReservationDays = (BookingData: TBooking[]) => {
        return BookingData.map(({ checkin_date, checkout_date, id }) => {
          const checkinDate = new Date(checkin_date);
          const checkoutDate = new Date(checkout_date);
      
          // Calculate the difference in days
          const differenceInDays = Math.round((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24));
      
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
            reservation_dates: reservationDates
          };
        });
      };
      
     

      export const calculateReservationDays2=(BookingData:TBooking[])=>{

        let updatedData = updateDateFormat(BookingData)

        updatedData.map(({ checkin_date, checkout_date, id }) => {
          const checkinDate = new Date(checkin_date);
          const checkoutDate = new Date(checkout_date);
      
          // Calculate the difference in days miliseconds seconds minute hours
          const differenceInDays = Math.round((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24));
          // Create array of reservation days for caendar component to render
          const reservationDates: string[] = [];
        for (let i = 0; i <= differenceInDays; i++) {
          const currentDate = new Date(checkinDate);
          currentDate.setDate(checkinDate.getDate() + i);
          reservationDates.push(currentDate.toISOString().split('T')[0]);
        }
         /* console.log({
            ...{ checkin_date, checkout_date, id },
            difference_in_days: differenceInDays,
            reservation_dates: reservationDates
          })  */
          // Return the updated booking object
          return {
            ...{ checkin_date, checkout_date, id },
            difference_in_days: differenceInDays,
            reservation_dates: reservationDates
          };
        });
      };
     