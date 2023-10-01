/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MessagingService } from 'src/messaging/messaging.service';
import { KasieError } from '../my-utils/kasie.error';
import { AppError } from '../data/models/AppError';

const mm: string = '🍎🍎🍎ErrorService';

@Injectable()
export class ErrorService {
  constructor(
    private messagingService: MessagingService,
    @InjectModel(KasieError.name)
    private kasieErrorModel: mongoose.Model<KasieError>,

    @InjectModel(AppError.name)
    private appErrorModel: mongoose.Model<AppError>,
  ) {}

  public async getAppErrors(startDate: string): Promise<AppError[]> {
    const res = await this.appErrorModel
      .find({ created: { $gte: startDate } })
      .sort({ created: -1 });
    Logger.debug(`AppErrors found: ${res.length}`);
    return res;
  }
  public async getKasieErrors(startDate: string): Promise<KasieError[]> {
    const res = await this.kasieErrorModel
      .find({ date: { $gte: startDate } })
      .sort({ date: -1 });
    Logger.debug(`KasieErrors found: ${res.length}`);
    return res;
  }
}
