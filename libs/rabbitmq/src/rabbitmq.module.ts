import { Module, DynamicModule, Global } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({})
export class RabbitmqModule {
  static forRootAsync(): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [
        ClientsModule.registerAsync(
          Object.entries(RabbitmqService.QUEUE_CONFIG).map(([key, queueName]) => ({
            name: key,
            useFactory: async () => ({
              transport: Transport.RMQ,
              options: {
                urls: ['amqp://localhost:5672'],
                queue: queueName,
                queueOptions: {
                  durable: false,
                },
              },
            }),
          }))
        ),
      ],
      providers: [RabbitmqService],
      exports: [RabbitmqService, ClientsModule],
    };
  }
}