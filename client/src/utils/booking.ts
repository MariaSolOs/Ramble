import type { BookingType } from 'models/experience-occurrence';

import { faCcVisa } from '@fortawesome/free-brands-svg-icons/faCcVisa';
import { faCcMastercard } from '@fortawesome/free-brands-svg-icons/faCcMastercard';
import { faCcAmex } from '@fortawesome/free-brands-svg-icons/faCcAmex';
import { faCcDinersClub } from '@fortawesome/free-brands-svg-icons/faCcDinersClub';
import { faCcDiscover } from '@fortawesome/free-brands-svg-icons/faCcDiscover';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons/faCreditCard';

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
    const totalPrice = withServiceFee + taxGST + taxQST;

    return {
        subTotalString,
        withServiceFee,
        serviceFee,
        taxGST,
        taxQST,
        totalPrice
    }
}

/**
 * Helper function for getting nice credit card icons.
 * 
 * @param brand - The card's brand (as given by Stripe)
 * @returns The brand's icon
 */
export const getCardIcon = (brand: string) => {
    switch (brand) {
        case 'amex': return faCcAmex;
        case 'diners_club': return faCcDinersClub;
        case 'discover': return faCcDiscover;
        case 'mastercard': return faCcMastercard;
        case 'visa': return faCcVisa;
        default: return faCreditCard;
    }
}