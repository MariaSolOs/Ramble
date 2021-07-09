import { v4 as uuid } from 'uuid';
import type { EventInput } from '@fullcalendar/react';

import { ExperienceCategory } from 'graphql-api';
import type { CardContentFragment as ExperienceCardInput } from 'graphql-api';

export const EXPERIENCE_CATEGORIES = Object.values(ExperienceCategory).filter(
    val => isNaN(+val)
);

export type Category = typeof EXPERIENCE_CATEGORIES[number];

export const CURRENCIES = [
    'CAD',
    'USD'
] as const;
export type Currency = typeof CURRENCIES[number];

// The following are ordered as displayed on the creation navbar
export const CREATION_STEPS = [
    'setting',
    'location',
    'title',
    'category',
    'planning',
    'duration',
    'language',
    'capacity',
    'age',
    'preview', 
    'included',
    'toBring',
    'price',
    'availabilities',
    'review'
] as const;
export type CreationStep = typeof CREATION_STEPS[number];

export type ExperienceCard = {
    _id: string;
    title: string;
    image: string;
    isZoomExperience: boolean;
    location: string;
    price: number;
    rating?: number;
}

// Some fields can be null because of our GraphQL schema
export interface Experienceable {
    readonly _id: string;
    readonly title: string;
    readonly description: string;
    readonly images: string[];
    readonly categories: Category[];
    readonly duration: number;
    readonly languages: string[];
    readonly capacity: number;
    readonly pricePerPerson: number;
    readonly privatePrice?: number;
    readonly currency?: Currency;
    readonly ratingValue?: number;
    readonly numberOfRatings?: number;
    readonly location: string;
    readonly latitude?: number | null;
    readonly longitude?: number | null;
    readonly ageRestriction?: number | null;
    readonly includedItems?: string[];
    readonly toBringItems?: string[];
    readonly zoomPMI?: string | null;
}

export interface ExperienceForm {
    isOnlineExperience?: boolean;
    location: string;
    zoomMeetingId: string;
    zoomMeetingPassword: string;
    meetingPoint: string;
    latitude: number;
    longitude: number;
    coordinates?: string[];
    title: string;
    categories: Category[];
    planning: string;
    duration: number; // In hours
    languages: string[];
    capacity: number;
    isAgeRestricted: boolean;
    ageRequired: number; 
    images: (File | string | undefined)[];
    included: string[];
    toBring: string[];
    pricePerPerson: number;
    privatePrice: number;
    currency: Currency;
    slots?: EventInput[];
}

/**
 * @param form - Experience builder form
 * @param images - Array of image URLs
 * @param experience - Current experience (if the builder was in edit mode)
 * @returns Experience to use as parameter for the experience component
 */
export const getFormPreview = (form: ExperienceForm, images: string[], experience?: Experience): Experience => {
    const data: Experienceable = {
        _id: experience ? experience._id : uuid(),
        title: experience ? experience.title : form.title,
        description: form.planning,
        location: experience ? experience.location : form.location,
        // Use a dummy PMI, we don't need it in the client side
        zoomPMI: experience ? 'PMI' : form.zoomMeetingId,
        ...!form.isOnlineExperience && {
            latitude: experience ? experience.latitude : form.latitude,
            longitude: experience ? experience.longitude : form.longitude
        },
        images,
        categories: experience ? experience.categories : form.categories as [Category, Category],
        duration: form.duration,
        languages: form.languages,
        capacity: form.capacity,
        ...form.isAgeRestricted && {
            ageRestriction: form.ageRequired
        },
        includedItems: form.included,
        toBringItems: form.toBring,
        pricePerPerson: form.pricePerPerson,
        privatePrice: form.privatePrice,
        currency: form.currency,
        ratingValue: 5,
        numberOfRatings: 0
    }

    return new Experience(data);
}

export class Experience {
    constructor(private data: Experienceable) {}

    get _id() { return this.data._id; }
    get title() { return this.data.title; }
    get description() { return this.data.description; }
    get duration() { return this.data.duration; }
    get languages() { return this.data.languages; }
    get capacity() { return this.data.capacity; }
    get categories() { return this.data.categories; }
    get pricePerPerson() { return this.data.pricePerPerson; }
    get privatePrice() { return this.data.privatePrice; }
    get currency() { return this.data.currency; }
    get location() { return this.data.location; }

    // We cast null coordinates to undefined because of Mapbox 
    get latitude() { 
        return this.data.latitude === null ? undefined : this.data.latitude; 
    }
    get longitude() { 
        return this.data.longitude === null ? undefined : this.data.longitude; 
    }

    get ageRestriction() { return this.data.ageRestriction; }
    get includedItems() { return this.data.includedItems || []; }
    get toBringItems() { return this.data.toBringItems || []; }
    get isZoomExperience() { return Boolean(this.data.zoomPMI); }
    get galleryImages() { 
        return this.data.images.map(img => ({
            original: img.replace('h_400', 'h_700'),
            thumbnail: img.replace('h_400', 'h_200')
        })); 
    }

    static getCardInfo(exp: ExperienceCardInput): ExperienceCard {
        return {
            _id: exp._id,
            title: exp.title,
            image: exp.images[0],
            isZoomExperience: Boolean(exp.zoomPMI),
            location: exp.location,
            price: exp.pricePerPerson,
            ...exp.numberOfRatings > 0 && {
                rating: exp.ratingValue
            }
        }
    }

    getCardInfo() {
        return Experience.getCardInfo({ 
            ...this.data,
            // Pass default values for rating
            ratingValue: this.data.ratingValue || 5,
            numberOfRatings: this.data.numberOfRatings || 0
        });
    }
}