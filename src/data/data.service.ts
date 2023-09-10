/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Association } from 'src/models/Association';
import { City } from 'src/models/City';
import { Commuter } from 'src/models/Commuter';
import { Country } from 'src/models/Country';
import { Route } from 'src/models/Route';
import { RouteLandmark } from 'src/models/RouteLandmark';
import { User } from 'src/models/User';

const mm = 'DataService:';
@Injectable()
export class DataService {
  constructor(
    private configService: ConfigService,

    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>,
    // eslint-disable-next-line prettier/prettier

    @InjectModel(City.name)
    private cityModel: mongoose.Model<City>,

    @InjectModel(Country.name)
    private countryModel: mongoose.Model<Country>,

    @InjectModel(Commuter.name)
    private commuterModel: mongoose.Model<Commuter>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>,

    @InjectModel(RouteLandmark.name)
    private routeLandmarkModel: mongoose.Model<RouteLandmark>,
  ) {}

  //Promise<[]<AppError>>
  async registerAssociation(association: Association): Promise<Association> {
    if (association) {
      const m = await this.associationModel.create(association);
      Logger.log(`${mm} Association ${association.associationName} added`);
      return association;
    }
    return null;
  }
  async addCity(city: City): Promise<City> {
    if (city) {
      const m = this.cityModel.create(city);
      Logger.log(`${mm} City ${city.name} added`);
      return m;
    }
  }
  async addCountry(country: Country): Promise<Country> {
    if (country) {
      const m = this.countryModel.create(country);
      Logger.log(`${mm} Country ${country.name} added`);
      return m;
    }
  }
}
