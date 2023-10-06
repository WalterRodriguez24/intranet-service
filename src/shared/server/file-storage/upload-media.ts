import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadResponseCallback,
} from "cloudinary";

import sharp from "sharp";

type UploadResult = {
  url: string;
  id: string;
};

class MediaService {
  private static provider = cloudinary;
  private uploadOptions: UploadApiOptions = {
    folder: process.env.CLOUDINARY_FOLDER,
  };

  constructor() {
    if (!MediaService.provider) return;
    MediaService.provider.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async optimizeImage(buffer: Buffer) {
    try {
      const optimizedImage = await sharp(buffer)
        .webp({ quality: 75 })
        .toBuffer();
      return optimizedImage;
    } catch (error) {
      throw new Error("Error optimizing image");
    }
  }

  private async uploadStream(
    buffer: Buffer,
    config: UploadApiOptions
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const cloudinaryDone: UploadResponseCallback = (error, result) => {
        return !error && result ? resolve(result) : reject(error);
      };
      MediaService.provider.uploader
        .upload_stream(config, cloudinaryDone)
        .end(buffer);
    });
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const optimizedImage = await this.optimizeImage(file.buffer);
      const { secure_url: url, public_id: id } = await this.uploadStream(
        optimizedImage,
        this.uploadOptions
      );

      return { url, id } as UploadResult;
    } catch (error) {
      throw new Error("Error uploading image");
    }
  }

  async uploadImages(files: Express.Multer.File[]) {
    const uploads = files.map((file) => this.uploadImage(file));
    const results = await Promise.all(uploads);

    return results;
  }

  async uploadVideo(file: Express.Multer.File) {
    try {
      const { secure_url: url, public_id: id } = await this.uploadStream(
        file.buffer,
        {
          ...this.uploadOptions,
          resource_type: "video",
        }
      );

      return { url, id } as UploadResult;
    } catch (error) {
      console.log({ error });
      throw new Error("Error uploading video");
    }
  }

  async uploadMedia(files: Express.Multer.File[]) {
    const uploads = files.map((file) => {
      const isVideo = file.mimetype.includes("video");
      if (isVideo) return this.uploadVideo(file);
      return this.uploadImage(file);
    });
    const results = await Promise.all(uploads);

    return results;
  }

  async removeImage(id: string) {
    try {
      await MediaService.provider.uploader.destroy(id);
    } catch (error) {
      throw new Error("Couldn't remove image");
    }
  }
}

const imageService = new MediaService();

export default imageService;
