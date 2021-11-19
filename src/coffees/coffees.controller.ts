import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeesService } from './coffees.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  public findAll(@Query() paginationQuery): Coffee[] {
    const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Coffee {
    return this.coffeesService.findOne(id);
  }

  @Post()
  public create(@Body() createCoffeeDto: CreateCoffeeDto): Coffee[] {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): Coffee[] {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Coffee[] {
    return this.coffeesService.remove(id);
  }
}
