import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from 'grpc';
import { Observable } from 'rxjs';
import { ClubsResult, EmptyParam } from './clubs.interface';

class HandleClubsService {
  getClubs: (
    pEmpty: EmptyParam,
    metadata?: Metadata,
  ) => Observable<ClubsResult>;
}
@Injectable()
export class ClubsService {
  private handleClubsSPService: HandleClubsService;
  private handleClubsBueService: HandleClubsService;

  constructor(
    @Inject('CLUBS_SP_PACKAGE') private clientClubsSP: ClientGrpc,
    @Inject('CLUBS_BUE_PACKAGE') private clientClubsBue: ClientGrpc,
  ) {}

  onModuleInit() {
    this.handleClubsSPService =
      this.clientClubsSP.getService<HandleClubsService>('HandleClubsService');
    this.handleClubsBueService =
      this.clientClubsBue.getService<HandleClubsService>('HandleClubsService');
  }

  async getClubs(): Promise<ClubsResult> {
    const clubsSP = await this.handleClubsSPService.getClubs({}).toPromise();
    const clubsBue = await this.handleClubsBueService.getClubs({}).toPromise();
    return { clubs: clubsSP.clubs.concat(clubsBue.clubs).sort() };
  }
}
