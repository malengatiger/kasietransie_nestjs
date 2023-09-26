/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import * as admin from 'firebase-admin';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { MyUtils } from 'src/my-utils/my-utils';
import { RouteService } from 'src/services/RouteService';
import { RouteUpdateRequest } from 'src/data/models/RouteUpdateRequest';
import { Constants } from 'src/my-utils/constants';
import { AppError } from '../data/models/AppError';
import { AppErrors } from '../data/helpers/AppErrors';
import { LocationRequest } from '../data/models/LocationRequest';
import { LocationResponse } from '../data/models/LocationResponse';
const mm = '🎽 🎽 🎽 MessagingService';
@Injectable()
export class MessagingService {
  constructor() {}
  async sendAppErrorMessages(appErrors: AppErrors) {
    const fmtDate = MyUtils.formatISOStringDate(new Date().toISOString(), null);
    await this.send(
      `${Constants.appError}`,
      `Kasie Application Errors`,
      `AppErrors at ${fmtDate}`,
      Constants.appError,
      JSON.stringify(appErrors.appErrorList, null, 2),
    );
    return null;
  }
  async sendAppErrorMessage(appError: AppError) {
    const fmtDate = MyUtils.formatISOStringDate(appError.created, null);
    await this.send(
      `${Constants.appError}`,
      `Kasie Application Error`,
      `${appError.errorMessage} at ${fmtDate}`,
      Constants.appError,
      JSON.stringify(appError, null, 2),
    );
    return null;
  }
  async sendLocationRequestMessage(locationRequest: LocationRequest) {
    const fmtDate = MyUtils.formatISOStringDate(locationRequest.created, null);
    await this.send(
      `${Constants.locationRequest}${locationRequest.associationId}`,
      `Vehicle Location Request`,
      `Requested at ${fmtDate}`,
      Constants.locationRequest,
      JSON.stringify(locationRequest, null, 2),
    );
    return null;
  }
  async sendLocationResponseMessage(locationResponse: LocationResponse) {
    const fmtDate = MyUtils.formatISOStringDate(locationResponse.created, null);
    await this.send(
      `${Constants.locationResponse}${locationResponse.associationId}`,
      `Vehicle Location Response`,
      `Responded at ${fmtDate}`,
      Constants.locationResponse,
      JSON.stringify(locationResponse, null, 2),
    );
    return null;
  }
  async sendVehicleArrivalMessage(arrival: VehicleArrival) {
    const fmtDate = MyUtils.formatISOStringDate(arrival.created, null);
    await this.send(
      `${Constants.vehicleArrival}${arrival.associationId}`,
      `${arrival.vehicleReg},`,
      `Arrived at ${fmtDate}`,
      Constants.vehicleArrival,
      JSON.stringify(arrival, null, 2),
    );
    return null;
  }
  async sendDispatchMessage(dispatch: DispatchRecord) {
    const fmtDate = MyUtils.formatISOStringDate(dispatch.created, null);

    await this.send(
      `${Constants.dispatchRecord}${dispatch.associationId}`,
      `${dispatch.vehicleReg},`,
      `Dispatched at ${fmtDate}`,
      Constants.dispatchRecord,
      JSON.stringify(dispatch),
    );
    return null;
  }
  async sendHeartbeatMessage(heartbeat: VehicleHeartbeat) {
    const fmtDate = MyUtils.formatISOStringDate(heartbeat.created, null);

    await this.send(
      `${Constants.heartbeat}${heartbeat.associationId}`,
      `${heartbeat.vehicleReg},`,
      `Heartbeat at ${fmtDate}`,
      Constants.heartbeat,
      JSON.stringify(heartbeat, null, 2),
    );
    return null;
  }
  async sendPassengerCountMessage(count: AmbassadorPassengerCount) {
    const fmtDate = MyUtils.formatISOStringDate(count.created, null);

    await this.send(
      `${Constants.passengerCount}${count.associationId}`,
      `${count.vehicleReg},`,
      `PassengerCount on ${fmtDate}`,
      Constants.passengerCount,
      JSON.stringify(count, null, 2),
    );
    return null;
  }
  async sendRouteUpdateMessage(req: RouteUpdateRequest) {
    const fmtDate = MyUtils.formatISOStringDate(Date.now().toString(), null);
    await this.send(
      `${Constants.routeUpdateRequest}${req.associationId}`,
      `${req.routeName},`,
      `Route Updated on ${Date.now().toString()}`,
      Constants.routeUpdateRequest,
      JSON.stringify(req, null, 2),
    );
    return null;
  }
  private async send(
    topic: string,
    title: string,
    body: string,
    type: string,
    data: string,
  ) {
    const message: admin.messaging.Message = {
      topic: topic,
      data: {
        type: type,
        data: data,
      },
      notification: {
        title: title,
        body: body,
      },
    };

    try {
      const response = await admin.messaging().send(message);
      Logger.log(
        `${mm} 🅿️ 🅿️ 🅿️  Successfully sent FCM message: \n🚺 🚺 🚺 ${JSON.stringify(
          message,
        )} \n🚺 🚺 🚺 FCM response: ${response}`,
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
