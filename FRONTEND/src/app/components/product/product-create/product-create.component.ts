import { Product } from './../product.model';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

export class ProductCreateComponent implements OnInit {

  product: Product = {

    name: "",

    price: null

  }

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {

  }

  createProduct(): void {

    this.productService.createProduct(this.product).subscribe( _ => {

      this.productService.showMessage("Produto criado!");

      this.router.navigate(["/products"]);

    })

  }

  cancelProduct(): void {

    this.router.navigate(["/products"]);

  }

}
