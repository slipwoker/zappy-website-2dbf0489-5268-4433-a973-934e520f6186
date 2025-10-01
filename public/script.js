// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            alert('אנא מלאו את כל השדות הנדרשים');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('אנא הכניסו כתובת אימייל תקינה');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'שולח...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.menu-item, .service-card, .gallery-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Gallery Image Modal (if needed)
const galleryImages = document.querySelectorAll('.gallery-item img');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            cursor: pointer;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        // Close modal on click
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    });
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            hero.style.opacity = '1';
        }, 100);
    }
    
    // Preload critical images
    const criticalImages = [
        document.querySelector('.hero-image img'),
        ...document.querySelectorAll('.menu-image img')
    ];
    
    criticalImages.forEach(img => {
        if (img && img.src) {
            const preloadImg = new Image();
            preloadImg.src = img.src;
        }
    });
});

// Add scroll-to-top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Create scroll-to-top button
const createScrollButton = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #d4af37;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    scrollBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
        }
    });
};

// Initialize scroll button
createScrollButton();

/* Cookie Consent */

// Helper function to check cookie consent
function hasConsentFor(category) {
  if (typeof window.CookieConsent === 'undefined') {
    return false; // Default to no consent if cookie consent not loaded
  }
  
  return window.CookieConsent.validConsent(category);
}

// Helper function to execute code only with consent
function withConsent(category, callback) {
  if (hasConsentFor(category)) {
    callback();
  } else {
    console.log(`⚠️  Skipping ${category} code - no user consent`);
  }
}

// Cookie Consent Initialization
console.log('🍪 Cookie consent script loaded - starting initialization...');

