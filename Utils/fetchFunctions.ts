import {supabase} from '../Supabase/supabase';

export const fetchBookingsAndRooms = async ([later_date, earlier_date]: [
  string,
  string,
]) => {
  try {
    console.log('trying to fetch');
    // Fetch booking and room data simultaneously
    const [bookingResponse, roomResponse] = await Promise.all([
      supabase
        .from('booking')
        .select(
          'id,booking_room(room_id(*,room_class_id(*,id))),guest_id(first_name,last_name),booking_color,checkin_date,checkout_date',
        )
        .filter('checkin_date', 'lte', later_date)
        .filter('checkout_date', 'gte', earlier_date),
      supabase
        .from('room')
        .select(
          'id,room_number,room_class_id(class_name),floor_id(floor_number)',
        ),
    ]);
    const bookingError = bookingResponse.error;
    const roomError = roomResponse.error;
    if (bookingError) {
      throw new Error('Error fetching booking data: ' + bookingError.message);
    }
    if (roomError) {
      throw new Error('Error fetching room data: ' + roomError.message);
    }
    const booking = bookingResponse.data;
    const room = roomResponse.data;
    if (!booking || !room) {
      throw new Error('Booking or room data is missing.');
    }
    console.log('Bookings and rooms fetched successfully.');
    return {booking, room};
  } catch (error) {
    console.error('Error fetching bookings and rooms:', error);
    throw error;
  }
};
