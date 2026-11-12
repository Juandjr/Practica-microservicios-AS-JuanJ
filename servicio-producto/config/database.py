from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base 

engine = create_engine("sqlite:///./producto.db")

sessionLocal = sessionmaker(
    autoflush=False
    autocommit=False
    bind=engine
)

Base = declarative_base()

def obtener_db():
    db = sessionLocal()
    try:
        yield db
    except:
        print("Ocurrio un problema al conectar a la base de datos")
    finally:
        db.close()