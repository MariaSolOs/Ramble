import { getFeesBreakdown } from 'utils/booking';

export type Fees = ReturnType<typeof getFeesBreakdown>;
export type BookingType = 'public' | 'private';
