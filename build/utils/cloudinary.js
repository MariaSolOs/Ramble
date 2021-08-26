"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperiencePictures = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const deleteExperiencePictures = (imageUrls) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the public ID from the URLs
    const publicIds = imageUrls.map(url => {
        var _a;
        const id = (_a = url.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
        return `Ramble/Experiences/${id}`;
    });
    yield cloudinary_1.v2.api.delete_resources(publicIds);
});
exports.deleteExperiencePictures = deleteExperiencePictures;
