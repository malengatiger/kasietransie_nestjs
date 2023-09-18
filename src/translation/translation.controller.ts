import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranslationService } from './translation.service';
import { Readable } from 'stream';
import { TranslationInput } from 'src/data/helpers/TranslationInput';
import { TranslationBag } from 'src/data/models/TranslationBag';

@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post('texts')
  async translateTexts(
    @Body('texts') texts: TranslationInput[],
  ): Promise<TranslationBag[]> {
    const translations = await this.translationService.translateStrings(texts);
    return translations;
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async translateFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<TranslationBag[]> {
    const readableStream = Readable.from(file.buffer);
    let fileType: string;
    if (file.originalname.includes('csv')) {
      fileType = 'csv';
    }
    if (file.originalname.includes('json')) {
      fileType = 'json';
    }
    if (!fileType) {
      throw new Error(`Invalid file type`);
    }
    const translations = await this.translationService.translateFile(
      readableStream,
      fileType,
    );
    return translations;
  }
}
