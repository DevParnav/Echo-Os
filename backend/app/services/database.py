import os
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
import datetime

Base = declarative_base()

class MemoryEntry(Base):
    __tablename__ = 'memories'

    id = Column(Integer, primary_key=True, index=True)
    memory_type = Column(String(50), index=True) # e.g., 'Preference', 'Fact', 'Goal', 'Project', 'Hardware'
    subject = Column(String(100), index=True)    # e.g., 'Theme', 'DSA', 'EchoOS'
    value = Column(Text)                         # e.g., 'Dark', 'Interest', 'Active'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class DatabaseService:
    def __init__(self, workspace_path: str):
        db_path = os.path.join(workspace_path, "memory.sqlite")
        self.engine = create_engine(f"sqlite:///{db_path}", connect_args={"check_same_thread": False})
        Base.metadata.create_all(bind=self.engine)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

    def get_session(self):
        return self.SessionLocal()
    
    def save_memory(self, memory_type: str, subject: str, value: str):
        session = self.get_session()
        try:
            entry = MemoryEntry(memory_type=memory_type, subject=subject, value=value)
            session.add(entry)
            session.commit()
            session.refresh(entry)
            return entry
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    def get_memories_by_type(self, memory_type: str):
        session = self.get_session()
        try:
            return session.query(MemoryEntry).filter(MemoryEntry.memory_type == memory_type).all()
        finally:
            session.close()

    def get_all_memories(self):
        session = self.get_session()
        try:
            return session.query(MemoryEntry).all()
        finally:
            session.close()
