import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const GRPC_PORT = 50001;

  const grpcService = await NestFactory.createMicroservice<GrpcOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${GRPC_PORT}`,
        package: 'clubs',
        protoPath: join(__dirname, 'grpc/clubs.proto'),
      },
    },
  );
  grpcService.listen(() =>
    Logger.log(`📦 [GRPC] SP Clubs running in ${GRPC_PORT}...`),
  );
}
bootstrap();
