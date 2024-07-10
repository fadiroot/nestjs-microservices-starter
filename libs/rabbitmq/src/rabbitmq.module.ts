import { Module, DynamicModule, Global } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@app/config';
import { ConfigService } from '@app/config';

@Global()
@Module({})
export class RabbitmqModule {
  static forRootAsync(): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [
        ConfigModule.forRoot(),
        ClientsModule.registerAsync(
          Object.entries(RabbitmqService.QUEUE_CONFIG).map(([key, queueName]) => ({
            name: key,
            imports: [ConfigModule.forRoot()],
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.getRabbitMQUri()],
                queue: queueName,
                queueOptions: {
                  durable: false,
                },
              },
            }),
            inject: [ConfigService],
          }))
        ),
      ],
      providers: [RabbitmqService],
      exports: [RabbitmqService, ClientsModule],
    };
  }
}