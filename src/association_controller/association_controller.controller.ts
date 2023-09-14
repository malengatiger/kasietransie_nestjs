import { Controller, Get } from '@nestjs/common';
import { AssociationService } from 'src/association_service/association_service.service';
import { Association } from 'src/data/models/association';

@Controller('api/v1')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Get('getAssociations')
  async getAssociations(): Promise<Association[]> {
    return await this.associationService.getAssociations();
  }
}
