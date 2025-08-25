import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/citas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita])],
  providers: [CitasService],
  controllers: [CitasController]
})
export class CitasModule {}
