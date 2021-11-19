import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Guid } from 'guid-typescript';
import { Coffee, CoffeeDto } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      _id: Guid.raw(),
      name: 'Elegance',
      brand: 'Mountain Man Coffee Company',
      flavors: ['mocha'],
    },
    {
      _id: Guid.raw(),
      name: 'Stoopidly Delicious Coffee',
      brand: 'Burnt Peach Beverage Slingers',
      flavors: ['Tropical Freeze Cappuccino'],
    },
  ];

  public findAll(): Coffee[] {
    return this.coffees;
  }

  public findOne(id: string): Coffee {
    const coffee = this.coffees.find((c) => c._id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found.`);
    }
    return coffee;
  }

  public create(coffee: CreateCoffeeDto): Coffee[] {
    const newCoffee = { _id: Guid.raw(), ...coffee };
    this.coffees.push(newCoffee);
    return this.coffees;
  }

  public update(id: string, coffee: UpdateCoffeeDto): Coffee[] {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      const index = this.coffees.findIndex((c) => c._id === id);
      this.coffees[index] = { ...this.coffees[index], ...coffee };
      return this.coffees;
    }
  }

  public remove(id: string): Coffee[] {
    this.coffees = this.coffees.filter((c) => c._id !== id);
    return this.coffees;
  }
}
