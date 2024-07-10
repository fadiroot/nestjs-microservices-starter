import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppointmentModule } from './appointment.module';
async function bootstrap() {
  const app = await NestFactory.create(AppointmentModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'appointment_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);

  console.log(`Appointment microservice is running on: ${await app.getUrl()}`);
}
bootstrap();
