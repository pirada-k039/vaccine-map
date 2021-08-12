import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { Vaccine } from './entities/vaccine.entity';

@Injectable()
export class VaccineService {

  constructor(
    @InjectRepository(Vaccine)
    private readonly vaccRepository: Repository<Vaccine>,
  ){}

  async createOrUpdate(vacc: Vaccine): Promise<Vaccine> {
    return await this.vaccRepository.save(vacc);
  }

  async insert(vaccDetails: CreateVaccineDto): Promise<Vaccine> {
    const vaccEntity: Vaccine = Vaccine.create();
    const {name, amount, lat, long, description} = vaccDetails;
    vaccEntity.name = name;
    vaccEntity.amount = amount;
    vaccEntity.lat = lat;
    vaccEntity.long = long;
    vaccEntity.description = description;
    await Vaccine.save(vaccEntity);
    return vaccEntity;
  }

  async getAllVaccs(): Promise<Vaccine[]> {
    return await Vaccine.find();
  }

  async findOne(id: number):Promise<Vaccine> {
    return await this.vaccRepository.findOne({id:id});
  }

  async findAll():Promise<Vaccine[]>{
    return await this.vaccRepository.find();
  }

  async delete(id: number):Promise<DeleteResult>{
    return await this.vaccRepository.delete({id:id});
  }






  // create(createVaccineDto: CreateVaccineDto) {
  //   return 'This action adds a new vaccine';
  // }

  // findAll() {
  //   return `This action returns all vaccine`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} vaccine`;
  // }

  // update(id: number, updateVaccineDto: UpdateVaccineDto) {
  //   return `This action updates a #${id} vaccine`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} vaccine`;
  // }
}
