import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cita {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  especialidad: string;

  @Column()
  doctor: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column()
  hora: string;

  @Column({ nullable: true })
  notas: string;
}
