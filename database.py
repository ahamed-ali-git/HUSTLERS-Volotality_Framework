from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()

class Analysis(Base):
    __tablename__ = 'analyses'

    id = Column(Integer, primary_key=True)
    file_id = Column(String, nullable=False)
    plugin = Column(String, nullable=False)
    status = Column(String, nullable=False)
    results = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

engine = create_engine('sqlite:///volatility_ui.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

def add_analysis(file_id, plugin):
    session = Session()
    analysis = Analysis(file_id=file_id, plugin=plugin, status='in_progress')
    session.add(analysis)
    session.commit()
    return analysis.id

def update_analysis_status(analysis_id, status, results=None):
    session = Session()
    analysis = session.query(Analysis).get(analysis_id)
    if analysis:
        analysis.status = status
        analysis.results = results
        session.commit()

def get_analysis(analysis_id):
    session = Session()
    return session.query(Analysis).get(analysis_id)

def list_analyses():
    session = Session()
    return session.query(Analysis).all()