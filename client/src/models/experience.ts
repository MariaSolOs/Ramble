type Category = 'TASTE' | 'CREATE' | 'RELAX' | 'LEARN' | 'MOVE';

export interface Experience {
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
    readonly creatorId: string;
    readonly location?: string;
    readonly meetingPoint?: string;
    readonly latitude?: number;
    readonly longitude?: number;
    readonly ageRestriction?: number;
    readonly includedItems?: string[];
    readonly toBringItems?: string[];
    readonly zoomPMI?: string;
    readonly zoomPassword?: string;
}