import { Module , DynamicModule } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule , Transport } from '@nestjs/microservices';

@Module({})
export class RabbitmqModule {
  static forRootAsync(arg0: {}): import("@nestjs/common").Type<any> | DynamicModule | Promise<DynamicModule> | import("@nestjs/common").ForwardReference<any> {
    throw new Error('Method not implemented.');
  }
  static forRoot (options : {uri:string}){
    return {
      module : RabbitmqModule,
      imports:[
        ClientsModule.register([
          {
            name : 'RABBITMQ_CLIENT',
            transport : Transport.RMQ,
            options : {
              urls : [options.uri] , 
              queue : 'dafault_queue',
              queueOptions : {
                durable : false
              }
            }
          }
        ])
      ],
      providers : [RabbitmqModule] , 
      export : [RabbitmqService]
    }
  }
}
