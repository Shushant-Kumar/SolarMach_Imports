"""
SolarMach Imports - Flask Application
A sustainable energy solutions website with informative content about solar technology.
"""

from flask import Flask, render_template, jsonify, request, flash, redirect, url_for
import sqlite3
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os

app = Flask(__name__)

# Production configuration - Use environment variable or generate random key
app.secret_key = os.environ.get('SECRET_KEY', os.urandom(24))

# SMTP Configuration - Uses environment variables for production security
SMTP_CONFIG = {
    'server': os.environ.get('SMTP_SERVER', 'smtp.gmail.com'),
    'port': int(os.environ.get('SMTP_PORT', '587')),
    'username': os.environ.get('SMTP_USERNAME', ''),
    'password': os.environ.get('SMTP_PASSWORD', ''),
    'receiver_email': os.environ.get('RECEIVER_EMAIL', '')
}

# Database setup - Use environment variable for flexibility
DATABASE = os.environ.get('DATABASE_PATH', 'solarmach_messages.db')


def get_db_connection():
    """Create a database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize the database with the messages table"""
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            interest TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            email_sent BOOLEAN DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()


def save_message_to_db(name, email, phone, interest, message, email_sent=False):
    """Save a contact message to the database"""
    conn = get_db_connection()
    conn.execute('''
        INSERT INTO contact_messages (name, email, phone, interest, message, email_sent)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (name, email, phone, interest, message, email_sent))
    conn.commit()
    conn.close()


def send_email(name, email, phone, interest, message):
    """Send contact form message via SMTP"""
    # Check if SMTP is configured before attempting
    if not SMTP_CONFIG['username'] or not SMTP_CONFIG['password']:
        print("[EMAIL] SMTP not configured, skipping email send")
        return False
    
    try:
        # Create the email message
        msg = MIMEMultipart()
        msg['From'] = SMTP_CONFIG['username']
        msg['To'] = SMTP_CONFIG['receiver_email']
        msg['Subject'] = f'New Contact Form Submission from {name}'
        
        # Create email body
        body = f"""
        New Contact Form Submission
        ===========================
        
        Name: {name}
        Email: {email}
        Phone: {phone or 'Not provided'}
        Interest: {interest or 'Not specified'}
        
        Message:
        {message}
        
        ---
        Submitted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to SMTP server and send email (with 10 second timeout)
        with smtplib.SMTP(SMTP_CONFIG['server'], SMTP_CONFIG['port'], timeout=10) as server:
            server.starttls()
            server.login(SMTP_CONFIG['username'], SMTP_CONFIG['password'])
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"[EMAIL] ERROR sending email: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        return False


# Initialize database when app starts
init_db()

# Solar panel types data
SOLAR_PANEL_TYPES = {
    "monocrystalline": {
        "name": "Monocrystalline Solar Panels",
        "icon": "images/monocrystalline.jpg",
        "description": "The most efficient and space-saving solar panel technology available today.",
        "how_it_works": """
            Monocrystalline solar panels are made from a single, continuous crystal structure of silicon. 
            The manufacturing process starts with a silicon seed crystal placed in a vat of molten silicon. 
            As the seed is slowly pulled up, the molten silicon forms around it, creating a single crystal 
            ingot called a boule. This boule is then sliced into thin wafers that form the solar cells.
            
            The single-crystal structure allows electrons to flow more freely, resulting in higher efficiency. 
            The cells appear uniformly dark and have rounded edges due to the cylindrical shape of the silicon ingot.
        """,
        "advantages": [
            "Highest efficiency rates (typically 17-22%)",
            "Space-efficient - requires less roof space for the same power output",
            "Longest lifespan (25-30+ years with warranties)",
            "Better performance in low-light conditions",
            "Most aesthetically pleasing with uniform black appearance",
            "Better heat tolerance compared to polycrystalline"
        ],
        "efficiency_range": "17% - 22%",
        "ideal_use_cases": [
            "Residential rooftops with limited space",
            "High-end commercial installations",
            "Areas with variable weather conditions",
            "Properties where aesthetics matter",
            "Long-term investments prioritizing efficiency"
        ],
        "color": "#3D5C2E"
    },
    "polycrystalline": {
        "name": "Polycrystalline Solar Panels",
        "icon": "images/polycrystalline.jpg",
        "description": "A cost-effective solution offering good efficiency at a lower price point.",
        "how_it_works": """
            Polycrystalline solar panels are made from multiple silicon crystal fragments melted together.
            Instead of using a single crystal seed, the molten silicon is simply poured into a square mold
            and allowed to cool. This creates multiple crystals within each cell.
            
            The manufacturing process is simpler and produces less waste than monocrystalline production.
            The resulting cells have a distinctive blue, speckled appearance due to the multiple crystal
            boundaries reflecting light differently. While slightly less efficient, they offer excellent
            value for money.
        """,
        "advantages": [
            "Lower manufacturing cost (10-20% cheaper than mono)",
            "Good efficiency for the price (15-17%)",
            "Simpler manufacturing process with less silicon waste",
            "Proven technology with reliable performance",
            "Good option for larger installation areas",
            "Environmental benefit from less production waste"
        ],
        "efficiency_range": "15% - 17%",
        "ideal_use_cases": [
            "Budget-conscious residential installations",
            "Large-scale solar farms where space isn't limited",
            "Commercial buildings with ample roof space",
            "Agricultural applications",
            "Cost-effective grid-tied systems"
        ],
        "color": "#3D5C2E"
    },
    "thin_film": {
        "name": "Thin-Film Solar Panels",
        "icon": "images/Thin_film.jpeg",
        "description": "Flexible and lightweight panels perfect for unique applications and surfaces.",
        "how_it_works": """
            Thin-film solar panels are made by depositing one or more thin layers of photovoltaic material
            onto a substrate like glass, plastic, or metal. The layers are about 300-350 times thinner
            than standard silicon wafers.
            
            Common types include Cadmium Telluride (CdTe), Amorphous Silicon (a-Si), and Copper Indium
            Gallium Selenide (CIGS). Each type has different characteristics, but all share the benefits
            of flexibility and lightweight construction. The thin layers absorb sunlight and convert it
            to electricity through the photovoltaic effect.
        """,
        "advantages": [
            "Lightweight and flexible installation options",
            "Works well in high temperatures and partial shading",
            "Lower carbon footprint in manufacturing",
            "Uniform appearance for aesthetic installations",
            "Can be integrated into building materials",
            "Better performance in diffuse light conditions"
        ],
        "efficiency_range": "10% - 13%",
        "ideal_use_cases": [
            "Curved or irregular surfaces",
            "Portable solar applications",
            "Building-integrated photovoltaics (BIPV)",
            "Large commercial rooftops",
            "Hot climate installations",
            "Carports and canopies"
        ],
        "color": "#3D5C2E"
    },
    "bipv": {
        "name": "Building-Integrated Photovoltaics (BIPV)",
        "icon": "images/BIPV.jpg",
        "description": "Seamlessly integrating solar technology into building architecture.",
        "how_it_works": """
            Building-Integrated Photovoltaics (BIPV) replaces conventional building materials with
            photovoltaic materials that generate electricity. Unlike traditional solar panels mounted
            on top of existing structures, BIPV products serve as both the outer layer of a structure
            and generate electricity.
            
            BIPV can take many forms: solar roof tiles/shingles, solar facades, solar glass windows,
            solar skylights, and solar cladding. They use various cell technologies (crystalline silicon,
            thin-film) depending on the application. The key innovation is the dual functionality -
            providing weather protection while harvesting solar energy.
        """,
        "advantages": [
            "Replaces conventional building materials (cost offset)",
            "Aesthetically superior - blends with architecture",
            "Dual functionality (protection + power generation)",
            "No additional mounting systems required",
            "Increases property value significantly",
            "Multiple application options (roof, facade, windows)"
        ],
        "efficiency_range": "10% - 20%",
        "ideal_use_cases": [
            "New construction projects",
            "Historic building renovations",
            "Commercial buildings prioritizing aesthetics",
            "Green building certifications (LEED, BREEAM)",
            "Urban environments with design restrictions",
            "Architectural showcase projects"
        ],
        "color": "#3D5C2E"
    }
}


@app.route('/')
def home():
    """Home page - Landing page"""
    return render_template('index.html')


@app.route('/solar-technology')
def solar_technology():
    """Solar Technology page - Information about different panel types"""
    return render_template('solar_technology.html', panel_types=SOLAR_PANEL_TYPES)


@app.route('/solar-technology/<panel_type>')
def panel_detail(panel_type):
    """Individual panel type detail page"""
    if panel_type in SOLAR_PANEL_TYPES:
        panel = SOLAR_PANEL_TYPES[panel_type]
        return render_template('panel_detail.html', panel=panel, panel_key=panel_type)
    return render_template('404.html'), 404


@app.route('/api/panels')
def api_panels():
    """API endpoint returning all panel types data"""
    return jsonify(SOLAR_PANEL_TYPES)


@app.route('/api/panels/<panel_type>')
def api_panel_detail(panel_type):
    """API endpoint returning specific panel type data"""
    if panel_type in SOLAR_PANEL_TYPES:
        return jsonify(SOLAR_PANEL_TYPES[panel_type])
    return jsonify({"error": "Panel type not found"}), 404


@app.route('/about')
def about():
    """About page"""
    return render_template('about.html')


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact page with form handling"""
    if request.method == 'POST':
        # Get form data
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()
        interest = request.form.get('interest', '').strip()
        message = request.form.get('message', '').strip()
        
        # Validate required fields
        if not name or not email or not message:
            flash('Please fill in all required fields.', 'error')
            return render_template('contact.html')
        
        # Try to send email
        email_sent = send_email(name, email, phone, interest, message)
        
        # Save to database (regardless of email status)
        save_message_to_db(name, email, phone, interest, message, email_sent)
        
        if email_sent:
            flash('Thank you! Your message has been sent successfully.', 'success')
        else:
            flash('Your message has been saved. We will get back to you soon!', 'success')
        
        return redirect(url_for('contact'))
    
    return render_template('contact.html')


# @app.route('/api/messages')
# def api_messages():
#     """API endpoint to retrieve all contact messages (for admin use)"""
#     conn = get_db_connection()
#     messages = conn.execute('SELECT * FROM contact_messages ORDER BY created_at DESC').fetchall()
#     conn.close()
    
#     return jsonify([{
#         'id': msg['id'],
#         'name': msg['name'],
#         'email': msg['email'],
#         'phone': msg['phone'],
#         'interest': msg['interest'],
#         'message': msg['message'],
#         'created_at': msg['created_at'],
#         'email_sent': bool(msg['email_sent'])
#     } for msg in messages])


@app.errorhandler(404)
def page_not_found(e):
    """Custom 404 error page"""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=False)
