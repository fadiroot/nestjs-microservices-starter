import { Body, Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ConfigService } from '@app/config';
import { RabbitmqService } from 'libs/rabbitmq/src';

@Controller()
export class GatewayController {
  constructor(
    private readonly gatewayService: GatewayService,
    private readonly configService: ConfigService,
    private readonly rabbitmqService: RabbitmqService
  ) {}

  @Get()
  async createOrder(@Body() orderData: any) {
    try {
      // Use uppercase queue name to match the RabbitmqService configuration
      await this.rabbitmqService.sendMessage('appointment_QUEUE', 'createOrder', orderData);
      return { message: 'Order created successfully' };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new HttpException('Failed to create order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}