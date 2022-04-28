import { Module } from '@nestjs/common';
import { ClubsModule } from './clubs/clubs.module';

@Module({
  imports: [ClubsModule],
})
export class AppModule {}
