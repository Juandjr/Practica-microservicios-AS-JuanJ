import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Producto } from '../models/producto.model.js';

@Injectable()
export class ProductoClienteService {
  private readonly url = process.env.URL_SERVICE;
  async consultar(codigo: number): Promise<any> {
    try {
      const respuesta = await fetch(`${this.url}/${codigo}`);
      if (respuesta.status == 404) {
        throw new NotFoundException('No se encontro el producto');
      }
      if (!respuesta.ok) {
        throw new ServiceUnavailableException(
          'Error al consultar el microservicio producto',
        );
      }

      return (await respuesta.json()) as Producto;
    } catch (error) {
      console.log(error);
    }
  }
}
