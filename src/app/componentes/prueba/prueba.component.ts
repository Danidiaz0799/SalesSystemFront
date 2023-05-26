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
  productNames: number[] = [];
  i: any;
  listaDatos: any[] = [];

  constructor(private servicioPrueba: PruebaService, private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.servicioPrueba.traerDatos().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getDataById(id: number): void {
    this.servicioPrueba.traerDatoPorId(id).subscribe(
      (data: Product) => {
        console.log(data);
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
      },
      error => {
        console.log(error);
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
        this.reloadData(); // Llamamos a la función para actualizar la tabla
      },
      error => {
        console.log(error);
        // Manejar el error de la petición
      }
    );
  }

  reloadData(): void {
    this.servicioPrueba.traerDatos().subscribe(
      datos => {
        this.listaDatos = datos; // Actualizamos la variable con los datos obtenidos
      },
      error => {
        console.log(error);
        // Manejar el error de la petición
      }
    );
  }

  getColor(saleStatusId: number): string {
    switch(saleStatusId) {
      case 1: return 'green';
      case 2: return 'pink';
      case 3: return 'red';
      default: return 'white';
    }
  }

}