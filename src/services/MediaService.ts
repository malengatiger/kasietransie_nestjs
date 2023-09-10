/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { VehicleMediaRequest } from 'src/models/VehicleMediaRequest';
import { VehiclePhoto } from 'src/models/VehiclePhoto';
import { VehicleVideo } from 'src/models/VehicleVideo';

const mm = 'MediaService';

@Injectable()
export class MediaService {
  constructor(
    private configService: ConfigService,
    @InjectModel(VehiclePhoto.name)
    private vehiclePhotoModel: mongoose.Model<VehiclePhoto>,

    @InjectModel(VehicleVideo.name)
    private vehicleVideoModel: mongoose.Model<VehicleVideo>,
  ) {}

  public async getAssociationVehicleMediaRequests(
    associationId: string,
    startDate: string,
  ): Promise<VehicleMediaRequest[]> {
    return [];
  }
  public async addVehiclePhoto(
    vehiclePhoto: VehiclePhoto,
  ): Promise<VehiclePhoto> {
    return null;
  }
  public async getVehicleMediaRequests(
    vehicleId: string,
  ): Promise<VehicleMediaRequest[]> {
    return [];
  }
  public async addVehicleVideo(
    vehicleVideo: VehicleVideo,
  ): Promise<VehicleVideo> {
    return null;
  }
  public async getVehiclePhotos(vehicleId: string): Promise<VehiclePhoto[]> {
    return [];
  }
  public async getVehicleVideos(vehicleId: string): Promise<VehicleVideo[]> {
    return [];
  }
}
