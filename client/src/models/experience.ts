export const EXPERIENCE_CATEGORIES = [
    'taste',
    'create',
    'relax',
    'learn',
    'move'
];
export type Category = typeof EXPERIENCE_CATEGORIES[number];

// The following are ordered as displayed on the creation navbar
export const CREATION_STEPS = [
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

export interface Experienceable {
    readonly _id: string;
    readonly title: string;
    readonly description: string;
    readonly images: string[];
    readonly categories: [Category, Category];
    readonly duration: number;
    readonly languages: string[];
    readonly capacity: number;
    readonly pricePerPerson: number;
    readonly pricePrivate: number;
    readonly currency: string;
    readonly ratingValue: number;
    readonly numberOfRatings: number;
    readonly location: string;
    readonly latitude?: number;
    readonly longitude?: number;
    readonly ageRestriction?: number;
    readonly includedItems?: string[];
    readonly toBringItems?: string[];
    readonly zoomPMI?: string;
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
    get pricePrivate() { return this.data.pricePrivate; }
    get currency() { return this.data.currency; }
    get location() { return this.data.location; }
    get latitude() { return this.data.latitude; }
    get longitude() { return this.data.longitude; }
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

    static getCardInfo(exp: Experienceable): ExperienceCard {
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

    getCardInfo(): ExperienceCard {
        return Experience.getCardInfo(this.data);
    }
}