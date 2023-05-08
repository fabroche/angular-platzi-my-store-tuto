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

  newProductRegister: IProduct = {
    name: '',
    price: 0,
    image: '',
  };

  storeFormImg = '../assets/add4.jpg';
  staggerDelay = 100;
  showbuyNotification = false;
  facebookIcon = '../assets/facebook.png';
  instagramIcon = '../assets/insta.png';
  twitterIcon = '../assets/twitter.png';

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
  buyProduct(index: number) {
    const selled_product = this.products[index];
    this.selledProductAnimation(index);
    setTimeout(() => this.buyAnimation(), 2000);
  }

  selledProductAnimation(index: number) {
    let selledProduct = document.getElementById(`${index}`);
    if (selledProduct) {
      selledProduct.className = selledProduct.className + ' inactive';
    }
    setTimeout(() => {
      this.products.splice(index, 1);
      this.showbuyNotification = true;
    }, 500);
  }

  buyAnimation() {
    let notification = document.querySelector('.store-buy-notification');

    if (notification) {
      notification.className.includes('inactive')
        ? (notification.className = notification.className.replace(
            'inactive',
            'active'
          ))
        : (notification.className = notification.className.replace(
            'active',
            'inactive'
          ));
    }
    setTimeout(() => (this.showbuyNotification = false), 800);
  }
  buyAnimationStatus() {
    return this.showbuyNotification;
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
  onRegister() {
    console.log('register :>> ', this.register);
  }
  onAddProduct() {
    console.log(URL.revokeObjectURL(this.newProductRegister.image));
    console.log('this.newProductRegister :>> ', this.newProductRegister);
    this.products.push(this.newProductRegister);
    // console.log('this.storeFormImg :>> ', this.storeFormImg);
  }
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement; // Convertir event.target a HTMLInputElement

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      // Verificar si el objeto no es null y si posee archivos seleccionados
      const file = fileInput.files[0]; // Obtener el archivo seleccionado
      const imgUrl = URL.createObjectURL(file);
      // Crear la URL del objeto URL con el archivo seleccionado
      this.storeFormImg = imgUrl;
    }
  }
  animationStoreItemsDelay(staggerDelay: number, index: number) {
    const delay = (index + 1) * staggerDelay;
    return delay;
  }
  animationStoreItemsFormDelay(staggerDelay: number, products: IProduct[]) {
    const delay = (products.length + 1) * staggerDelay;

    return delay;
  }
  ngOnInit() {
    // Scroll to top of page after loading
    window.scrollTo(0, 0);
  }
}
