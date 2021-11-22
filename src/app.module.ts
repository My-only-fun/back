import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health/health.controller';
import ormconfig from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...ormconfig, keepConnectionAlive: true }),
    AuthModule,
    TerminusModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        prettyPrint: process.env.NODE_ENV !== 'production',
      },
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [],
})
export class AppModule {}
