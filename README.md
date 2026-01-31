# 🌞 SolarMach Imports

A modern, responsive Flask-based solar energy website featuring comprehensive information about solar panel technologies, dark mode support, animated backgrounds, and premium eco-focused design.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

### 🎨 Design & UI

- **Responsive Layout**: Mobile-first design that scales beautifully from 320px to 4K displays
- **Dark Mode**: Toggle between light and dark themes with smooth transitions
- **Animated Backgrounds**: Organic floating shapes that add depth and motion
- **Premium Typography**: Using Merriweather serif and Inter sans-serif fonts
- **Smooth Animations**: CSS keyframe animations for elegant user experience
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### ☀️ Solar Technology Content

Comprehensive information about four types of solar panels:

| Panel Type | Efficiency | Best For |
|------------|------------|----------|
| **Monocrystalline** | 17-22% | Residential rooftops, premium installations |
| **Polycrystalline** | 15-17% | Budget-conscious, large-scale projects |
| **Thin-Film** | 10-13% | Curved surfaces, portable applications |
| **BIPV** | 10-20% | New construction, architectural integration |

Each panel type includes:

- ⚙️ How it works (technical explanation)
- ✅ Key advantages
- 📊 Efficiency ranges
- 🎯 Ideal use cases

### 🚀 Interactions

- **Dark Mode Toggle**: Click the moon/sun icon in the navbar
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Counter Animations**: Impact numbers animate when scrolled into view
- **Button Ripple Effects**: Material design-inspired ripple on button clicks
- **Parallax Effects**: Subtle parallax scrolling on hero image
- **Hover States**: Interactive hover effects on all clickable elements

### 📱 Responsive Breakpoints

- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: 1025px+

## 🏗️ Project Structure

```
solar new/
├── app.py                      # Flask application with routes & panel data
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── static/
│   ├── css/
│   │   └── style.css          # Complete CSS with dark mode & animations
│   ├── js/
│   │   └── script.js          # JavaScript for interactions
│   └── images/
│       ├── hero-image.png     # Hero section image
│       ├── monocrystalline.jpg
│       ├── polycrystalline.jpg
│       ├── Thin_film.jpeg
│       └── BIPV.jpg
└── templates/
    ├── base.html              # Base template with navigation & footer
    ├── index.html             # Home/Landing page
    ├── solar_technology.html  # Solar technology overview
    ├── panel_detail.html      # Individual panel type details
    ├── about.html             # About Us page
    ├── contact.html           # Contact page with form
    └── 404.html               # Custom error page
```

## 🔗 Routes & Endpoints

| Route | Description |
|-------|-------------|
| `/` | Home/Landing page |
| `/solar-technology` | Solar technology overview with all panel types |
| `/solar-technology/<panel_type>` | Detailed page for each panel type |
| `/about` | About Us page |
| `/contact` | Contact page with form |
| `/api/panels` | JSON API returning all panel data |
| `/api/panels/<panel_type>` | JSON API for specific panel type |

**Available panel types**: `monocrystalline`, `polycrystalline`, `thin_film`, `bipv`

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/solarmach-imports.git
   cd solarmach-imports
   ```

2. **Create a virtual environment** (recommended)

   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**

   ```bash
   python app.py
   ```

5. **Open in browser**

   ```
   http://localhost:5000
   ```

<!-- ## 🚀 Deploy to Render

### Option 1: Using render.yaml (Recommended)

1. **Push your code to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/solarmach-imports.git
   git push -u origin main
   ```

2. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`

3. **Configure Environment Variables in Render Dashboard**
   - `SECRET_KEY` - Auto-generated by Render
   - `SMTP_SERVER` - `smtp.gmail.com`
   - `SMTP_PORT` - `587`
   - `SMTP_USERNAME` - Your Gmail address
   - `SMTP_PASSWORD` - Your Gmail App Password
   - `RECEIVER_EMAIL` - Email to receive contact form submissions

### Option 2: Manual Configuration

1. Create a new Web Service on Render
2. Set the following:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`
3. Add the environment variables listed above

### Important Notes for Production

- **Database**: SQLite database is stored at `/tmp/solarmach_messages.db` on Render's free tier (ephemeral storage). For persistent data, upgrade to a paid plan with a persistent disk or use PostgreSQL.
- **Gmail App Password**: Create one at [Google App Passwords](https://myaccount.google.com/apppasswords)
- **HTTPS**: Render automatically provides SSL certificates -->

## 🎯 Pages Overview

### Home Page (`/`)

- Hero section with call-to-action
- Solar technology preview cards with images
- Environmental impact statistics (animated counters)
- Customer testimonials

### Solar Technology (`/solar-technology`)

- Introduction to solar panel technology
- Grid of all panel types with key info
- Comparison table
- Call-to-action section

### Panel Detail (`/solar-technology/<type>`)

- Detailed hero with panel image
- How it works explanation
- Advantages list
- Efficiency meter visualization
- Ideal use cases
- Links to other panel types

### About (`/about`)

- Company mission and story
- Core values
- Why choose us features

### Contact (`/contact`)

- Contact information
- Contact form
- FAQ section

## 🛠️ API Usage

### Get all panels

```bash
curl http://localhost:5000/api/panels
```

### Get specific panel

```bash
curl http://localhost:5000/api/panels/monocrystalline
```

### Response format

```json
{
  "name": "Monocrystalline Solar Panels",
  "icon": "images/monocrystalline.jpg",
  "description": "The most efficient...",
  "how_it_works": "...",
  "advantages": ["..."],
  "efficiency_range": "17% - 22%",
  "ideal_use_cases": ["..."],
  "color": "#1a1a2e"
}
```

## 🎨 Customization

### Changing Colors

Edit CSS variables in `static/css/style.css`:

```css
:root {
    --color-accent-primary: #3D5C2E;
    --color-accent-hover: #2d4422;
    --color-accent-light: #F4D03F;
}
```

### Adding New Panel Types

1. Add panel data to `SOLAR_PANEL_TYPES` in `app.py`
2. Add panel image to `static/images/`
3. Update templates if needed

## 🔧 Technical Details

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Templating**: Jinja2
- **Fonts**: Google Fonts (Merriweather, Inter)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- ## 📞 Contact

SolarMach Imports

- Email: <info@solarmach.com>
- Phone: +1 (555) 123-4567
- Address: 123 Solar Street, Green City

--- -->

**Version**: 2.0.0  
**Last Updated**: January 2026

Made with ☀️ for a sustainable future
