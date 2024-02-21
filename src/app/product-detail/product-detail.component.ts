import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../Model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
@Input() product!:Product;
@Output() countChange = new EventEmitter<number>();
count=0;
increment() {
  this.count++;
  this.countChange.emit(this.count);
}

decrement() {
  this.count--;
  this.countChange.emit(this.count);
}
}
