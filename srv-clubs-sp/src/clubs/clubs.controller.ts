/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from 'grpc';
import { ClubsResult, EmptyParam } from './clubs.interface';
import { ClubsService } from './clubs.service';

@Controller('clubs')
export class ClubsController {
  logger = new Logger('ClubsController');

  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  getClubsHttp(): Promise<ClubsResult> {
    return this.clubsService.getClubs();
  }

  @GrpcMethod('HandleClubsService', 'getClubs')
  async getClubs(
    pEmpty: EmptyParam,
    metadata: Metadata,
    call: ServerUnaryCall<any>,
  ): Promise<ClubsResult> {
    const clubs = await this.clubsService.getClubs();
    this.logger.debug(`[GRPC] SP Clubs: ${JSON.stringify(clubs)}`);
    return clubs;
  }
}
