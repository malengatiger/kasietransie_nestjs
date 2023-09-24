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
const mm = '🎽 🎽 🎽 MessagingService';
@Injectable()
export class MessagingService {
  constructor() {}
  async sendVehicleArrivalMessage(arrival: VehicleArrival) {
    const fmtDate = MyUtils.formatISOStringDate(arrival.created, null);
    this.send(
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

    this.send(
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

    this.send(
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

    this.send(
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
    this.send(
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
