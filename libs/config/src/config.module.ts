import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import * as path from 'path'
@Module({}) 
export class ConfigModule {
  static forRoot(): DynamicModule{
    const environment = process.env.NODE_ENV || 'development';
    const envFilePath = path.resolve(__dirname, `../../../.env.${environment}`);
    console.log(envFilePath)
    return {
      module : ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal : true,
          load : [configuration],
          envFilePath
        })
      ],
      providers : [ConfigService],
      exports: [ConfigService]
    }
  }
}
