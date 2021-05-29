type Category = 'TASTE' | 'CREATE' | 'RELAX' | 'LEARN' | 'MOVE';

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

    get title() { return this.data.title; }

    getCardInfo(): ExperienceCard {
        return {
            _id: this.data._id,
            title: this.data.title,
            image: this.data.images[0],
            isZoomExperience: Boolean(this.data.zoomPMI),
            location: this.data.location,
            price: this.data.pricePerPerson,
            ...this.data.numberOfRatings > 0 && {
                rating: this.data.numberOfRatings
            }
        }
    }
}