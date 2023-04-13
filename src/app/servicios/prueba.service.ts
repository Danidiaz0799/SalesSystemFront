import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modelos/product.model';

//prueba

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private apiUrl = 'https://localhost:7257/api/Sales';

  constructor(private http: HttpClient) { }

  traerDatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  enviarDatos(datos: any) {
    return this.http.post(this.apiUrl, datos);
  }

  actualizarDatos(producto: Product): Observable<Product> {
    const url = `${this.apiUrl}/${producto.saleId}`;
    return this.http.put<Product>(url, producto);
  }

  eliminarDato(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
