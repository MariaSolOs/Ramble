import type { BookingType } from 'models/experience-occurrence';

/**
 * Computes the breakdown for the receipt.
 * 
 * @param price - The experience price (either the private or public/per person one)
 * @param isOnlineExperience - If true, the experience is on Zoom
 * @param numGuests - Number of guests. Only defined for public experiences
 * @returns The breakdown information
 */
 export const getFeesBreakdown = (price: number, isOnlineExperience: boolean, bookingType: BookingType, numGuests: number) => {
    let bookingPrice = 0;
    let subTotalString = '';

    if (bookingType === 'public' && !isOnlineExperience) {
        bookingPrice = price * numGuests;
        subTotalString = `${numGuests} x ${price.toFixed(2)} = ${bookingPrice.toFixed(2)}`;       
    } else {
        bookingPrice = price;
        subTotalString = price.toFixed(2);
    }

    const serviceFee = (bookingPrice * 0.0345) + 0.33;
    const withServiceFee = serviceFee + bookingPrice;
    const taxGST = 0.05 * withServiceFee;
    const taxQST = 0.09975 * withServiceFee;

    return {
        subTotalString,
        withServiceFee,
        serviceFee,
        taxGST,
        taxQST
    }
}