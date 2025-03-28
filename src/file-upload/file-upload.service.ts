import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from './file.entity';

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  async retrieveFile(name: string) {
    const file = await this.minioClientService.retrieveFile(name);
    return file;
  }

  async uploadSingle(image: BufferedFile) {
    const uploadedImage = await this.minioClientService.upload(image);

    return {
      ...uploadedImage,
      message: 'Successfully uploaded',
    };
  }
}
