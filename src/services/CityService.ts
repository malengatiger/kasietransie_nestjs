/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { City } from 'src/models/City';
import { Country } from 'src/models/Country';
import { State } from 'src/models/State';

const mm = 'CityService';

@Injectable()
export class CityService {
  constructor(
    private configService: ConfigService,
    @InjectModel(City.name)
    private cityModel: mongoose.Model<City>,
  ) {}

  public async addCity(city: City): Promise<City> {
    return null;
  }
  public async getCountryCities(
    countryId: string,
    page: number,
  ): Promise<City[]> {
    return [];
  }
  public async getCountryCitiesZippedFile(countryId: string): Promise<File> {
    return null;
  }
  public async getCountries(): Promise<Country[]> {
    return [];
  }
  public async findCitiesByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
    limit: number,
  ): Promise<City[]> {
    return [];
  }
  public async getCitiesNear(
    latitude: number,
    longitude: number,
    minDistanceInMetres: number,
    maxDistanceInMetres: number,
  ): Promise<City[]> {
    return [];
  }
  public async getCountryStates(countryId: string): Promise<State[]> {
    return [];
  }
}
