import { Injectable, Logger } from '@nestjs/common';
import * as archiver from 'archiver';
import * as fs from 'fs';
import * as path from 'path';
const mm = '🍎🍎🍎 FileArchiverService: 🍎🍎🍎';

@Injectable()
export class FileArchiverService {
  async createZipArchive(
    fileContents: { name: string; content: string }[],
  ): Promise<string> {
    const zipFileName = 'file.zip';
    const zipFilePath = path.join(__dirname, '..', 'tempFiles', zipFileName);

    return new Promise<string>((resolve, reject) => {
      const output = fs.createWriteStream(zipFilePath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', () => {
        Logger.log(`${mm} ... onClose`);
        resolve(zipFilePath);
      });

      archive.on('error', (error: any) => {
        Logger.log(`${mm} ... archive error: ${error}`);
        reject(error);
      });

      archive.pipe(output);

      for (const file of fileContents) {
        archive.append(file.content, { name: file.name });
      }
      Logger.log(`${mm} ... finalize archive`);

      archive.finalize();
    });
  }
}
