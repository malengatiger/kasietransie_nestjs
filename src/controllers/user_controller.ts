/* eslint-disable @typescript-eslint/no-unused-vars */
////////////////////////////////////////////////////////////////////////
import {
  Controller,
  Query,
  Logger,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { Vehicle } from 'src/data/models/Vehicle';
import { FileInterceptor } from '@nestjs/platform-express';
import { RouteAssignment } from 'src/data/models/RouteAssignment';
import { RouteAssignmentList } from 'src/data/helpers/RouteAssignmentList';
import { UserService } from 'src/services/UserService';
import { User } from 'src/data/models/User';

const mm = ' 🚼 🚼 🚼 UserController  🚼';

@Controller('api/v1')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('getUserById')
  async getUserById(@Query('userId') userId: string): Promise<User> {
    return this.userService.getUserById(userId);
  }
  @Post('importUsersFromCSV')
  @UseInterceptors(FileInterceptor('file'))
  async importUsersFromCSV(
    @UploadedFile() file: Express.Multer.File,
    @Query('associationId') associationId: string,
  ): Promise<User[]> {
    const res = await this.userService.importUsersFromCSV(file, associationId);

    return res;
  }

  @Post('importUsersFromJSON')
  @UseInterceptors(FileInterceptor('file'))
  async importUsersFromJSON(
    @UploadedFile() file: Express.Multer.File,
    @Query('associationId') associationId: string,
  ): Promise<User[]> {
    const res = await this.userService.importUsersFromCSV(file, associationId);

    return res;
  }

  private sendFile(fileName: string, res: Response) {
    this.logger.log('Sending file: ' + fileName);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=route.zip`);
    res.sendFile(fileName);
  }
}
