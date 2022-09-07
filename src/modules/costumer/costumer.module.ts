import { Module } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { CostumerController } from './costumer.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [CostumerController],
  providers: [CostumerService,PrismaService],
})
export class CostumerModule {}
