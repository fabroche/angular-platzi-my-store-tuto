import { Component, OnInit } from '@angular/core';
import { timeout, window } from 'rxjs';
import { IProduct } from './product.model';
import { EnumRegister } from './product.model';
import { IRegister } from './product.model';
import { uploadFile, downloadFileUrl } from 'src/firebase/config';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  // Common States
  scrollState = 0;
  aboutUs = faker.commerce.productDescription();

  // Products
  // Products List
  priceStartRange = 101;
  priceEndRange = 152;

  products: IProduct[] = [
    {
      name: faker.name.firstName(),
      price: Number(
        faker.commerce.price(this.priceStartRange, this.priceEndRange)
      ),
      image: '../assets/Doggys/doggy1.jpeg',
      category: 'all',
      description: faker.commerce.productDescription(),
    },
    {
      name: 'Gafas',
      price: Number(
        faker.commerce.price(this.priceStartRange, this.priceEndRange)
      ),
      image: '../assets/Doggys/doggy7.jpg',
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.name.firstName(),
      price: Number(
        faker.commerce.price(this.priceStartRange, this.priceEndRange)
      ),
      image: '../assets/Doggys/doggy8.jpg',
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.name.firstName(),
      price: Number(
        faker.commerce.price(this.priceStartRange, this.priceEndRange)
      ),
      image: '../assets/Doggys/doggy9.jpg',
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.name.firstName(),
      price: Number(
        faker.commerce.price(this.priceStartRange, this.priceEndRange)
      ),
      image: '../assets/Doggys/doggy5.avif',
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.name.firstName(),
      price: Number(
        faker.commerce.price(this.priceStartRange, this.priceEndRange)
      ),
      image: '../assets/Doggys/doggy3.jpeg',
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.name.firstName(),
      price: Number(
        faker.commerce.price(this.priceStartRange, this.priceEndRange)
      ),
      image: '../assets/Doggys/doggy6.jpeg',
      description: faker.commerce.productDescription(),
    },
    {
      name: `the ${faker.name.firstName()}s`,
      price: Number(
        faker.commerce.price(this.priceStartRange, this.priceEndRange)
      ),
      image: '../assets/Doggys/doggy4.jpeg',
      description: faker.commerce.productDescription(),
    },
    {
      name: 'Casa para perro',
      price: 50,
      image: '../assets/house.jpg',
      description: faker.commerce.productDescription(),
    },
  ];

  productsLocalStorage: IProduct[] =
    JSON.parse(localStorage.getItem('productos')!) || [];

  // Product States
  // Register Form

  formLoading = false;

  newProductRegister: IProduct = {
    name: '',
    price: 0,
    image: '',
    description: '',
  };
  storeFormImg = '../assets/add4.jpg';
  toUploadFile: File | null = null;
  imageUrl: string | null = null;
  productName = '';
  productPrice = undefined;
  productDescription = '';

  // Store
  //Store States
  storeMinHeight = this.onResizeHandle();
  staggerDelay = 100;
  showbuyNotification = false;
  facebookIcon = '../assets/facebook.png';
  instagramIcon = '../assets/insta.png';
  twitterIcon = '../assets/twitter.png';

  // Services

  // General
  onScroll(event: Event) {
    if (event) {
      const element = event.target as HTMLUListElement;
      console.log('scroll :>> ', element);
    }
    this.scrollState = scrollY;
    console.log(this.scrollState);
  }

  ngOnInit() {
    // Scroll to top of page after loading
    // window.scrollTo(0, 0);
    // localStorage.setItem('products', this.productsLocalStorage);
    this.productsLocalStorage.push(...this.products);
    console.log('products :>> ', this.productsLocalStorage);
    this.storeMinHeight = this.onResizeHandle();
  }

  // ngOnChange() {
  //   this.onResizeHandle();
  // }
  // Product

  buyProduct(index: number) {
    this.selledProductAnimation(index);
    console.log('scroll :>> ', scrollY);
    this.buyAnimation();
  }

  selledProductAnimation(index: number) {
    let selledProduct = document.getElementById(`${index}`);
    if (selledProduct) {
      selledProduct.className = selledProduct.className + ' inactive';
    }
    setTimeout(() => {
      this.productsLocalStorage.splice(index, 1);
      localStorage.setItem(
        'productos',
        JSON.stringify(this.productsLocalStorage)
      );
      this.showbuyNotification = true;
    }, 500);
  }

  async buyAnimation() {
    // Creando Notificacion de Compra

    const divNotificationContainer = document.querySelector(
      '.store-buy-notification-container'
    )!;

    const liNotification = document.createElement('li');

    liNotification.classList.add('store-buy-notification');

    let notificationStyles: string = [
      'justify-content: center;',
      'align-items: center;',
      'margin: 20px;',
      'color: aliceblue;',
      'background: darkslategrey;',
      'font-weight: bold;',
      'padding: 5px;',
      'width: 50px;',
      'height: 0;',
      'opacity: 0;',
      'border-radius: 5px;',
      'display: flex;',
      'transition: all 200ms;',
    ].join('');

    let notificationStylesActive = notificationStyles.replace(
      'width: 50px;height: 0;opacity: 0;',
      'width: 200px;height: 40px;opacity: 1;'
    );

    liNotification.setAttribute('style', `${notificationStyles}`);

    const p = document.createElement('p');

    const notificationText = document.createTextNode(
      '🎁 Gracias por Elegirnos'
    );

    p.appendChild(notificationText);
    
    divNotificationContainer.appendChild(liNotification);

    liNotification.appendChild(p);

    await setTimeout(() => {
      liNotification.setAttribute('style', `${notificationStylesActive}`);
    }, 400);
    await setTimeout(() => {
      liNotification.setAttribute('style', `${notificationStyles}`);
      setTimeout(() => liNotification.remove(), 200);
    }, 2000);

  }
  buyAnimationStatus() {
    return this.showbuyNotification;
  }

  async onAddProduct(event: Event) {
    event.preventDefault();
    this.formLoading = true;
    if (this.toUploadFile) {
      console.log('newProductRegister :>> ', this.newProductRegister);
      // 1 - subir el fichero
      await uploadFile(this.toUploadFile);
      // 2 - obtener la ruta de la imagen
      this.imageUrl = await downloadFileUrl(this.toUploadFile);
      // 3 - construir nuevo Producto
      this.newProductRegister.image = this.imageUrl;
      this.newProductRegister.name = this.productName;
      this.newProductRegister.price = this.productPrice;
      this.newProductRegister.description = this.productDescription;
      this.storeFormImg = '../assets/add4.jpg';
      this.toUploadFile = null;
      // 4 - vaciar Form
      const formElement = document.getElementById(
        'store-form-products'
      ) as HTMLFormElement;
      formElement.reset();
    }
    // 5 - agregar el nuevo producto a la lista
    //para local storage
    this.productsLocalStorage.push(this.newProductRegister);
    // 6 - vaciar register para evitar mutacion
    this.newProductRegister = {
      name: '',
      image: '',
      price: 0,
      description: '',
    };
    localStorage.setItem('products', JSON.stringify(this.productsLocalStorage));
    this.formLoading = false;
    console.log('this.productsLocalStorage :>> ', this.productsLocalStorage);
  }

  // Store

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement; // Convertir event.target a HTMLInputElement

    // Verificar si el objeto no es null y si posee archivos seleccionados
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      // Obtener el archivo seleccionado
      const file = fileInput.files[0];
      // Crear la URL del objeto URL con el archivo seleccionado
      const imgUrl = URL.createObjectURL(file);
      this.storeFormImg = imgUrl;
      // Salvar Estado del archivo a subir
      this.toUploadFile = file;
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
  onResizeHandle(event?: Event) {
    const lastElement = document.querySelector('#footer');
    const firstElement = document.querySelector('#navbar');
    if (firstElement && lastElement) {
      const firstElementHeight = lastElement.getBoundingClientRect().height;
      const lastElementHeight = lastElement.getBoundingClientRect().height;
      const storeMinHeight =
        innerHeight - (firstElementHeight + lastElementHeight);
      console.log('resizing');
      return storeMinHeight;
    }
    console.log('resizing2');
    return innerHeight;
  }

  // Dynamic Forms
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
}