(function() {
  'use strict';
  
  let initAttempts = 0;
  const maxAttempts = 50; // 5 seconds max wait
  
  // Wait for DOM and vanilla-cookieconsent to be ready
  function initCookieConsent() {
    initAttempts++;
    
    console.log('🍪 Cookie consent init attempt', initAttempts, '- CookieConsent available:', typeof window.CookieConsent !== 'undefined');
    console.log('🍪 Document ready state:', document.readyState);
    console.log('🍪 Window object available:', typeof window !== 'undefined');
    
    if (typeof window.CookieConsent === 'undefined') {
      if (initAttempts < maxAttempts) {
        console.log('🍪 CookieConsent not ready, retrying in 100ms...');
        setTimeout(initCookieConsent, 100);
      } else {
        console.error('🍪 Cookie consent failed to load after', maxAttempts, 'attempts');
        console.error('🍪 Available window properties:', Object.keys(window).filter(k => k.toLowerCase().includes('cookie')));
      }
      return;
    }

    const cc = window.CookieConsent;
    
    console.log('🍪 Initializing cookie consent with config:', typeof cc);
    console.log('🍪 CookieConsent.run available:', typeof cc.run === 'function');
    
    // Initialize cookie consent
    try {
      cc.run({
  "autoShow": true,
  "mode": "opt-in",
  "revision": 0,
  "categories": {
    "necessary": {
      "enabled": true,
      "readOnly": true
    },
    "analytics": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_ga"
          },
          {
            "name": "_ga_*"
          },
          {
            "name": "_gid"
          },
          {
            "name": "_gat"
          }
        ]
      }
    },
    "marketing": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_fbp"
          },
          {
            "name": "_fbc"
          },
          {
            "name": "fr"
          }
        ]
      }
    }
  },
  "language": {
    "default": "he",
    "translations": {
      "he": {
        "consentModal": {
          "title": "אנחנו משתמשים בעוגיות 🍪",
          "description": "קוקילל משתמש בעוגיות כדי לשפר את החוויה שלך, לנתח שימוש באתר ולסייע במאמצי השיווק שלנו.",
          "acceptAllBtn": "אשר הכל",
          "acceptNecessaryBtn": "רק הכרחי",
          "showPreferencesBtn": "נהל העדפות",
          "footer": "<a href=\"#privacy-policy\">מדיניות פרטיות</a> | <a href=\"#terms-conditions\">תנאי שימוש</a>"
        },
        "preferencesModal": {
          "title": "העדפות עוגיות",
          "acceptAllBtn": "אשר הכל",
          "acceptNecessaryBtn": "רק הכרחי",
          "savePreferencesBtn": "שמור העדפות",
          "closeIconLabel": "סגור",
          "sections": [
            {
              "title": "עוגיות חיוניות",
              "description": "עוגיות אלה הכרחיות לתפקוד האתר ולא ניתן להשבית אותן.",
              "linkedCategory": "necessary"
            },
            {
              "title": "עוגיות ניתוח",
              "description": "עוגיות אלה עוזרות לנו להבין איך המבקרים מתקשרים עם האתר שלנו.",
              "linkedCategory": "analytics"
            },
            {
              "title": "עוגיות שיווקיות",
              "description": "עוגיות אלה משמשות להצגת פרסומות מותאמות אישית.",
              "linkedCategory": "marketing"
            }
          ]
        }
      }
    }
  },
  "guiOptions": {
    "consentModal": {
      "layout": "box",
      "position": "bottom right",
      "equalWeightButtons": true,
      "flipButtons": false
    },
    "preferencesModal": {
      "layout": "box",
      "equalWeightButtons": true,
      "flipButtons": false
    }
  }
});
      console.log('✅ Cookie consent initialized successfully');
    } catch (error) {
      console.error('❌ Cookie consent initialization failed:', error);
      console.error('❌ Error details:', error.message, error.stack);
    }

    // Optional: Handle consent changes
    cc.onChange(function(cookie, changed_preferences) {
      console.log('🍪 Cookie consent changed:', changed_preferences);
      
      // Enable/disable analytics based on consent
      if (changed_preferences.includes('analytics')) {
        if (cc.validConsent('analytics')) {
          // Enable analytics (e.g., Google Analytics)
          console.log('📊 Analytics enabled');
          // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
        } else {
          console.log('📊 Analytics disabled');
          // Example: gtag('consent', 'update', { analytics_storage: 'denied' });
        }
      }
      
      // Enable/disable marketing based on consent
      if (changed_preferences.includes('marketing')) {
        if (cc.validConsent('marketing')) {
          console.log('📢 Marketing enabled');
          // Example: gtag('consent', 'update', { ad_storage: 'granted' });
        } else {
          console.log('📢 Marketing disabled');
          // Example: gtag('consent', 'update', { ad_storage: 'denied' });
        }
      }
    });

    // Optional: Add show preferences button to footer
    const footer = document.querySelector('footer');
    if (footer && !footer.querySelector('.cookie-preferences-btn')) {
      const prefsButton = document.createElement('button');
      prefsButton.className = 'cookie-preferences-btn';
      prefsButton.textContent = '🍪 Cookie Preferences';
      prefsButton.style.cssText = `
        background: transparent;
        border: 1px solid rgba(255,255,255,0.3);
        color: inherit;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 16px;
        transition: all 0.3s ease;
      `;
      
      prefsButton.addEventListener('click', function() {
        cc.showPreferences();
      });
      
      prefsButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(255,255,255,0.1)';
      });
      
      prefsButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
      });
      
      // Add to footer (try to find a good spot)
      const footerLinks = footer.querySelector('.footer-links, .legal-links, p');
      if (footerLinks) {
        footerLinks.appendChild(prefsButton);
      } else {
        footer.appendChild(prefsButton);
      }
    }
  }

  // Initialize when DOM is ready - multiple approaches for reliability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
    // Backup timeout in case DOMContentLoaded doesn't fire
    setTimeout(initCookieConsent, 1000);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initCookieConsent();
  } else {
    // Fallback - try after a short delay
    setTimeout(initCookieConsent, 500);
  }
  
  // Additional fallback - try after page load
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener('load', initCookieConsent, { once: true });
    }
  }
})();

