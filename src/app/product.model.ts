export interface IProduct {
  name: string;
  price: number | undefined;
  image: string;
  category?: string;
  description?: string;
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
