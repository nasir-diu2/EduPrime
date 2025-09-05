from fastapi import FastAPI, HTTPException, Depends, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime, timedelta
from typing import Optional, List
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
import os
from dotenv import load_dotenv
import uuid

load_dotenv()

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./education_website.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Security
SECRET_KEY = "your-secret-key-here-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

app = FastAPI(title="Education Website API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the upload directory and mount it so files are publicly accessible
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Database Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="user")
    created_at = Column(DateTime, default=datetime.utcnow)

class NavbarItem(Base):
    __tablename__ = "navbar_items"
    id = Column(Integer, primary_key=True, index=True)
    label = Column(String, nullable=False)
    link = Column(String, nullable=False)
    order = Column(Integer, default=0)
    parent_id = Column(Integer, nullable=True)
    has_dropdown = Column(Boolean, default=False)

class HeroSlider(Base):
    __tablename__ = "hero_sliders"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subtitle = Column(Text, nullable=False)
    image_url = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Statistic(Base):
    __tablename__ = "statistics"
    id = Column(Integer, primary_key=True, index=True)
    label = Column(String, nullable=False)
    value = Column(String, nullable=False)
    icon_url = Column(String, nullable=False)

class WhyChoose(Base):
    __tablename__ = "why_choose"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    icon_url = Column(String, nullable=False)

class Program(Base):
    __tablename__ = "programs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class AlumniTestimonial(Base):
    __tablename__ = "alumni_testimonials"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    designation = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    image_url = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class AlumniShowcase(Base):
    __tablename__ = "alumni_showcase"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    designation = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class NewsArticle(Base):
    __tablename__ = "news_articles"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String, nullable=False)
    link = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Logo(Base):
    __tablename__ = "logos"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    link = Column(String, nullable=False)

# Pydantic models
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: dict

class NavbarItemCreate(BaseModel):
    label: str
    link: str
    order: int = 0
    parent_id: Optional[int] = None
    has_dropdown: bool = False

class HeroSliderCreate(BaseModel):
    title: str
    subtitle: str
    image_url: str

class StatisticCreate(BaseModel):
    label: str
    value: str
    icon_url: str

class WhyChooseCreate(BaseModel):
    title: str
    description: str
    icon_url: str

class ProgramCreate(BaseModel):
    title: str
    description: str
    image_url: str

class AlumniTestimonialCreate(BaseModel):
    name: str
    designation: str
    message: str
    image_url: str

class AlumniShowcaseCreate(BaseModel):
    name: str
    designation: str
    image_url: str

class NewsArticleCreate(BaseModel):
    title: str
    description: str
    image_url: str
    link: str

class LogoCreate(BaseModel):
    name: str
    image_url: str
    link: str

# Create tables
Base.metadata.create_all(bind=engine)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# Initialize data
def init_db(db: Session):
    # Create admin user if doesn't exist
    admin_user = db.query(User).filter(User.email == "admin@edu.com").first()
    if not admin_user:
        admin_user = User(
            name="Admin User",
            email="admin@edu.com",
            password_hash=get_password_hash("admin123"),
            role="admin"
        )
        db.add(admin_user)
        db.commit()
    
    # Add initial data if tables are empty
    if db.query(NavbarItem).count() == 0:
        navbar_items = [
            NavbarItem(label="Home", link="/", order=1, has_dropdown=False),
            NavbarItem(label="Programs", link="#", order=2, has_dropdown=True),
            NavbarItem(label="Computer Science", link="/programs/computer-science", order=3, parent_id=2),
            NavbarItem(label="Business Administration", link="/programs/business", order=4, parent_id=2),
            NavbarItem(label="Engineering", link="/programs/engineering", order=5, parent_id=2),
            NavbarItem(label="About", link="/about", order=6, has_dropdown=False),
            NavbarItem(label="Alumni", link="/alumni", order=7, has_dropdown=False),
            NavbarItem(label="News", link="/news", order=8, has_dropdown=False),
            NavbarItem(label="Contact", link="/contact", order=9, has_dropdown=False),
        ]
        db.add_all(navbar_items)
        db.commit()

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    init_db(db)
    db.close()

# Auth routes
@app.post("/api/auth/login", response_model=Token)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {"id": user.id, "name": user.name, "email": user.email, "role": user.role}
    }

@app.post("/api/auth/logout")
def logout():
    return {"message": "Successfully logged out"}

@app.get("/api/auth/me")
def auth_me(current_user: User = Depends(get_current_user)):
    return {"id": current_user.id, "name": current_user.name, "email": current_user.email, "role": current_user.role}

# Navbar routes
@app.get("/api/navbar")
def get_navbar_items(db: Session = Depends(get_db)):
    items = db.query(NavbarItem).order_by(NavbarItem.order).all()
    return items

