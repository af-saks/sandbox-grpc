import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';

const GRPC_URL_SP = '0.0.0.0:50001';
const GRPC_URL_BUE = '0.0.0.0:50002';
@Module({
  controllers: [ClubsController],
  providers: [ClubsService],
  imports: [
    ClientsModule.register([
      {
        name: 'CLUBS_SP_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'clubs',
          protoPath: join(__dirname, '../grpc/clubs.proto'),
          url: GRPC_URL_SP,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'CLUBS_BUE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'clubs',
          protoPath: join(__dirname, '../grpc/clubs.proto'),
          url: GRPC_URL_BUE,
        },
      },
    ]),
  ],
})
export class ClubsModule {}
