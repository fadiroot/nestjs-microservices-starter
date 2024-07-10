import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from 'libs/rabbitmq/src'; // Assuming this is the correct import path
import { DatabaseModule } from '@app/database';
import { AppointmentEntity } from './infrastructure/entities/appointment.entity';
@Module({
  imports: [
    RabbitmqModule.forRootAsync(),
    DatabaseModule.forRoot({
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'appointmentdb',
    })
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}