@app.post("/api/navbar")
def create_navbar_item(item: NavbarItemCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_item = NavbarItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# Hero Slider routes
@app.get("/api/hero-sliders")
def get_hero_sliders(db: Session = Depends(get_db)):
    sliders = db.query(HeroSlider).order_by(HeroSlider.created_at.desc()).all()
    return sliders

@app.post("/api/hero-sliders")
def create_hero_slider(slider: HeroSliderCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_slider = HeroSlider(**slider.dict())
    db.add(db_slider)
    db.commit()
    db.refresh(db_slider)
    return db_slider

@app.put("/api/hero-sliders/{slider_id}")
def update_hero_slider(slider_id: int, slider: HeroSliderCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_slider = db.query(HeroSlider).filter(HeroSlider.id == slider_id).first()
    if not db_slider:
        raise HTTPException(status_code=404, detail="Slider not found")
    
    for key, value in slider.dict().items():
        setattr(db_slider, key, value)
    
    db.commit()
    db.refresh(db_slider)
    return db_slider

@app.delete("/api/hero-sliders/{slider_id}")
def delete_hero_slider(slider_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_slider = db.query(HeroSlider).filter(HeroSlider.id == slider_id).first()
    if not db_slider:
        raise HTTPException(status_code=404, detail="Slider not found")
    
    db.delete(db_slider)
    db.commit()
    return {"message": "Slider deleted successfully"}

# Statistics routes
@app.get("/api/statistics")
def get_statistics(db: Session = Depends(get_db)):
    stats = db.query(Statistic).all()
    return stats

@app.post("/api/statistics")
def create_statistic(stat: StatisticCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_stat = Statistic(**stat.dict())
    db.add(db_stat)
    db.commit()
    db.refresh(db_stat)
    return db_stat

@app.put("/api/statistics/{stat_id}")
def update_statistic(stat_id: int, stat: StatisticCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_stat = db.query(Statistic).filter(Statistic.id == stat_id).first()
    if not db_stat:
        raise HTTPException(status_code=404, detail="Statistic not found")
    
    for key, value in stat.dict().items():
        setattr(db_stat, key, value)
    
    db.commit()
    db.refresh(db_stat)
    return db_stat

@app.delete("/api/statistics/{stat_id}")
def delete_statistic(stat_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_stat = db.query(Statistic).filter(Statistic.id == stat_id).first()
    if not db_stat:
        raise HTTPException(status_code=404, detail="Statistic not found")
    
    db.delete(db_stat)
    db.commit()
    return {"message": "Statistic deleted successfully"}

# Why Choose Us routes
@app.get("/api/why-choose")
def get_why_choose(db: Session = Depends(get_db)):
    features = db.query(WhyChoose).all()
    return features

@app.post("/api/why-choose")
def create_why_choose(feature: WhyChooseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_feature = WhyChoose(**feature.dict())
    db.add(db_feature)
    db.commit()
    db.refresh(db_feature)
    return db_feature

@app.put("/api/why-choose/{feature_id}")
def update_why_choose(feature_id: int, feature: WhyChooseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_feature = db.query(WhyChoose).filter(WhyChoose.id == feature_id).first()
    if not db_feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    
    for key, value in feature.dict().items():
        setattr(db_feature, key, value)
    
    db.commit()
    db.refresh(db_feature)
    return db_feature

@app.delete("/api/why-choose/{feature_id}")
def delete_why_choose(feature_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_feature = db.query(WhyChoose).filter(WhyChoose.id == feature_id).first()
    if not db_feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    
    db.delete(db_feature)
    db.commit()
    return {"message": "Feature deleted successfully"}

# Programs routes
@app.get("/api/programs")
def get_programs(db: Session = Depends(get_db)):
    programs = db.query(Program).order_by(Program.created_at.desc()).all()
    return programs

@app.post("/api/programs")
def create_program(program: ProgramCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_program = Program(**program.dict())
    db.add(db_program)
    db.commit()
    db.refresh(db_program)
    return db_program

@app.put("/api/programs/{program_id}")
def update_program(program_id: int, program: ProgramCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_program = db.query(Program).filter(Program.id == program_id).first()
    if not db_program:
        raise HTTPException(status_code=404, detail="Program not found")
    
    for key, value in program.dict().items():
        setattr(db_program, key, value)
    
    db.commit()
    db.refresh(db_program)
    return db_program

@app.delete("/api/programs/{program_id}")
def delete_program(program_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_program = db.query(Program).filter(Program.id == program_id).first()
    if not db_program:
        raise HTTPException(status_code=404, detail="Program not found")
    
    db.delete(db_program)
    db.commit()
    return {"message": "Program deleted successfully"}

# Alumni Testimonials routes
@app.get("/api/alumni-testimonials")
def get_alumni_testimonials(db: Session = Depends(get_db)):
    testimonials = db.query(AlumniTestimonial).order_by(AlumniTestimonial.created_at.desc()).all()
    return testimonials

@app.post("/api/alumni-testimonials")
def create_alumni_testimonial(testimonial: AlumniTestimonialCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_testimonial = AlumniTestimonial(**testimonial.dict())
    db.add(db_testimonial)
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

@app.put("/api/alumni-testimonials/{testimonial_id}")
def update_alumni_testimonial(testimonial_id: int, testimonial: AlumniTestimonialCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_testimonial = db.query(AlumniTestimonial).filter(AlumniTestimonial.id == testimonial_id).first()
    if not db_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    for key, value in testimonial.dict().items():
        setattr(db_testimonial, key, value)
    
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

@app.delete("/api/alumni-testimonials/{testimonial_id}")
def delete_alumni_testimonial(testimonial_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_testimonial = db.query(AlumniTestimonial).filter(AlumniTestimonial.id == testimonial_id).first()
    if not db_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    db.delete(db_testimonial)
    db.commit()
    return {"message": "Testimonial deleted successfully"}

# Alumni Showcase routes
@app.get("/api/alumni-showcase")
def get_alumni_showcase(db: Session = Depends(get_db)):
    alumni = db.query(AlumniShowcase).order_by(AlumniShowcase.created_at.desc()).all()
    return alumni

@app.post("/api/alumni-showcase")
def create_alumni_showcase(alumni: AlumniShowcaseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_alumni = AlumniShowcase(**alumni.dict())
    db.add(db_alumni)
    db.commit()
    db.refresh(db_alumni)
    return db_alumni

@app.put("/api/alumni-showcase/{alumni_id}")
def update_alumni_showcase(alumni_id: int, alumni: AlumniShowcaseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_alumni = db.query(AlumniShowcase).filter(AlumniShowcase.id == alumni_id).first()
    if not db_alumni:
        raise HTTPException(status_code=404, detail="Alumni not found")
    
    for key, value in alumni.dict().items():
        setattr(db_alumni, key, value)
    
    db.commit()
    db.refresh(db_alumni)
    return db_alumni

@app.delete("/api/alumni-showcase/{alumni_id}")
def delete_alumni_showcase(alumni_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_alumni = db.query(AlumniShowcase).filter(AlumniShowcase.id == alumni_id).first()
    if not db_alumni:
        raise HTTPException(status_code=404, detail="Alumni not found")
    
    db.delete(db_alumni)
    db.commit()
    return {"message": "Alumni deleted successfully"}

# News Articles routes
@app.get("/api/news")
def get_news_articles(db: Session = Depends(get_db)):
    articles = db.query(NewsArticle).order_by(NewsArticle.created_at.desc()).all()
    return articles

@app.post("/api/news")
def create_news_article(article: NewsArticleCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_article = NewsArticle(**article.dict())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

@app.put("/api/news/{article_id}")
def update_news_article(article_id: int, article: NewsArticleCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    for key, value in article.dict().items():
        setattr(db_article, key, value)
    
    db.commit()
    db.refresh(db_article)
    return db_article

@app.delete("/api/news/{article_id}")
def delete_news_article(article_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    db.delete(db_article)
    db.commit()
    return {"message": "Article deleted successfully"}

# Logos routes
@app.get("/api/logos")
def get_logos(db: Session = Depends(get_db)):
    logos = db.query(Logo).all()
    return logos

@app.post("/api/logos")
def create_logo(logo: LogoCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_logo = Logo(**logo.dict())
    db.add(db_logo)
    db.commit()
    db.refresh(db_logo)
    return db_logo

@app.put("/api/logos/{logo_id}")
def update_logo(logo_id: int, logo: LogoCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_logo = db.query(Logo).filter(Logo.id == logo_id).first()
    if not db_logo:
        raise HTTPException(status_code=404, detail="Logo not found")
    
    for key, value in logo.dict().items():
        setattr(db_logo, key, value)
    
    db.commit()
    db.refresh(db_logo)
    return db_logo

@app.delete("/api/logos/{logo_id}")
def delete_logo(logo_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_logo = db.query(Logo).filter(Logo.id == logo_id).first()
    if not db_logo:
        raise HTTPException(status_code=404, detail="Logo not found")
    
    db.delete(db_logo)
    db.commit()
    return {"message": "Logo deleted successfully"}

@app.post("/api/upload")
def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")

    ext = os.path.splitext(file.filename)[1].lower()
    unique_name = f"{uuid.uuid4().hex}{ext}"
    dest_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(dest_path, "wb") as out:
        out.write(file.file.read())

    # The URL to save in your existing image_url fields
    return {"url": f"/uploads/{unique_name}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)