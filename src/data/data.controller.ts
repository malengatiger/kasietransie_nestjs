import { Body, Controller, Post, Get } from '@nestjs/common';
import { DataService } from './data.service';
import { Association } from 'src/models/Association';

@Controller('data')
export class DataController {
  constructor(private dataService: DataService) {}

  @Post('registerAssociation')
  async registerAssociation(@Body() ass: Association): Promise<Association> {
    console.log(`UserController: 🔵 🔵 ... createUser .... ${ass}`);
    if (ass) {
      await this.dataService.registerAssociation(ass);
      return ass;
    }
    throw new Error(' 🍎 🍎 🍎 🍎 🍎  ... Association is null, fuck!');
  }
}
