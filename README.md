# 🌞 SolarMach Imports Website

A modern, responsive solar energy website with dark mode support, animated organic background shapes, and premium design.

## ✨ Features

### 🎨 Design & UI

- **Responsive Layout**: Mobile-first design that scales beautifully from 320px to 4K displays
- **Dark Mode**: Toggle between light and dark themes with smooth transitions
- **Animated Backgrounds**: Organic floating shapes that add depth and motion
- **Premium Typography**: Using Merriweather serif and Inter sans-serif fonts
- **Smooth Animations**: CSS keyframe animations for elegant user experience
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

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

## 🏗️ Structure

```
solar new/
├── index.html          # Main HTML structure
├── style.css           # Complete CSS with dark mode & animations
├── script.js           # JavaScript for interactions & dark mode
├── hero-image.png      # Hero section image
└── README.md           # This file
```

## 🎯 How to Use

### Opening the Website

1. **Double-click** `index.html` to open in your default browser
2. Or **right-click** → Open With → Choose your browser

### Features Guide

#### Dark Mode Toggle

- Click the **🌙/☀️ button** in the top-right navbar
- Your preference is saved automatically
- System preference is respected by default

#### Navigation

- Click any nav link to smoothly scroll to sections
- On mobile, nav links wrap below the logo
- Logo is clickable to scroll to top

#### Responsive Behavior

- **Desktop**: Hero content and image side-by-side
- **Tablet**: Slightly reduced spacing and font sizes
- **Mobile**: Stacked layout, full-width elements

## 🎨 Customization

### Colors

Edit CSS custom properties in `style.css`:

```css
:root {
    --color-accent-primary: #3D5C2E;  /* Primary green */
    --color-accent-light: #F4D03F;    /* Accent yellow */
    --color-bg-primary: #FAF5EB;      /* Background */
    /* ... more colors */
}
```

### Fonts

Current fonts:

- **Headings**: Merriweather (serif)
- **Body**: Inter (sans-serif)

To change, update the Google Fonts link in `index.html` and CSS font-family values.

### Animation Speed

Adjust in CSS custom properties:

```css
:root {
    --transition-fast: 0.2s ease;
    --transition-base: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

### Background Shapes

Modify animation in `style.css` under `.shape` classes:

- Change size: `width` and `height`
- Change colors: `background: linear-gradient(...)`
- Change movement: Adjust `@keyframes float-*` animations

## 🔧 Technical Details

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Performance

- Animated shapes use CSS transforms (GPU accelerated)
- Intersection Observer for lazy animations
- RequestAnimationFrame for smooth scrolling
- Optimized for reduced motion preferences

### Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- Focus indicators
- Color contrast WCAG AA compliant

## 📝 Content Sections

### 1. Navbar

- Logo/Brand
- Navigation links (Home, About, Impact, Testimonials)
- Dark mode toggle
- Contact button

### 2. Hero Section

- Main headline
- Descriptive paragraph
- Two CTA buttons (Primary & Secondary)
- Hero image with decorative border

### 3. Impact Section

- Environmental statistics
- Animated counters
- Icon animations on hover

### 4. Testimonials

- Customer reviews
- Side-by-side cards on desktop
- Stacked on mobile
- Scroll-triggered fade-in

### 5. Footer

- Company info
- Quick links
- Contact details
- Social links

## 🐛 Troubleshooting

### Dark Mode Not Working

- Clear browser cache and reload
- Check browser console for errors
- Ensure JavaScript is enabled

### Images Not Showing

- Verify `hero-image.png` exists in the same folder
- Check image path in `index.html`
- Try absolute path if needed

### Animations Lag

- Reduce motion in OS accessibility settings
- Close other browser tabs
- Update graphics drivers

### Mobile Menu Issues

- Refresh the page
- Clear browser cache
- Check viewport meta tag

## 🚀 Deployment

### Option 1: Static Hosting

Upload all files to:

- **Netlify**: Drag & drop folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Push to gh-pages branch

### Option 2: Web Server

Upload to your hosting:

```bash
# Via FTP/SFTP
# Copy: index.html, style.css, script.js, hero-image.png
```

### Option 3: Local Testing

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# Then open: http://localhost:8000
```

## 🎓 Learning Resources

### Technologies Used

- HTML5 Semantic Elements
- CSS3 Custom Properties (Variables)
- CSS Grid & Flexbox
- CSS Animations & Transitions
- Vanilla JavaScript (ES6+)
- Intersection Observer API
- Local Storage API

### Further Reading

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)

## 📄 License

This is a sample project for SolarMach Imports. Customize as needed for your use case.

## 💡 Tips

1. **Test on real devices**: Emulators don't always match real performance
2. **Optimize images**: Compress hero-image.png for faster loading
3. **Add meta tags**: Include Open Graph tags for social sharing
4. **Add analytics**: Integrate Google Analytics or similar
5. **Add forms**: Connect Contact button to actual form/service

## 🌟 Credits

Designed and developed with ☀️ for sustainable energy solutions.

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Contact**: <info@solarmach.com>
