import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  async create(@Body() createCitaDto: CreateCitaDto) {
    return this.citasService.create(createCitaDto);
  }

  @Get()
  async findAll() {
    return this.citasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.citasService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citasService.update(+id, updateCitaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.citasService.remove(+id);
  }
}
