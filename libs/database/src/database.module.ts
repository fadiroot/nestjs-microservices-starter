import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

@Module({})
export class DatabaseModule {
  static forRoot(config: DatabaseConfig): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}