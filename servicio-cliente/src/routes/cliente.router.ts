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
      const cliente = req.body;
      const nuevoCliente = await crearCliente(cliente);
      return res.code(201).send(nuevoCliente);
    } catch (error) {
      console.log("Error al crear el cliente");
      res.code(400).send({ mensaje: "Error al crear el cliente" });
    }
  });

  app.put("/clientes/:id", async (req, res) => {
    try {
      const { id } = req.params as any;
      const cliente = req.body;
      return await actualizarClienteID(id, cliente);
    } catch (error) {
      console.log("Error al crear el cliente");
      res.code(400).send({ mensaje: "Error al crear el cliente" });
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
