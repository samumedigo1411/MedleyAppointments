import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/citas.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    const { fecha, hora } = createCitaDto;

    const fechaHora = new Date(`${fecha}T${hora}:00`);
    if (fechaHora < new Date()) {
      throw new BadRequestException('No puedes registrar citas en el pasado');
    }

    const nuevaCita = this.citaRepository.create({
      ...createCitaDto,
      fecha: fechaHora,
    });

    return this.citaRepository.save(nuevaCita);
  }

  async findAll(): Promise<Cita[]> {
    return this.citaRepository.find({
      order: { fecha: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Cita> {
    const cita = await this.citaRepository.findOneBy({ id });
    if (!cita) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
    return cita;
  }

  async update(id: number, updateCitaDto: UpdateCitaDto): Promise<Cita> {
    const cita = await this.findOne(id);

    if (updateCitaDto.fecha && updateCitaDto.hora) {
      const fechaHora = new Date(`${updateCitaDto.fecha}T${updateCitaDto.hora}:00`);
      if (fechaHora < new Date()) {
        throw new BadRequestException('No puedes programar citas en el pasado');
      }
      cita.fecha = fechaHora;
    }

    Object.assign(cita, updateCitaDto);
    await this.citaRepository.save(cita);
    return cita;
  }

  async remove(id: number): Promise<void> {
    const result = await this.citaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
  }
}
