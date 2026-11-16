from fastapi import FastAPI
from config.database import engine, Base
from router.producto_router import router as product_router

app = FastAPI(
    title= "Servicio producto",
    description = "Servicio desarrollado en Clase de Arquitectura de Software",
    version = "1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(product_router, prefix="/api")

@app.get("/")
def inicio():
    return {"mensaje" : "Servicio factura ejecutandose correctamente"}