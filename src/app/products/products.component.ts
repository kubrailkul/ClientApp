import { Component, EventEmitter, Output } from '@angular/core';
import { Model, Product } from '../Model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  title = 'SocialApp';
  categoryName="Telefon";
  item:Model=new Model();
  productList:Product[]=[];
  selectedProduct!:Product;
  constructor (private productService:ProductService){

  }  


  ngOnInit():void{
    this.productList=this.productService.getProduct();
  }

  model=new Model();

  getName(){
    return this.model.categoryName;
  }

  addProduct(name:any,price:any,isActive:boolean){

    const p=new Product(this.productService.getProduct().length+1,name,price,isActive)
    this.productService.addProduct(p);
  }


  counterValue = 0;

  handleCountChange(count: number) {
    this.counterValue = count;
  }
}
