import { Module } from '@nestjs/common';
import { CostumerModule } from './modules/costumer/costumer.module';
import { AddressModule } from './modules/address/address.module';
import { ContactModule } from './modules/contact/contact.module';
import { EquipamentModule } from './modules/equipament/equipament.module';
import { BudgetModule } from './modules/budget/budget.module';
import { PaymentModule } from './modules/payment/payment.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [CostumerModule, AddressModule, ContactModule, EquipamentModule, BudgetModule, PaymentModule, SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
