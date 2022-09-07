import { Module } from '@nestjs/common';
import { EquipamentService } from './equipament.service';
import { EquipamentController } from './equipament.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [EquipamentController],
  providers: [EquipamentService,PrismaService]
})
export class EquipamentModule {}
