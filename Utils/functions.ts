import { TBooking, TBookingUpdated } from "../Types/types";

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
      
      export const createReservationPeriod = (state: TBookingUpdated[]) => {
        let color = 'red';
        return state.map(({ id, reservation_dates }) => {
          const periods = reservation_dates.map((date, index) => ({
            date,
            startingDay: index === 0,
            endingDay: index === reservation_dates.length - 1,
            color: color
          }));
          console.log("createReservationPeriod:",{ id, periods })
          return { id, periods };
        });
      };

    export const calculateCurrentDate=()=>{
        // Create a new Date object
        const currentDate = new Date();
        // Get the year, month, and day from the Date object
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const day = String(currentDate.getDate()).padStart(2, '0');
        // Format the date as "YYYY-MM-DD"
        const formattedDate = `${year}-${month}-${day}`;
        //console.log(formattedDate); 
        return formattedDate
    }