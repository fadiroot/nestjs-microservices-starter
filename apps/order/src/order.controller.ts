import { Controller, Post, Body } from '@nestjs/common';
import { RabbitmqService } from 'libs/rabbitmq/src'; // Assuming this is the correct import path

@Controller('orders')
export class OrderController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @Post()
  async createOrder(@Body() orderData: any) {
    try {
      // Publish a message to the 'order_queue' using RabbitmqService
      await this.rabbitmqService.sendMessage('ORDER_QUEUE', 'createOrder', orderData);
      return { message: 'Order created successfully' };
    } catch (error) {
      throw new Error('Failed to create order');
    }
  }
}
