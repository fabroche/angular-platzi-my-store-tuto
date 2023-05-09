import { Component, OnInit } from '@angular/core';
import { timeout, window } from 'rxjs';
import { IProduct } from './product.model';
import { EnumRegister } from './product.model';
import { IRegister } from './product.model';
import { uploadFile, downloadFileUrl } from 'src/firebase/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  // Common States
  scrollState = 0;
  // Products
  // Products List
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

  productsLocalStorage: IProduct[] = JSON.parse(
    localStorage.getItem('products') || ''
  );

  // Product States
  // Register Form
  newProductRegister: IProduct = {
    name: '',
    price: 0,
    image: '',
  };
  storeFormImg = '../assets/add4.jpg';
  toUploadFile: File | null = null;
  imageUrl: string | null = null;
  productName = '';
  productPrice = 0;

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
    this.onResizeHandle();
  }

  // Product

  buyProduct(index: number) {
    this.selledProductAnimation(index);
    console.log('scroll :>> ', scrollY);
    setTimeout(() => this.buyAnimation(), 2000);
  }

  selledProductAnimation(index: number) {
    let selledProduct = document.getElementById(`${index}`);
    if (selledProduct) {
      selledProduct.className = selledProduct.className + ' inactive';
    }
    setTimeout(() => {
      this.productsLocalStorage.splice(index, 1);
      localStorage.setItem(
        'products',
        JSON.stringify(this.productsLocalStorage)
      );
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

  async onAddProduct() {
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
    };
    localStorage.setItem('products', JSON.stringify(this.productsLocalStorage));
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
        innerHeight - (Math.round(firstElementHeight / 2) + lastElementHeight);
      console.log('resizing');
      this.storeMinHeight = storeMinHeight;
      return storeMinHeight;
    }
    this.storeMinHeight = innerHeight;
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
