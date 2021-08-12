import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { Vaccine } from './entities/vaccine.entity';

@Controller('vaccine')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Post('')
  async postVacc(@Body() newVacc: CreateVaccineDto): Promise<Vaccine>{
    const vacc = new Vaccine();
    vacc.name = newVacc.name;
    vacc.amount = newVacc.amount;
    vacc.lat = newVacc.lat;
    vacc.long = newVacc.long;
    vacc.description = newVacc.description;
    return await this.vaccineService.createOrUpdate(vacc);
  }

  @Get()
  async getAllVaccs(): Promise<Vaccine[]> {
    return await this.vaccineService.findAll();
  }

  @Get(':id')
  async getVacc(@Param('id') id:number ): Promise<Vaccine>{
    return await this.vaccineService.findOne(id);
  }

  @Put(':id')
  async updateVacc(
    @Param('id') id:number,
    @Body() createVaccDto: CreateVaccineDto,
  ):Promise<Vaccine>{
    const vacc = await this.vaccineService.findOne(id);
    vacc.name = createVaccDto.name;
    vacc.amount = createVaccDto.amount;
    vacc.lat = createVaccDto.lat;
    vacc.long = createVaccDto.long;
    vacc.description = createVaccDto.description;
    return await this.vaccineService.createOrUpdate(vacc);
    
  }

  @Delete(':id')
  async deleteVacc(@Param('id') id:number): Promise<any>{
    await this.vaccineService.delete(id);
    return { seccess : true };
  }


}
