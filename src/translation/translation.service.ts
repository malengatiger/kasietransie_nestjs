/* eslint-disable @typescript-eslint/no-unused-vars */
import { Translate } from '@google-cloud/translate/build/src/v2';
import { Injectable, Logger } from '@nestjs/common';
import { TranslationInput } from 'src/data/helpers/TranslationInput';
import { TranslationBag } from 'src/data/models/TranslationBag';
import { Readable } from 'stream';
import * as performance from 'perf_hooks';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import * as path from 'path';
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
        `${mm} Translation from English to 🍎 ${code} completed ${cnt} successfully`,
      );
    }
    Logger.log(
      `${mm} Translation completed successfully for 🍎 ${translationBags.length} total translations`,
    );
    const tempDir = path.join(__dirname, '..', 'translations');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    //write to db
    await this.translationModel.create(translationBags);
    Logger.log(`${mm} TranslationBags written to Mongo 🍎 🍎 🍎 `);

    //151500
    const mergedList = await this.translationModel.find({}).sort({ target: 1 });
    languageCodes.sort();
    languageCodes.forEach(async (languageCode) => {
      const filteredBags = mergedList.filter(
        (bag) => bag.target === languageCode,
      );
      Logger.log(
        `${mm} ... filteredBags: ${filteredBags.length} for languageCode: ${languageCode}`,
      );
      const filePath = path.join(tempDir, `${languageCode}.json`);
      this.handleLanguageBags(filteredBags, filePath);
    });
    await this.createKeysFile(mergedList);
    const endTime = performance.performance.now();
    const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
    Logger.log(`${mm} Translation elapsed time: 🍎 ${elapsedTime} seconds 🍎 `);
    return translationBags;
  }
  private handleLanguageBags(filteredBags: TranslationBag[], path: any) {
    const lines: string[] = [];
    const top = `'map': {\n`;
    const bottom = `}\n`;

    lines.push(top);
    filteredBags.forEach((bag) => {
      lines.push(`'${bag.key}': '${bag.translatedText}',\n`);
    });
    lines.push(bottom);

    const jsonData = lines.join('');
    Logger.log(
      `${mm} handleLanguageBags: keys length: ${jsonData.length} bytes, writing to file 🖐🏽 ${path}`,
    );
    fs.writeFileSync(path, jsonData);
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
  async createKeysFile(translationBags: TranslationBag[]): Promise<void> {
    Logger.log(
      `${mm} createKeysFile: translationBags found:  😎 ${translationBags.length}`,
    );
    const fileName = `keys_${new Date().getTime()}.txt`;
    const tempDir = path.join(__dirname, '..', 'tempFiles');
    const tempFilePath = path.join(tempDir, fileName);

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const map = new Map<string, TranslationBag>();
    translationBags.forEach((bag) => {
      map.set(bag.key, bag);
    });

    let lines = '';
    Array.from(map.values()).map((bag) => {
      const escapedValue = bag.key.replace(/'/g, "\\'");
      const line = `    hashMap['${bag.key}'] = '${escapedValue}';\n`;
      lines += line;
    });

    Logger.log(`${mm} lines:  😎 😎 😎 ${lines}`);
    fs.writeFileSync(tempFilePath, lines);
    Logger.log(
      `${mm} createKeysFile: translationKeyFile written:  😎 ${fileName}`,
    );
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