/* Accessibility Features */

// Accessibility Toolbar Initialization
console.log('♿ Accessibility toolbar script loaded - starting initialization...');

(function() {
  'use strict';
  
  let initAttempts = 0;
  const maxAttempts = 50; // 5 seconds max wait
  
  // Wait for DOM and accessibility library to be ready
  function initAccessibility() {
    initAttempts++;
    
    console.log('♿ Accessibility init attempt', initAttempts, '- Accessibility available:', typeof window.Accessibility !== 'undefined');
    console.log('♿ Document ready state:', document.readyState);
    
    if (typeof window.Accessibility === 'undefined') {
      if (initAttempts < maxAttempts) {
        console.log('♿ Accessibility library not ready, retrying in 100ms...');
        setTimeout(initAccessibility, 100);
      } else {
        console.error('♿ Accessibility library failed to load after', maxAttempts, 'attempts');
        console.error('♿ Available window properties:', Object.keys(window).filter(k => k.toLowerCase().includes('access')));
      }
      return;
    }

    console.log('♿ Initializing accessibility toolbar...');
    
    try {
      // Initialize accessibility toolbar with configuration
      new window.Accessibility({
  "icon": {
    "position": {
      "bottom": {
        "size": 50,
        "units": "px"
      },
      "right": {
        "size": 20,
        "units": "px"
      },
      "type": "fixed"
    },
    "backgroundColor": "#146FF8",
    "color": "#fff",
    "img": "accessible",
    "circular": true,
    "fontFaceSrc": [
      "https://fonts.googleapis.com/icon?family=Material+Icons"
    ],
    "fontFamily": "Material Icons"
  },
  "hotkeys": {
    "enabled": true,
    "helpTitles": true,
    "keys": {
      "toggleMenu": [
        "ctrl+alt+a"
      ],
      "invertColors": [
        "ctrl+alt+i"
      ],
      "toggleAnimations": [
        "ctrl+alt+n"
      ],
      "toggleContrast": [
        "ctrl+alt+c"
      ],
      "increaseFontSize": [
        "ctrl+alt+plus"
      ],
      "decreaseFontSize": [
        "ctrl+alt+minus"
      ]
    }
  },
  "menu": {
    "dimensions": {
      "width": {
        "size": 300,
        "units": "px"
      },
      "height": {
        "size": "auto",
        "units": "px"
      }
    },
    "fontFamily": "inherit"
  },
  "labels": {
    "resetTitle": "איפוס הגדרות נגישות",
    "closeTitle": "סגירת תפריט נגישות",
    "menuTitle": "אפשרויות נגישות",
    "increaseText": "הגדלת גודל טקסט",
    "decreaseText": "הקטנת גודל טקסט",
    "increaseTextSpacing": "הגדלת מרווחי טקסט",
    "decreaseTextSpacing": "הקטנת מרווחי טקסט",
    "increaseLineHeight": "הגדלת גובה שורה",
    "decreaseLineHeight": "הקטנת גובה שורה",
    "invertColors": "היפוך צבעים",
    "grayHues": "גוונים אפורים",
    "underlineLinks": "קו תחתי לקישורים",
    "bigCursor": "סמן גדול",
    "readingGuide": "מדריך קריאה",
    "textToSpeech": "טקסט לדיבור",
    "speechToText": "דיבור לטקסט",
    "suppressAnimations": "ביטול אנימציות"
  },
  "textToSpeechLang": "he-IL",
  "speechToTextLang": "he-IL",
  "enabled": true,
  "position": "bottom-right",
  "theme": "default"
});
      console.log('✅ Accessibility toolbar initialized successfully');
      
      // Add ARIA landmark improvements
      enhanceAriaLandmarks();
      
      // Add keyboard navigation improvements
      enhanceKeyboardNavigation();
      
      // Add focus management
      enhanceFocusManagement();
      
    } catch (error) {
      console.error('❌ Accessibility initialization failed:', error);
      console.error('❌ Error details:', error.message, error.stack);
    }
  }

  // Enhance ARIA landmarks for better screen reader support
  function enhanceAriaLandmarks() {
    try {
      // Add main landmark if missing
      const main = document.querySelector('main');
      if (!main) {
        const content = document.querySelector('.main-content, .content, #content');
        if (content && !content.getAttribute('role')) {
          content.setAttribute('role', 'main');
          content.setAttribute('aria-label', 'Main content');
        }
      }

      // Enhance navigation
      const nav = document.querySelector('nav');
      if (nav && !nav.getAttribute('aria-label')) {
        nav.setAttribute('aria-label', 'Main navigation');
      }

      // Enhance footer
      const footer = document.querySelector('footer');
      if (footer && !footer.getAttribute('role')) {
        footer.setAttribute('role', 'contentinfo');
      }

      // Add skip link if missing
      if (!document.querySelector('.skip-link, [href="#main"]')) {
        addSkipLink();
      }

      console.log('✅ ARIA landmarks enhanced');
    } catch (error) {
      console.error('❌ Error enhancing ARIA landmarks:', error);
    }
  }

  // Add skip link for keyboard navigation
  function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: white;
      padding: 8px;
      text-decoration: none;
      z-index: 10000;
      border-radius: 4px;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
      this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });
    
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector('#main, main, [role="main"]');
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Enhance keyboard navigation
  function enhanceKeyboardNavigation() {
    try {
      // Ensure all interactive elements are keyboard accessible
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
      
      interactiveElements.forEach(element => {
        // Add focus indicators
        if (!element.style.outline) {
          element.addEventListener('focus', function() {
            this.style.outline = '2px solid #146FF8';
            this.style.outlineOffset = '2px';
          });
          
          element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
          });
        }
      });

      // Add keyboard support for custom interactive elements
      const customInteractive = document.querySelectorAll('[onclick]:not(button):not(a):not(input)');
      customInteractive.forEach(element => {
        if (!element.getAttribute('tabindex')) {
          element.setAttribute('tabindex', '0');
        }
        if (!element.getAttribute('role')) {
          element.setAttribute('role', 'button');
        }
        
        element.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
          }
        });
      });

      console.log('✅ Keyboard navigation enhanced');
    } catch (error) {
      console.error('❌ Error enhancing keyboard navigation:', error);
    }
  }

  // Enhance focus management
  function enhanceFocusManagement() {
    try {
      // Ensure main content area can receive focus
      const main = document.querySelector('main, [role="main"], .main-content');
      if (main && !main.getAttribute('tabindex')) {
        main.setAttribute('tabindex', '-1');
      }

      // Improve form accessibility
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          // Associate labels with inputs
          if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
            const label = form.querySelector(`label[for="${input.id}"], label`);
            if (label && !label.getAttribute('for')) {
              const id = input.id || 'input_' + Math.random().toString(36).substr(2, 9);
              input.id = id;
              label.setAttribute('for', id);
            }
          }

          // Add required field indicators
          if (input.required && !input.getAttribute('aria-required')) {
            input.setAttribute('aria-required', 'true');
          }
        });
      });

      console.log('✅ Focus management enhanced');
    } catch (error) {
      console.error('❌ Error enhancing focus management:', error);
    }
  }

  // Initialize when DOM is ready - multiple approaches for reliability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessibility);
    // Backup timeout in case DOMContentLoaded doesn't fire
    setTimeout(initAccessibility, 1000);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initAccessibility();
  } else {
    // Fallback - try after a short delay
    setTimeout(initAccessibility, 500);
  }
  
  // Additional fallback - try after page load
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener('load', initAccessibility, { once: true });
    }
  }
})();