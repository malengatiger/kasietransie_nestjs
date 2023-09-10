import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '@speakbox/nestjs-firebase-admin';
import { User } from 'src/models/User';

@Injectable()
export class KasieFbService {
  constructor(
    @Inject(FirebaseService)
    private readonly firebase: FirebaseService,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const userRecord = await this.firebase.auth.createUser({
      email: email,
      displayName: name,
      password: password,
    });
    Logger.log(`User created: ${userRecord}`);
    const user = new User();
    user.email = email;
    user.password = password;
    user.firstName = name;
    user.userId = userRecord.uid;
    return user;
  }
}
