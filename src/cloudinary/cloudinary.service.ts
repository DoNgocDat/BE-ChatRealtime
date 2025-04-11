// src/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

cloudinary.config({
    cloud_name: 'dlpt7xhbu',
    api_key: '533373165844152',
    api_secret: 'Ve0VWRw4tCVxmSQkxD37RYtIvaA',
});

@Injectable()
export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'ratings' },
                (err, res) => {
                    if (err || !res?.secure_url) {
                        return reject(new Error('Upload failed'));
                    }
                    resolve(res.secure_url);
                },
            );
            toStream(file.buffer).pipe(stream);
        });
    }

    async deleteImage(publicId: string): Promise<UploadApiResponse> {
        return cloudinary.uploader.destroy(publicId);
    }

    getPublicIdFromUrl(url: string): string {
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        return `ratings/${filename.split('.')[0]}`;
    }
}