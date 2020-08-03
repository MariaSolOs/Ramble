//Eg: '10AM-12PM' => ['10', 'AM', '12', 'PM']
export const getTimePieces = (time) => {
    const [from, to] = time.split('-');
    return [from.slice(0, from.length - 2),
            from.slice(from.length - 2, from.length),
            to.slice(0, to.length - 2),
            to.slice(to.length - 2, to.length)];
}

//For nicely formatting date and time
export const getFormattedDate = (date) => {
    const format = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    let dateString = new Date(date).toLocaleDateString('en-US', format).replace(/,/g, '');
    dateString = dateString.replace(' ', ', ');
    return dateString;
}
export const getFormattedTime = (date) => {
    const format = {hour: '2-digit', minute: '2-digit'};
    const timeString = new Date(date).toLocaleTimeString([], format);
    return timeString;
}