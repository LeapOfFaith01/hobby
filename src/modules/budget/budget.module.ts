import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService,PrismaService]
})
export class BudgetModule {}
