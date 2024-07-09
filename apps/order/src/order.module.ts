import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from 'libs/rabbitmq/src'; // Assuming this is the correct import path

@Module({
  imports: [
    RabbitmqModule.forRootAsync(), // Ensure you are using the correct forRootAsync or forRoot configuration
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}