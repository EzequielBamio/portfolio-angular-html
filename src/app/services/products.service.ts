import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  loading = true;
  products: Product[] = [];
  productsFilter: Product[] = [];
  url = 'https://angular-html-9ea60-default-rtdb.firebaseio.com';
  constructor( private http: HttpClient ) 
  {
    this.loadProducts();
  }


  private loadProducts()
  {

    return new Promise<void>( ( resolve, reject ) => {

      this.http.get(`${ this.url }/products_idx.json`)
        .subscribe( (resp : any) => {

          this.products = resp;
          this.loading = false;
          resolve();

        });

    });

  }

  getProduct( id: string )
  {
    return this.http.get(`${ this.url }/products/${id}.json`);
  }

  searchProduct( value: string )
  {
    if( this.products.length === 0 )
    {
      this.loadProducts().then( () => {

        this.filterProducts( value );

      });
    }else
    {
      this.filterProducts( value );
    }  
  }

  private filterProducts( value: string )
  {
    this.productsFilter = [];

    value = value.toLocaleLowerCase();

    this.products.forEach( ( product ) => {

      const titleLower = product.titulo.toLocaleLowerCase();

      if( product.categoria.indexOf( value ) >= 0 || titleLower.indexOf( value ) >= 0 )
      {
        this.productsFilter.push( product );
      }

    });
  }


}
