import { Injectable } from '@nestjs/common';
import { ClubsResult } from './clubs.interface';

@Injectable()
export class ClubsService {
  getClubs(): Promise<ClubsResult> {
    return Promise.resolve({
      clubs: ['River Plate', 'Independiente', 'Velez', 'Lanús', 'Racing'],
    });
  }
}
