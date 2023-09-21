/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import * as admin from 'firebase-admin';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';
const mm = '🎽 🎽 🎽 MessagingService';
@Injectable()
export class MessagingService {
  async sendVehicleArrivalMessage(arrival: VehicleArrival) {
    this.send(
      `vehicleArrival${arrival.associationId}`,
      `${arrival.vehicleReg},`,
      `Arrived at ${arrival.created}`,
      'vehicleArrival',
      JSON.stringify(arrival, null, 2),
    );
    return null;
  }
  async sendDispatchMessage(dispatch: DispatchRecord) {
    this.send(
      `dispatch${dispatch.associationId}`,
      `${dispatch.vehicleReg},`,
      `Dispatched at ${dispatch.created}`,
      'dispatchRecord',
      JSON.stringify(dispatch),
    );
    return null;
  }
  async sendHeartbeatMessage(heartbeat: VehicleHeartbeat) {
    this.send(
      `heartbeat${heartbeat.associationId}`,
      `${heartbeat.vehicleReg},`,
      `Heartbeat at ${heartbeat.created}`,
      'vehicleHeartbeat',
      JSON.stringify(heartbeat, null, 2),
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
