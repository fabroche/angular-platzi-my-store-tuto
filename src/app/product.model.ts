export interface IProduct {
  name: string;
  price: number;
  image: string;
  category?: string;
}

export enum EnumRegister {
  name = 'text',
  email = 'text',
  password = 'text',
}

export interface IRegister {
  name?: string;
  email?: string;
  password?: string;
}
