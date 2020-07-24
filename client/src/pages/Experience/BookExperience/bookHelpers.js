//Eg: '10AM-12PM' => ['10', 'AM', '12', 'PM']
export const getTimePieces = (time) => {
    const [from, to] = time.split('-');
    return [from.slice(0, from.length - 2),
            from.slice(from.length - 2, from.length),
            to.slice(0, to.length - 2),
            to.slice(to.length - 2, to.length)];
}

//To get a nice long date
export const getDatePieces = (date) => {
    const format = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const dateString = new Date(date).toLocaleDateString('en-US', format).replace(/,/g, '');
    return dateString.split(' ');
}

//Helper for getSlotsInfo
export const getWeekdayKey = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
                  'Thursday', 'Friday', 'Saturday'];
    return days[new Date(date).getDay()];
}
//For timeslots
export const getSlotsInfo = (slots, occurrences, expCapacity) => {
    const info = [];
    if(!slots) { //When the creator is not available on this weekday
        return null;
    }
    slots.forEach(slot => {
        const reserved = occurrences.filter(occ => occ.timeslot === slot);
        const spotsLeft = reserved.length > 0? reserved[0].spotsLeft :
                                               expCapacity;
        info.push({slot, spotsLeft});
    });
    return info;
}