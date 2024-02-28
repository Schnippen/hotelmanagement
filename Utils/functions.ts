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
        return BookingData.map(({ checkin_date, checkout_date, id,booking_color }) => {
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
            const updatedReservationPeriods= state.map(({ id, reservation_dates,booking_color }) => {
            const periods = reservation_dates.map((date, index) => ({
                date,
                startingDay: index === 0,
                endingDay: index === reservation_dates.length - 1,
                color: booking_color?booking_color:randomHexColor
            }));
            console.log("createReservationPeriod:",{ id, periods })
            return { id, periods };
            });
            return updatedReservationPeriods
            //return setReservationPeriodsStates(updatedReservationPeriods);
        };


        //TODO typescript the periods
        //populates the calendar with objects created by function above to be rendered in Calendar Component
    export const populateCalendar = (reservationPeriods: any) => {
        console.log("populateCalendar() runs");
    
        const markedDates: Record<string, { periods: any[] }> = {}; // Initialize markedDates object
        // Iterate over each reservation period
        reservationPeriods.forEach(({ id, periods }:{id:string,periods:any}) => {
          // Iterate over each period in the reservation
          periods.forEach(({ date, startingDay, endingDay, color }:{date:string, startingDay:string, endingDay:string, color:string }) => {
            // Create or update the markedDates object with the current period
            markedDates[date] = {
              periods: [
                ...(markedDates[date]?.periods || []), // Keep existing periods for the date
                { startingDay, endingDay, color } // Add the new period
              ]
            };
          });
        });
        //console.log("populateCalendar():",markedDates)
        return markedDates
    };

          //this \/ is for creating transparent current date 
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

        const randomHexColor=getRandomHexColor()
        function getRandomHexColor() {
            // Generate random RGB values
            const r = Math.floor(Math.random() * 256); // Red component
            const g = Math.floor(Math.random() * 256); // Green component
            const b = Math.floor(Math.random() * 256); // Blue component
            
            // Convert RGB to hexadecimal format
            const hexColor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            
            return hexColor;
        }