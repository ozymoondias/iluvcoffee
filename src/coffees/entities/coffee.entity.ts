export class Coffee {
  _id: string;
  name: string;
  brand: string;
  flavors: string[];
}

export class CoffeeDto {
  data: {
    coffee: Coffee;
  };
}
