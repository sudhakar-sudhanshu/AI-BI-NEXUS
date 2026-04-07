from sqlalchemy import Column, Integer, String
from app.database.connection import engine
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    rows = Column(Integer)

Base.metadata.create_all(bind=engine)