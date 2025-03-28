import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as crypto from 'crypto';
import { BufferedFile } from 'src/file-upload/file.entity';
import { ApiConfigService } from 'src/config/config.service';

@Injectable()
export class MinioClientService {
  protected _bucketName = 'main';
  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly minio: MinioService,
    private readonly config: ApiConfigService,
  ) {}

  async retrieveFile(name: string) {
    const data = await this.client.presignedGetObject(this._bucketName, name);
    return data;
  }

  async upload(file: BufferedFile) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const filename = hashedFileName + ext;
    const fileBuffer = file.buffer;

    try {
      const bucketExists = await this.client.bucketExists(this._bucketName);
      if (!bucketExists) {
        await this.client.makeBucket(this._bucketName, 'us-east-1');
      }

      const obj = await this.client.putObject(
        this._bucketName,
        filename,
        fileBuffer,
        metaData,
      );
      console.log('@@@obj', obj);
      return {
        filename,
      };
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Error uploading file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
