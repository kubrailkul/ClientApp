export class Model{
    categoryName:any;
    products:Array<Product>;

    constructor(){
        this.categoryName="Telefon";
        this.products=[
            new Product(1,"Samsung","30000",true),
            new Product(2,"Iphone 13","40000",false)

        ];
    }
}

export class Product{
    id:any;
    name:any;
    price:any;
    isActive:any;

    constructor(id:any,name:any,price:any,isActive:any){
      this.id=id;
      this.name=name;
      this.price=price;
      this.isActive=isActive;
    }
}