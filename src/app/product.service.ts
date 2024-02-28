import { Injectable } from '@angular/core';
import { Model, Product } from './Model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl:string="http://localhost:5263/api/";
  model =new Model();
  constructor(
    private http:HttpClient
  ) { }

  getProduct():Observable<Product[]>{
   return this.http.get<Product[]>(this.baseUrl+"Product/Get");
  }

  addProduct(product:Product):Observable<Product>{
   return this.http.post<Product>(this.baseUrl+"Product/Create",product)
  }
  updateProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.baseUrl+"Product/Update",product)
   }

   deleteProduct(id:any):Observable<Product>{
    return this.http.post<Product>(this.baseUrl+"Product/Delete/"+id+"",null)
   }
}
