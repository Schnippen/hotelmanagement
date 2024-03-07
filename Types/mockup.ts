import { TBooking, TBookingUpdated } from "./types"

 let mockupData=[{"checkin_date": "2024-02-20T00:00:00+00:00", "checkout_date": "2024-02-25T00:00:00+00:00", "id": "3134840e-7e5e-4623-bc76-a57228f53d5f"}, {"checkin_date": "2024-03-01T00:00:00+00:00", "checkout_date": "2024-03-07T00:00:00+00:00", "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5"}, {"checkin_date": "2024-04-10T00:00:00+00:00", "checkout_date": "2024-04-15T00:00:00+00:00", "id": "9daa7c6e-804b-4e45-8c35-9351512bdf00"}]
  
  let mockupUpdatedData:TBooking[]= [{"checkin_date": "2024-02-20", "checkout_date": "2024-02-25", "id": "3134840e-7e5e-4623-bc76-a57228f53d5f"}, {"checkin_date": "2024-03-01", "checkout_date": "2024-03-07", "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5"}, {"checkin_date": "2024-04-10", "checkout_date": "2024-04-15", "id": "9daa7c6e-804b-4e45-8c35-9351512bdf00"}]
let mockupState:TBookingUpdated [] = [{"checkin_date": "2024-02-20", "checkout_date": "2024-02-25", "difference_in_days": 5, "id": "3134840e-7e5e-4623-bc76-a57228f53d5f", "reservation_dates": ["2024-02-20", "2024-02-21", "2024-02-22", "2024-02-23", "2024-02-24", "2024-02-25"]}, {"checkin_date": "2024-03-01", "checkout_date": "2024-03-07", "difference_in_days": 6, "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5", "reservation_dates": ["2024-03-01", "2024-03-02", "2024-03-03", "2024-03-04", "2024-03-05", "2024-03-06", "2024-03-07"]}, {"checkin_date": "2024-04-10", "checkout_date": "2024-04-15", "difference_in_days": 5, "id": "9daa7c6e-804b-4e45-8c35-9351512bdf00", "reservation_dates": ["2024-04-10", "2024-04-11", "2024-04-12", "2024-04-13", "2024-04-14", "2024-04-15"]}]

let reservationPeriodMockup = {"id": "9daa7c6e-804b-4e45-8c35-9351512bdf00", "periods": [{"color": "red", "date": "2024-02-10", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-02-11", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-12", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-13", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-14", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-15", "endingDay": true, "startingDay": false}]}

const populatingCalendarMOCKUP={
    '2024-02-10': { periods: [{ startingDay: true, endingDay: false, color: 'red' }] },
    '2024-02-11': { periods: [{ startingDay: false, endingDay: false, color: 'red' }] },
    '2024-02-12': { periods: [{ startingDay: false, endingDay: false, color: 'red' }] },
    '2024-02-13': { periods: [{ startingDay: false, endingDay: false, color: 'red' }] },
    '2024-02-14': { periods: [{ startingDay: false, endingDay: false, color: 'red' }] },
    '2024-02-15': { periods: [{ startingDay: false, endingDay: true, color: 'red' }] }
  }
  const BookingData= [
    {"checkin_date": "2024-02-20", "checkout_date": "2024-02-25", "difference_in_days": 5, "id": "3134840e-7e5e-4623-bc76-a57228f53d5f", "reservation_dates": ["2024-02-20", "2024-02-21", "2024-02-22", "2024-02-23", "2024-02-24", "2024-02-25"]}, 
  {"checkin_date": "2024-02-01", "checkout_date": "2024-02-07", "difference_in_days": 6, "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5", "reservation_dates": ["2024-02-01", "2024-02-02", "2024-02-03", "2024-02-04", "2024-02-05", "2024-02-06", "2024-02-07"]}, 
  {"checkin_date": "2024-02-10", "checkout_date": "2024-02-15", "difference_in_days": 5, "id": "9daa7c6e-804b-4e45-8c35-9351512bdf00", "reservation_dates": ["2024-02-10", "2024-02-11", "2024-02-12", "2024-02-13", "2024-02-14", "2024-02-15"]}]

  const state= [
    {"checkin_date": "2024-02-20", "checkout_date": "2024-02-25", "difference_in_days": 5, "id": "3134840e-7e5e-4623-bc76-a57228f53d5f", "reservation_dates": ["2024-02-20", "2024-02-21", "2024-02-22", "2024-02-23", "2024-02-24", "2024-02-25"]}, 
    {"checkin_date": "2024-02-01", "checkout_date": "2024-02-07", "difference_in_days": 6, "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5", "reservation_dates": ["2024-02-01", "2024-02-02", "2024-02-03", "2024-02-04", "2024-02-05", "2024-02-06", "2024-02-07"]}, 
    {"checkin_date": "2024-02-10", "checkout_date": "2024-02-15", "difference_in_days": 5, "id": "9daa7c6e-804b-4e45-8c35-9351512bdf00", "reservation_dates": ["2024-02-10", "2024-02-11", "2024-02-12", "2024-02-13", "2024-02-14", "2024-02-15"]}]

    const createReservationPeriod= {"id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5", "periods": [{"color": "red", "date": "2024-02-01", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-02-02", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-03", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-04", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-05", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-06", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-07", "endingDay": true, "startingDay": false}]}

     const updatedReservationPeriods = [
        //new
        {"id": "3134840e-7e5e-4623-bc76-a57228f53d5f", "periods": [{"color": "red", "date": "2024-02-20", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-02-21", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-22", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-23", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-24", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-25", "endingDay": true, "startingDay": false}]}, 
        //new
    {"id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5", "periods": [{"color": "red", "date": "2024-02-01", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-02-02", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-03", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-04", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-05", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-06", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-07", "endingDay": true, "startingDay": false}]}, 
    //new
    {"id": "9daa7c6e-804b-4e45-8c35-9351512bdf00", "periods": [{"color": "red", "date": "2024-02-10", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-02-11", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-12", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-13", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-14", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-15", "endingDay": true, "startingDay": false}]}]