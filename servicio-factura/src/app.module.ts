import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { FacturaModule } from './modules/factura/factura.module.js';
import { ClienteServiceService } from './cliente-service/cliente-service.service.js';
import { ServiceService } from './cliente-service/service/service.service.js';

@Module({
  imports: [FacturaModule],
  controllers: [AppController],
  providers: [AppService, ClienteServiceService, ServiceService],
})
export class AppModule {}
