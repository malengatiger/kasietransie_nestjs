/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AppError } from 'src/data/models/appError';
import { Association } from 'src/data/models/association';
import { SettingsModel } from 'src/data/models/settingsModel';

@Injectable()
export class AssociationService {
  constructor(
    private configService: ConfigService,
    //
    @InjectModel(AppError.name)
    private appErrorModel: mongoose.Model<AppError>,

    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>,

    @InjectModel(SettingsModel.name)
    private settingsModelModel: mongoose.Model<SettingsModel>,
  ) {}
  //----------------------------------------------------------------
  public async getAssociations(): Promise<Association[]> {
    return await this.associationModel.find({});
  }
  public async getAssociationById(associationId: string): Promise<Association> {
    return null;
  }
}
