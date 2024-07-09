import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport, ClientOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private clients: { [key: string]: ClientProxy } = {};
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  static readonly QUEUE_CONFIG = {
    ORDER_QUEUE: 'order_queue',
    PAYMENT_QUEUE: 'payment_queue',
    NOTIFICATION_QUEUE: 'notification_queue',
    // Add more queues as needed
  };

  constructor(private readonly configService: ConfigService) {
    Object.entries(RabbitmqService.QUEUE_CONFIG).forEach(([key, queueName]) => {
      const queueConfig: ClientOptions = {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: queueName,
          queueOptions: {
            durable: false,
          },
        },
      };
      this.clients[key] = ClientProxyFactory.create(queueConfig);
    });
  }

  async onModuleInit() {
    this.connection = await amqp.connect('amqp://localhost:5672');
    this.channel = await this.connection.createChannel();

    for (const queueName of Object.values(RabbitmqService.QUEUE_CONFIG)) {
      await this.channel.assertQueue(queueName, { durable: false });
    }
  }

  getClient(queueName: string): ClientProxy {
    if (!this.clients[queueName]) {
      throw new Error(`Queue ${queueName} is not configured.`);
    }
    return this.clients[queueName];
  }

  async sendMessage(queueName: string, pattern: string, data: any): Promise<any> {
    const client = this.getClient(queueName);
    return client.send(pattern, data).toPromise();
  }

  async getChannel(): Promise<amqp.Channel> {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }
    return this.channel;
  }


  // ... rest of the service methods ...
}