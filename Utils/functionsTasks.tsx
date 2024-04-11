import React from 'react';
import {Text} from '@rneui/themed';

export function dateDiffInDays(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  const timeLeftInDays = Math.floor((utc2 - utc1) / _MS_PER_DAY);
  if (timeLeftInDays === 0) {
    const timeDiff = b.getTime() - a.getTime();
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const isNegative = !!Math.sign(minutesLeft);
    //console.log('is NEgative:', isNegative);
    const timeLeftString = `${hoursLeft} hours and ${minutesLeft} minutes left`;
    const timeLeftStringOverdue = `${hoursLeft * -1} hours and ${
      minutesLeft * -1
    } minutes  overdue`;
    const result = isNegative ? timeLeftStringOverdue : timeLeftString;
    return <Text style={{color: isNegative ? '#f05d5d' : ''}}>{result}</Text>;
  } else if (-1 >= timeLeftInDays) {
    const timeLeftString = `${timeLeftInDays} days overdue`;
    return <Text style={{color: '#f05d5d'}}>{timeLeftString}</Text>;
  } else {
    const timeLeftString = `${timeLeftInDays} days`;
    return <Text>{timeLeftString}</Text>;
  }
}

export function formatDate(dateString: string) {
  const date = new Date(dateString); //TODO, make room for changing it to AM PM in settings
  const timeString = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', {month: 'short'});
  const year = date.getFullYear();
  const result = `${timeString}, ${day} ${month} ${year}`;
  return result;
}
