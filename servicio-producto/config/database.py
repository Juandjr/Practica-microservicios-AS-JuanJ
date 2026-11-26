from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os 

# Carga las variables del archivo .env al entorno
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("No se encontró la variable DATABASE_URL en el archivo .env")

# connect_args={"check_same_thread": False} es recomendable si usas SQLite con FastAPI
engine = create_engine(
    DATABASE_URL
)

sessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=engine
)

Base = declarative_base()

def obtener_db():
    db = sessionLocal()
    try:
        yield db
    except Exception as e:
        print(f"Ocurrio un problema al conectar a la base de datos: {e}")
        raise
    finally:
        db.close()