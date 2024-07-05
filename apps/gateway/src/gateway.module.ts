import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule } from '@app/config';
import { RabbitmqModule } from 'libs/rabbitmq/src';
import { ConfigService } from '@app/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitmqModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getRabbitMQUri(),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {
  constructor() {}
}
