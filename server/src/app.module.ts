import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { UserModule } from '@/modules/user/user.module';
import { MedicineModule } from '@/modules/medicine/medicine.module';
import { RecordModule } from '@/modules/record/record.module';
import { DeviceModule } from '@/modules/device/device.module';
import { MessageModule } from '@/modules/message/message.module';

@Module({
  imports: [
    UserModule,
    MedicineModule,
    RecordModule,
    DeviceModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
