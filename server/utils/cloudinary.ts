import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
});

/**
 * Deletes the profile picture of a user in Cloudinary.
 * 
 * @param imageUrl - The URL of the asset in Cloudinary
 */
export const deleteUserPicture = async (imageUrl: string) => {
    // Get the public ID from the URL
    const publicId = imageUrl.split('/').pop()?.split('.')[0]!;

    await cloudinary.api.delete_resources([`Ramble/Users/${publicId}`]);
}