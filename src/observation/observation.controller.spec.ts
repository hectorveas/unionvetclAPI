import { Test, TestingModule } from '@nestjs/testing';
import { ObservationController } from './observation.controller';

describe('ObservationController', () => {
  let controller: ObservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObservationController],
    }).compile();

    controller = module.get<ObservationController>(ObservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
