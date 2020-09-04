import { map, catchError } from 'rxjs/operators';
import { Product } from './product.model';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {

    this.snackBar.open(msg, 'x', {

      duration: 3000,

      horizontalPosition: "right",

      verticalPosition: "top",

      panelClass: isError ? ['msg-error'] : ['msg-success']

    })

  }

  createProduct(product: Product): Observable<Product> {

    return this.http.post<Product>(this.baseUrl, product).pipe(map(obj => obj),

      catchError(e => this.errorHandler(e))

    );

  }

  errorHandler(e: any): Observable<any> {

    this.showMessage("Ocorreu um erro!", true);

    return EMPTY


  }

  readProduct(): Observable<Product[]> {

    return this.http.get<Product[]>(this.baseUrl).pipe(map(obj => obj),

      catchError(e => this.errorHandler(e))

    );;

  }

  readProductById(id: String): Observable<Product> {

    const url = `${this.baseUrl}/${id}`;

    return this.http.get<Product>(url).pipe(map(obj => obj),

      catchError(e => this.errorHandler(e))

    );;

  }

  updateProduct(product: Product): Observable<Product> {

    const url = `${this.baseUrl}/${product.id}`;

    return this.http.put<Product>(url, product).pipe(map(obj => obj),

      catchError(e => this.errorHandler(e))

    );;

  }

  deleteProduct(product: Product): Observable<Product> {

    const url = `${this.baseUrl}/${product.id}`;

    return this.http.delete<Product>(url).pipe(map(obj => obj),

      catchError(e => this.errorHandler(e))

    );;

  }

}
