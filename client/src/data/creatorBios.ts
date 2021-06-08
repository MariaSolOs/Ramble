import type { Language } from 'models/language';

type CreatorData = {
    name: string;
    city: string;
    imageUrl: string;
    bio: Record<Language, string>;
}

const biosData: CreatorData[] = [
    {
        name: 'Kevin',
        city: 'Montréal', 
        imageUrl: `${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_thumb,g_face,h_500,w_500/v1614733940/Ramble/Creators/kevin_ezussv.jpg`,
        bio: {
            en: 'I\'m a bartender and an ice carver in one of Montreal\'s coolest cocktail bars. I consider myself a creative and devoted mind and I have yet to quench my thirst for everything mixology.',
            fr: ''
        }
    }
];

export default biosData;