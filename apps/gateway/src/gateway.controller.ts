  import { Controller, Get } from '@nestjs/common';
  import { GatewayService } from './gateway.service';
  import { ConfigService } from '@app/config';
  @Controller()
    
  export class GatewayController {
    constructor(
      private readonly gatewayService: GatewayService ,
      private readonly configService : ConfigService , 

    ) {}  

    @Get()
    getHello(): string {
      const environment = process.env.NODE_ENV || 'development';

      console.log(this.configService.getDatabaseConfig())
      return this.gatewayService.getHello();
    }
  }

