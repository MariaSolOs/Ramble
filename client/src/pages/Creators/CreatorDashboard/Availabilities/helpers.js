export const getFormattedDate = (date) => {
    const format = {weekday: 'long', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString('en-US', format);
}

export const generateTimeSlots = (duration) => {
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
        slots.push(`${slot.from.hour}${slot.from.time}-${
        slot.to.hour}${slot.to.time}`);
    }
    return slots;
}