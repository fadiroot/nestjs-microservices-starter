import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule } from '@app/config';
import { RabbitmqModule } from 'libs/rabbitmq/src';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitmqModule.forRootAsync(),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}