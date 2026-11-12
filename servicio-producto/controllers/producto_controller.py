from sqlalchemy.orm import Session
from models.producto import Producto
from schemas.producto import ProductoCreate

def obtener_productos(db : Session):
    return db.query(Producto).all

def obtener_producto_id(db: Session, codigo: int):
    return db.query(Producto).filter(Producto.codigo == codigo)

#crear producto
def crear_producto(db: Session, producto: ProductoCreate):
    nuevo_producto = Producto(
        nombre=producto.nombre,
        descripcion=producto.descripcion,
        precio=producto.precio,
        stock=producto.stock
    )
    db.add(nuevo_producto)
    db.commit()

    return nuevo_producto

def modificar_producto(db: Session, codigo: int, producto_actualizado: ProductoCreate):
    producto_db = obtener_producto_id(db, codigo)
    
    if not producto_db:
        return None
    
    producto_db.nombre = producto_actualizado.nombre
    producto_db.descripcion = producto_actualizado.descripcion
    producto_db.precio = producto_actualizado.precio
    producto_db.stock = producto_actualizado.stock
    
    db.commit()
    db.refresh(producto_db)
    
    return producto_db


def eliminar_producto(db : Session, codigo : int):
    producto = obtener_producto_id(db,codigo)
    if not producto:
        return None
    db.delete(producto)
    db.commit()

    return producto