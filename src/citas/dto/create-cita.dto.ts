import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';

export class CreateCitaDto {
  @IsNotEmpty({ message: 'La especialidad es obligatoria' })
  @IsString()
  especialidad: string;

  @IsNotEmpty({ message: 'El doctor es obligatorio' })
  @IsString()
  doctor: string;

  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe tener el formato YYYY-MM-DD' })
  fecha: string;

  @IsNotEmpty({ message: 'La hora es obligatoria' })
  @Matches(/^\d{2}:\d{2}$/, { message: 'La hora debe tener el formato HH:mm' })
  hora: string;

  @IsOptional()
  @IsString()
  notas?: string;
}

