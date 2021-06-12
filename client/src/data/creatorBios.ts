import type { Language } from 'models/language';

type CreatorData = {
    name: string;
    imageUrl: string;
    bio: Record<Language, string>;
}

const biosData: CreatorData[] = [
    {
        name: 'Kevin',
        imageUrl: `${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_thumb,g_face,h_500,w_500/v1614733940/Ramble/Creators/kevin_ezussv.jpg`,
        bio: {
            en: "I'm a bartender and an ice carver in one of Montreal's coolest cocktail bars. I consider myself a creative and devoted mind and I have yet to quench my thirst for everything mixology.",
            fr: "Je travaille dans l'un des bars à cocktails les plus \"cool\" de Montréal. Après toutes ces années, je ne suis toujours pas arrivé à étancher ma soif de tout ce qui touche à la mixologie."
        }
    }, 
    {
        name: 'Julie Anna',
        imageUrl: `${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_thumb,g_face,h_500,w_500/v1620764151/Ramble/Experiences/egc0aafohpii1gprogca.jpg`,
        bio: {
            en: "I'm a young mixologist-restaurateur, passionate and hyperactive. I'm huge fan of complex simplicity, human connections and discovery. Enter my funky world and let's get to know each other during happy hour!",
            fr: "Jeune restauratrice cocktologue, passionnée et hyperactive. Grande fan de simplicité complexe, de connexions humaines et de découvertes. Entrez dans mon univers funky, apprenons à se connaître en prenant l'apéro!"
        }
    },
    {
        name: 'Pierre & Sidney',
        imageUrl: `${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_thumb,h_500,w_500/v1617381856/Ramble/Users/xdpk0dduqlqq5tnunwnj.jpg`,
        bio: {
            en: "After various journeys that have led us to work in some of the most renowned institutions in the world, our paths crossed in 2016, at the Relais Bernard Loiseau, one of the most famous tables of France. We look forward to welcoming you behind the scenes of our restaurant.",
            fr: "Après différents périples nous ayant amenés à travailler dans quelques unes des institutions les plus réputées au monde, de l’Atelier de Joël Robuchon au Kikunoi, au Japon, nos chemins se sont croisés en 2016, au Relais Bernard Loiseau, l'une des tables de plus réputées de France. Au plaisir de vous recevoir dans les coulisses de notre restaurant."
        }
    }
];

export default biosData;