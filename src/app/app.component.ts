import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { IProduct } from './product.model';
import { EnumRegister } from './product.model';
import { IRegister } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  widthImg = 10;
  title = 'my-store1';
  name = 'Frank';
  age = 24;
  img = 'https://images6.alphacoders.com/106/thumb-1920-1065654.png';
  styles_absoluteCenter =
    'display: flex; justify-content: center; align-items: center;';
  btnDisabled = true;
  register: IRegister = {
    name: '',
    email: '',
    password: '',
  };
  person = {
    name: 'Frank',
    age: 24,
    avatar: 'https://images6.alphacoders.com/106/thumb-1920-1065654.png',
  };

  names: string[] = ['Nico', 'Juli', 'Santi'];
  newName = '';
  box = {
    width: 100,
    height: 100,
    background: 'red',
  };

  products: IProduct[] = [
    {
      name: 'EL mejor juguete',
      price: 565,
      image: '../assets/toy.jpg',
      category: 'all',
    },
    {
      name: 'Bicicleta casi nueva',
      price: 356,
      image: '../assets/bike.jpg',
    },
    {
      name: 'Colleción de albumnes',
      price: 34,
      image: '../assets/album.jpg',
    },
    {
      name: 'Mis libros',
      price: 23,
      image: '../assets/books.jpg',
    },
    {
      name: 'Casa para perro',
      price: 34,
      image: '../assets/house.jpg',
    },
    {
      name: 'Gafas',
      price: 3434,
      image: '../assets/glasses.jpg',
    },
  ];

  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }
  increaseAge() {
    this.person.age += 1;
  }
  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    console.log('scroll :>> ', element.scrollTop);
  }

  changeName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.person.name = element.value;
  }
  addName() {
    this.names.push(this.newName);
    this.newName = '';
  }
  deleteName(index: number) {
    this.names.splice(index, 1);
  }
  deleteProduct(index: number) {
    const selled_product = this.products[index];
    this.products.splice(index, 1);
    setTimeout(() => alert(`Compra exitosa de ${selled_product.name}`), 200);
  }

  getObjectLabelList(object: IRegister): string[] {
    return Object.keys(object);
  }

  getObjectTypeList(object: IRegister): string[] {
    const myLabels = this.getObjectLabelList(object);
    const myTypes = Object.values(object);

    for (let index = 0; index < myTypes.length; index++) {
      if (typeof myTypes[index] === 'string') {
        if (myLabels[index] === 'name') {
          myTypes[index] = 'text';
        } else {
          myTypes[index] = myLabels[index];
        }
      }
      if (typeof myTypes[index] === 'number') {
        myTypes[index] = 'number';
      }
    }

    console.log('myTypes :>> ', myTypes);
    return myTypes;
  }
  onRegister(){
    console.log('register :>> ', this.register);
  }
}
