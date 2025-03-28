import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Redirect,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from './file.entity';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('file')
@ApiTags('File')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Get('retrieve/:name')
  @Redirect()
  async getFile(@Param('name') name: string) {
    return {
      url: await this.fileUploadService.retrieveFile(name),
      statusCode: 301,
    };
  }

  @Post('upload-single')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadSingle(@UploadedFile() image: BufferedFile) {
    return this.fileUploadService.uploadSingle(image);
  }
}
