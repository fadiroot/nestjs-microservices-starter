// appointment-service/src/appointment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  doctorId: number;

  @Column()
  dateTime: Date;

  // Other fields...
}