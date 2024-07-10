import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@app/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  static readonly QUEUE_CONFIG = {
    APPOINTMENT_QUEUE: 'appointment_queue',
    PAYMENT_QUEUE: 'payment_queue',
    NOTIFICATION_QUEUE: 'notification_queue',
    // Add more queues as needed
  };

  constructor(
    @Inject('APPOINTMENT_QUEUE') private orderClient: ClientProxy,
    @Inject('PAYMENT_QUEUE') private paymentClient: ClientProxy,
    @Inject('NOTIFICATION_QUEUE') private notificationClient: ClientProxy,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    this.connection = await amqp.connect(this.configService.getRabbitMQUri());
    this.channel = await this.connection.createChannel();

    for (const queueName of Object.values(RabbitmqService.QUEUE_CONFIG)) {
      await this.channel.assertQueue(queueName, { durable: false });
    }
  }

  getClient(queueName: string): ClientProxy {
    switch (queueName) {
      case RabbitmqService.QUEUE_CONFIG.APPOINTMENT_QUEUE:
        return this.orderClient;
      case RabbitmqService.QUEUE_CONFIG.PAYMENT_QUEUE:
        return this.paymentClient;
      case RabbitmqService.QUEUE_CONFIG.NOTIFICATION_QUEUE:
        return this.notificationClient;
      default:
        throw new Error(`Queue ${queueName} is not configured.`);
    }
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