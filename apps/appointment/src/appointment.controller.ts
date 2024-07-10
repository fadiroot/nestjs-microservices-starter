import { Controller, Post, Body } from '@nestjs/common';
import { RabbitmqService } from 'libs/rabbitmq/src'; // Assuming this is the correct import path

@Controller('orders')
export class AppointmentController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @Post()
  async createOrder(@Body() appointmentData: any) {
    try {
      await this.rabbitmqService.sendMessage(
        'appointment_QUEUE',
        'createappointment',
        appointmentData,
      );
      return { message: 'Order created successfully' };
    } catch (error) {
      throw new Error('Failed to create order');
    }
  }
}
