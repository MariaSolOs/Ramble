//Helper function to ensure sorted timeslots                        
export const slotSort = (slot1, slot2) => {
    const from1 = slot1.split('-')[0];
    const from2 = slot2.split('-')[0];

    const hour1 = +from1.slice(0, from1.length - 2).replace(':30', '.5');
    const hour2 = +from2.slice(0, from2.length - 2).replace(':30', '.5');
    const time1 = from1.slice(from1.length - 2, from1.length);
    const time2 = from2.slice(from2.length - 2, from2.length);

    if(time1 === 'AM' && time2 === 'PM') { return -1; }
    if(time2 === 'AM' && time1 === 'PM') {
        if(hour1 === 12) { return -1; }
        return 1;
    }
    if(hour1 < hour2) { return -1; }
    if(hour2 < hour1) { return 1; }
    return 0;
}

//For having dynamic timeslots
export const getTimeSlots = (duration) => {
    const slots = [];
    for(let start = 8; (start + duration) <= 24; start += duration) {
        const end = (start + duration);
        const slot = { 
            from: { 
                hour: `${((start + 11) % 12 + 1)}`.replace('.5', ':30'),
                time: start >= 12 && start !== 24? 'PM' : 'AM'
            },
            to: { 
                hour: `${((end + 11) % 12 + 1)}`.replace('.5', ':30'),
                time: end >= 12 && end !== 24? 'PM' : 'AM'
            }
        }
        slots.push(slot);
    }
    return slots;
}