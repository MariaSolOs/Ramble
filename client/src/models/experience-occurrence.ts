import type { DateTimeOptions } from 'luxon';

import { getFeesBreakdown } from 'utils/booking';

export type Fees = ReturnType<typeof getFeesBreakdown>;

export type BookingType = 'public' | 'private';

export const TIMEZONE_CONFIG: DateTimeOptions = {
    zone: 'America/Toronto'
}
