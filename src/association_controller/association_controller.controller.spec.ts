import { Test, TestingModule } from '@nestjs/testing';
import { AssociationControllerController } from './association_controller.controller';

describe('AssociationControllerController', () => {
  let controller: AssociationControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationControllerController],
    }).compile();

    controller = module.get<AssociationControllerController>(AssociationControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
