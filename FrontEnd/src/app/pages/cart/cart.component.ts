import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';
import { ProductsService } from 'src/app/services/product/products.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  product:any
  cart:[]
  faSearch = faSearch;

err: string = null;
loading:boolean = false
constructor(private router: Router,private activerouter: ActivatedRoute, private UserSer: UserService) { }

  ngOnInit(): void {
    this.activerouter.paramMap.subscribe((res:any)=>{
      // console.log(res)
    this.UserSer.getUser(res.params.id).subscribe(
      (res: any) => {
      this.cart = res.cart
      // console.log(res)
      // console.log("cart")
      // console.log(this.cart)
      }, err => {
        this.err = err?.error?.err || "Something went wrong";
      }
    )
  
    })
  }
  checkout(){
    const products = this.cart.map((cart:any)=>({
      product:cart.product,
      quantity:cart.quantity,
      priceatPurchase: cart.quantity * cart.productPrice,
      supplier:cart.supplier
    }))
    const order = {
      products,
      price: products.map(element=>element.priceatPurchase).reduce((a,b)=>a + b)
    }
    this.loading = true
      this.UserSer.checkout(order).subscribe( (res:any) =>{
        this.UserSer.decreasewalletandproductquantity(-order.price,order.products.map(element=>({quantity: -element.quantity,product:element.product}))).subscribe(res=>{
          // console.log(res)
          this.UserSer.clearcart().subscribe(orderres=>{
            this.router.navigateByUrl('viewmyorders')
          })
        })
      
      },
      err =>{
      this.err = err?.error?.err || "Something went wrong";
      this.loading = false;
      alert(this.err)

      }

      )
    //  this.router.navigateByUrl('payement')
  }
}
