/* eslint-disable @typescript-eslint/no-unused-vars */
import { Translate } from '@google-cloud/translate/build/src/v2';
import { Injectable, Logger } from '@nestjs/common';
import { TranslationInput } from 'src/data/helpers/TranslationInput';
import { TranslationBag } from 'src/data/models/TranslationBag';
import { Readable } from 'stream';
import * as performance from 'perf_hooks';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
const mm = '🍐🍐🍐🍐 TranslationService 🍐';
@Injectable()
export class TranslationService {
  private translate: Translate;

  constructor(
    @InjectModel(TranslationBag.name)
    private translationModel: mongoose.Model<TranslationBag>,
  ) {}

  async translateText(text: string, targetLanguage: string): Promise<string> {
    if (!this.translate) {
      this.translate = new Translate();
    }
    const [translation] = await this.translate.translate(text, targetLanguage);
    return translation;
  }

  async translateFile(
    readable: Readable,
    fileType: string,
  ): Promise<TranslationBag[]> {
    const inputs: TranslationInput[] = [];
    let jsonList: any[] = [];
    // Read the file and extract the strings to translate
    const jsonString = await this.readStreamToString(readable);
    if (fileType === 'json') {
      jsonList = JSON.parse(jsonString);
    } else {
      jsonList = await this.convertCsvToJson(jsonString);
    }
    jsonList.forEach((json: { key: string; text: string }) => {
      const ti = new TranslationInput();
      ti.key = json.key;
      ti.text = json.text;
      inputs.push(ti);
    });

    const translations = await this.translateStrings(inputs);
    return translations;
  }
  async translateStrings(
    translationInputs: TranslationInput[],
  ): Promise<TranslationBag[]> {
    const translationBags: TranslationBag[] = [];
    const startTime = performance.performance.now();

    const languageCodes = this.getLanguageCodes();
    for (const code of languageCodes) {
      let cnt = 0;
      for (const input of translationInputs) {
        const translation = await this.translateText(input.text, code);
        const bag = new TranslationBag();
        bag.key = input.key;
        bag.source = 'en';
        bag.stringToTranslate = input.text;
        bag.translatedText = translation;
        bag.created = new Date().toUTCString();
        bag.target = code;
        bag.format = 'text';
        translationBags.push(bag);
        cnt++;
      }
      Logger.log(
        `${mm} Translation from English to ${code} completed ${cnt} successfully`,
      );
    }
    Logger.log(
      `${mm} Translation completed successfully for ${translationBags.length} total translations`,
    );
    await this.translationModel.create(translationBags);
    Logger.log(`${mm} TranslationBags written to Mongo`);

    const endTime = performance.performance.now();
    const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
    Logger.log(`${mm} Translation elapsed time: ${elapsedTime} seconds`);
    return translationBags;
  }
  async convertCsvToJson(csvContent: string): Promise<any[]> {
    const jsonArray: any[] = [];

    return new Promise((resolve, reject) => {
      const readableStream = Readable.from(csvContent);

      readableStream
        .pipe(csvParser())
        .on('data', (data: any) => jsonArray.push(data))
        .on('end', () => resolve(jsonArray))
        .on('error', (error: any) => reject(error));
    });
  }
  private async readStreamToString(stream: Readable): Promise<string> {
    return new Promise((resolve, reject) => {
      let data = '';
      stream.on('data', (chunk) => {
        data += chunk.toString();
      });
      stream.on('end', () => {
        resolve(data);
      });
      stream.on('error', (error) => {
        reject(error);
      });
    });
  }
  private getLanguageCodes(): string[] {
    const languageCodes = [];

    languageCodes.push('en');
    languageCodes.push('af');

    languageCodes.push('fr');
    languageCodes.push('es');

    languageCodes.push('pt');
    languageCodes.push('de');

    languageCodes.push('sn');
    languageCodes.push('yo');

    languageCodes.push('zu');
    languageCodes.push('ts');

    languageCodes.push('ig');
    languageCodes.push('st');

    languageCodes.push('sw');
    languageCodes.push('xh');

    languageCodes.push('zh');
    return languageCodes;
  }
}
