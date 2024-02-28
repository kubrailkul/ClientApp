import { Component, EventEmitter, Output } from '@angular/core';
import { Model, Product } from '../Model';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  title = 'App';
  categoryName="Telefon";
  item:Product=new Product();
  productList:Product[]=[];
  selectedProduct:Product=new Product();
  
  constructor (private productService:ProductService){

  }  


  ngOnInit():void{
   this.getProducts();
  }

  getProducts() {
     this.productService.getProduct().subscribe(products=>
      {
          this.productList=products;
      }
      );
  }

  model=new Model();

  getName(){
    return this.model.categoryName;
  }

   addProduct(){
    debugger;
    try {
      if(!this.selectedProduct.id){
        var result= this.productService.addProduct(this.selectedProduct).subscribe();
        Swal.fire("Ürün başarıyla eklendi");
      } 
    else{
      var result= this.productService.updateProduct(this.selectedProduct).subscribe();
      Swal.fire("Ürün başarıyla güncellendi");
    }
 
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hata meydana geldi",
      });
    }finally{
     this.item=new Product();
     this.getProducts();
    }  

   }


   editProduct(item:any){
    this.selectedProduct=Object.assign(item);
   }

   async deleteProduct(item:any){
    Swal.fire({
      title: "Product will be deleted. Are you sure?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          this.productService.deleteProduct(item.id);
          Swal.fire("Product succesfully deleted");
        } catch (error) {
          console.log(error);
        } finally{
          this.getProducts();
        }   
      } else if (result.isDenied) {
 
      }
    });

  

   }

  counterValue = 0;

  handleCountChange(count: number) {
    this.counterValue = count;
  }
}
