from main import SessionLocal, User, NavbarItem, HeroSlider, Statistic, WhyChoose, Program, AlumniTestimonial, AlumniShowcase, NewsArticle, Logo, get_password_hash

def init_sample_data():
    db = SessionLocal()
    
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
    
    # Add sample data if tables are empty
    if db.query(HeroSlider).count() == 0:
        hero_sliders = [
            HeroSlider(
                title="Excellence in Education",
                subtitle="Empowering minds, shaping futures with world-class education and innovative learning experiences",
                image_url="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            ),
            HeroSlider(
                title="Global Opportunities", 
                subtitle="Connect with leading institutions worldwide and unlock unlimited potential",
                image_url="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            )
        ]
        db.add_all(hero_sliders)
    
    if db.query(Statistic).count() == 0:
        statistics = [
            Statistic(label="Students", value="15,000+", icon_url="👨‍🎓"),
            Statistic(label="Faculty", value="850+", icon_url="👩‍🏫"),
            Statistic(label="Alumni", value="50,000+", icon_url="🎓"),
            Statistic(label="Programs", value="200+", icon_url="📚")
        ]
        db.add_all(statistics)
    
    if db.query(WhyChoose).count() == 0:
        why_choose_items = [
            WhyChoose(
                title="World-Class Faculty",
                description="Learn from industry experts and renowned academics with decades of experience",
                icon_url="🏆"
            ),
            WhyChoose(
                title="Modern Infrastructure", 
                description="State-of-the-art facilities and cutting-edge technology for optimal learning",
                icon_url="🏫"
            ),
            WhyChoose(
                title="Industry Connections",
                description="Strong partnerships with leading companies for internships and job placements",
                icon_url="🤝"
            ),
            WhyChoose(
                title="Global Recognition",
                description="Internationally accredited programs recognized worldwide",
                icon_url="🌍"
            )
        ]
        db.add_all(why_choose_items)
    
    if db.query(Program).count() == 0:
        programs = [
            Program(
                title="Computer Science",
                description="Advanced programming, AI, and software development with hands-on projects",
                image_url="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400"
            ),
            Program(
                title="Business Administration",
                description="Comprehensive business education with real-world case studies and internships",
                image_url="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=400"
            ),
            Program(
                title="Engineering",
                description="Cutting-edge engineering programs with state-of-the-art laboratories",
                image_url="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400"
            )
        ]
        db.add_all(programs)
    
    if db.query(AlumniTestimonial).count() == 0:
        testimonials = [
            AlumniTestimonial(
                name="Sarah Johnson",
                designation="Software Engineer at Google",
                message="The education I received here shaped my career and gave me the skills to succeed in the tech industry.",
                image_url="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300"
            ),
            AlumniTestimonial(
                name="Michael Chen",
                designation="Entrepreneur & CEO",
                message="The business program provided me with the knowledge and network to start my own successful company.",
                image_url="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300"
            )
        ]
        db.add_all(testimonials)
    
    if db.query(AlumniShowcase).count() == 0:
        alumni_showcase = [
            AlumniShowcase(
                name="Emily Davis",
                designation="Data Scientist",
                image_url="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300"
            ),
            AlumniShowcase(
                name="David Rodriguez",
                designation="Product Manager", 
                image_url="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300"
            ),
            AlumniShowcase(
                name="Lisa Wang",
                designation="UX Designer",
                image_url="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300"
            )
        ]
        db.add_all(alumni_showcase)
    
    if db.query(NewsArticle).count() == 0:
        news_articles = [
            NewsArticle(
                title="New AI Research Lab Opens",
                description="State-of-the-art artificial intelligence research facility launched with cutting-edge equipment",
                image_url="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
                link="/news/ai-lab-opens"
            ),
            NewsArticle(
                title="Student Exchange Program Expanded",
                description="Partnership with 15 new international universities for enhanced global learning opportunities",
                image_url="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400",
                link="/news/exchange-program"
            )
        ]
        db.add_all(news_articles)
    
    if db.query(Logo).count() == 0:
        logos = [
            Logo(name="Microsoft", image_url="https://img.logo.dev/microsoft.com?token=pk_X-1ZO13ESWuLJAXk0QWFKw", link="https://microsoft.com"),
            Logo(name="Google", image_url="https://img.logo.dev/google.com?token=pk_X-1ZO13ESWuLJAXk0QWFKw", link="https://google.com"),
            Logo(name="Apple", image_url="https://img.logo.dev/apple.com?token=pk_X-1ZO13ESWuLJAXk0QWFKw", link="https://apple.com"),
            Logo(name="IBM", image_url="https://img.logo.dev/ibm.com?token=pk_X-1ZO13ESWuLJAXk0QWFKw", link="https://ibm.com")
        ]
        db.add_all(logos)
    
    db.commit()
    db.close()
    print("Sample data initialized successfully!")

if __name__ == "__main__":
    init_sample_data()