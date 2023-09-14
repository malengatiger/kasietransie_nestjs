import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  async getAssociations(): Promise<any[]> {
    return [{ name: 'Aubrey' }, { name: 'Bobby' }];
  }
}
