import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitmqService } from 'libs/rabbitmq/src';
import { Logger } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';

@Injectable()
export class GatewayService implements OnModuleInit {
  private readonly logger = new Logger(GatewayService.name);

  constructor(private readonly rabbitmqService: RabbitmqService) {}

  async onModuleInit() {
    await this.listenForAppointmentCreation();
  }

  private async listenForAppointmentCreation() {
    try {
      const channel = await this.rabbitmqService.getChannel();
      const queueName = RabbitmqService.QUEUE_CONFIG.APPOINTMENT_QUEUE;

      await channel.assertQueue(queueName, { durable: false });

      this.logger.log(`Waiting for messages in ${queueName}`);

      await channel.consume(queueName, (message: ConsumeMessage | null) => {
        if (message) {
          const content = message.content.toString();
          const data = JSON.parse(content);
          this.logger.log(`Received order creation message: ${JSON.stringify(data)}`);

          // Process the order data here
          // You can add additional logic to handle the order

          channel.ack(message);
        }
      });

    } catch (error) {
      this.logger.error('Error setting up order creation listener', error);
    }
  }
}