import {
  Controller,
  Body,
  Delete,
  Get,
  Post,
  Put,
  Patch,
  Param,
} from '@nestjs/common';
import { FacturaService } from './factura.service.js';

@Controller('facturas')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Get()
  listar() {
    return this.facturaService.listar();
  }

  @Get(':codigo')
  consultar(@Param('codigo') codigo: string) {
    return this.facturaService.consultar(codigo);
  }

  @Post()
  crear(@Body() data: any) {
    this.facturaService.crear(data);
    return 'Factura creada correctamente';
  }

  @Patch(':codigo')
  actualizar(@Param('codigo') codigo: string, @Body() data: any) {
    this.facturaService.actualizar(codigo, data);
  }

  @Delete(':codigo')
  eliminar(@Param('codigo') codigo: string) {
    this.facturaService.eliminar(codigo);
  }

  @Post(':codigo/detalles')
  agregarDetalle(@Param('codigo') codigo: string, @Body() data: any) {
    return this.facturaService.agregarDetalle(codigo, data);
  }

  @Delete(':codigo/detalles/:codigoDetalle')
  eliminarDetalle(
    @Param('codigo') codigo: string,
    @Param('codigoDetalle') codigoDetalle: number,
  ) {
    return this.facturaService.eliminarDetalle(codigo, codigoDetalle);
  }

  @Patch(':codigo/detalles/:codigoDetalle')
  actualizarDetalle(
    @Param('codigo') codigo: string,
    @Param('codigoDetalle') codigoDetalle: number,
    @Body() data: any,
  ) {
    return this.facturaService.actualizarDetalleFactura(
      codigo,
      codigoDetalle,
      data,
    );
  }
}
