import type { FastifyInstance } from "fastify";
import {
  obtenerClientes,
  obtenerClienteID,
  crearCliente,
  actualizarClienteID,
  eliminarCliente,
} from "../controllers/cliente.controller";

export const clienteRouter = (app: FastifyInstance) => {
  app.get("/clientes", obtenerClientes);

  app.get("/clientes/:id", async (req, res) => {
    try {
      const { id } = req.params as any;
      await obtenerClienteID(id);
    } catch (error) {
      console.log("Error al obtener al cliente");
      res.code(400).send({ mensaje: "Error al obtener el cliente" });
    }
  });

  app.post("/clientes", async (req, res) => {
    try {
      const { nombre, direccion, telefono } = (req.body as any) || {};
      if (!nombre?.trim() || !direccion?.trim() || !telefono?.trim()) {
        res.code(400).send({
          mensaje: "El nombre, dirección y teléfono son obligatorios.",
        });
      } else if (!/^\d{10}$/.test(telefono.trim())) {
        res.code(400).send({
          mensaje: "El teléfono debe contener exactamente 10 dígitos.",
        });
      } else {
        const cliente = await crearCliente(req.body);
        res.code(201).send(cliente);
      }
    } catch (error) {
      console.log("Error al crear el cliente");
      res.code(400).send({ mensaje: "Error al crear el cliente" });
    }
  });

  app.put("/clientes/:id", async (req, res) => {
    try {
      const { id } = req.params as any;
      const { nombre, direccion, telefono } = (req.body as any) || {};

      if (!nombre?.trim() || !direccion?.trim() || !telefono?.trim()) {
        res.code(400).send({
          mensaje: "El nombre, dirección y teléfono son obligatorios.",
        });
      } else if (!/^\d{10}$/.test(telefono.trim())) {
        res.code(400).send({
          mensaje: "El teléfono debe contener exactamente 10 dígitos.",
        });
      } else {
        return await actualizarClienteID(id, req.body);
      }
    } catch (error) {
      console.log("Error al actualizar el cliente");
      res.code(400).send({ mensaje: "Error al actualizar el cliente" });
    }
  });

  app.delete("/clientes/:id", async (req, res) => {
    try {
      const { id } = req.params as any;
      return await eliminarCliente(id);
    } catch (error) {
      console.log("Error al eliminar el cliente");
      res.code(400).send({ mensaje: "Error al eliminar el cliente" });
    }
  });
};
