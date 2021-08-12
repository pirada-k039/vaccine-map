import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vaccine extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column()
    amount: number;

    @Column('text')
    lat: string;

    @Column('text')
    long: string;

    @Column('text')
    description: string;

}
