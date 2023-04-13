import { Component } from '@angular/core';
import { PruebaService } from 'src/app/servicios/prueba.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/modelos/product.model';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {

  datos = {
    advisorId:'',
    date:'',
    description:'',
    price:'',
    saleStatusId:'',
    customerId:''
  };

  products: Product[] = [];
  productsSelect: any = null;

  constructor(private servicioPrueba: PruebaService, private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.servicioPrueba.traerDatos().subscribe(
      (data: Product[]) => {
        console.log(data);
        this.products = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  sendData() {
    this.servicioPrueba.enviarDatos(this.datos).subscribe(
      respuesta => {
        console.log(respuesta);
        // Hacer algo con la respuesta del servidor
      },
      error => {
        console.log(error);
        // Manejar el error de la petición
      }
    );
  }

  updateData(producto: Product) {
    // Asignar el producto seleccionado a la variable para mostrarlo en el formulario
    this.productsSelect = producto;
  }

  saveData() {
    // Guardar los cambios en el producto seleccionado mediante el servicio
    this.servicioPrueba.actualizarDatos(this.productsSelect);
    // Reiniciar la variable productoSeleccionado para ocultar el formulario
    this.productsSelect = null;
  }

  deleteData(id: number): void {
    this.servicioPrueba.eliminarDato(id).subscribe(
      respuesta => {
        console.log(respuesta);
        // Hacer algo con la respuesta del servidor
      },
      error => {
        console.log(error);
        // Manejar el error de la petición
      }
    );
  }

}