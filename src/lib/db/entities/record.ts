import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  incomeTop10: number;

  @Column()
  wealthTop10: number;

  @Column()
  incomeBottom50: number;

  @Column()
  wealthBottom50: number;
}
