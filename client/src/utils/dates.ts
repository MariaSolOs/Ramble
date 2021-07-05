import type { DateTime } from 'luxon';

/**
 * Returns the time and meridiem of the input time.
 * 
 * @example 
 * // Returns ['4', 'AM']
 * getTimePieces(DateTime.fromISO('2021-07-26T04:00:00.000+00:00Z'))
 * // Returns ['8:30', 'AM']
 * getTimePieces(DateTime.fromISO('2021-07-26T08:30:00.000+00:00Z'))
 * 
 * @param time - DateTime object
 * @returns String array with the time and meridiem
 */
export const getTimePieces = (time: DateTime) => {
    const hours = time.toFormat('h');
    const minutes = time.toFormat('mm');
    const meridiem = time.toFormat('a');

    const formattedTime = minutes === '00' ? hours : `${hours}:${minutes}`;
    return [formattedTime, meridiem];
}