import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
    constructor (private configService :NestConfigService ){}
    get<T>(key:string) : T {
        return this.configService.get<T>(key)
    }
    getDatabaseConfig(){
        return this.configService.get('database')
    }
    getRabbitMQUri(){
        return this.configService.get<string>('rabbitmq.uri')
    }
    getServiceUrl(service: 'payment' | 'order' | 'shop' ){
        return this.configService.get<string>(`services.${service}`)

    }

}
