import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
});

export const deleteExperiencePictures = async (imageUrls: string[]) => {
    // Get the public ID from the URLs
    const publicIds = imageUrls.map(url => {
        const id = url.split('/').pop()?.split('.')[0]!;
        return `Ramble/Experiences/${id}`;
    });

    await cloudinary.api.delete_resources(publicIds);
}
