import { Controller, Get } from '@nestjs/common';
import { ClubsService } from './clubs.service';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  getClubs(): Promise<unknown> {
    return this.clubsService.getClubs();
  }
}
