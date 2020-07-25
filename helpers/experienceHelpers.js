//Helpers
exports.extractDayFrame = (date) => {
    const dayStart = new Date(date);
    const day = (60 * 60 * 24 * 1000) - 1;
    const dayEnd = new Date(dayStart.getTime() + day);
    return [dayStart, dayEnd];
}