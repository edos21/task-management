from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, Text
from app.extensions import db

class TaskModel(db.Model):
    __tablename__ = "task"

    id = Column(Integer, primary_key=True)
    title = Column(String(180), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(180), nullable=False)
    due_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"""
            task:
                id: {self.id},
                title: {self.title}
        """
