# Wedding Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from elegant wedding websites and romantic e-commerce experiences (like Zola, The Knot, Minted) with a focus on emotional storytelling and visual beauty.

## Core Design Principles
- Create an elegant, modern, and emotionally engaging experience
- Balance romantic aesthetics with practical functionality
- Ensure seamless navigation between storytelling and functional elements (gift registry, donations)
- Prioritize warmth and welcoming atmosphere throughout

## Color Palette

**Primary Colors (Light Mode):**
- Pure White: Base background
- Soft Beige: 40 15% 92% - Secondary backgrounds, card surfaces
- Blush Pink: 350 70% 90% - Accent backgrounds, hover states
- Rose Pink: 345 60% 75% - Interactive elements, borders
- Warm Gold: 45 80% 65% - Premium accents, CTAs, decorative elements

**Text Colors:**
- Primary Text: 0 0% 20% - Deep charcoal for main content
- Secondary Text: 0 0% 45% - Muted for supporting content
- Light Text: 0 0% 100% - On dark/image backgrounds

## Typography

**Font Families:**
- Primary Serif: 'Cormorant Garamond' or 'Playfair Display' (Google Fonts) - Headlines, couple names, section titles
- Cursive Accent: 'Great Vibes' or 'Allura' (Google Fonts) - Romantic slogans, special callouts
- Sans-Serif Body: 'Montserrat' or 'Lato' (Google Fonts) - Body text, descriptions, forms

**Type Scale:**
- Hero Title (Couple Names): text-6xl to text-8xl, serif, font-light
- Romantic Slogan: text-3xl to text-4xl, cursive
- Section Headers: text-4xl to text-5xl, serif, font-normal
- Subsection Headers: text-2xl to text-3xl, serif
- Body Text: text-base to text-lg, sans-serif
- Button Text: text-sm to text-base, sans-serif, font-medium

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, and 24 for consistent rhythm
- Section padding: py-16 to py-24 (desktop), py-12 to py-16 (mobile)
- Component spacing: gap-6 to gap-8 for grids
- Content margins: mb-6 to mb-12 between elements

**Container Widths:**
- Full-width hero sections: w-full
- Content sections: max-w-6xl to max-w-7xl
- Story paragraphs: max-w-3xl for optimal reading
- Forms: max-w-lg centered

## Component Library

### Hero Section
- Full-viewport height (min-h-screen) with large background photo of the couple
- Overlay gradient (soft pink to transparent) for text legibility
- Centered content: couple names, romantic slogan, wedding date
- Countdown timer with elegant card design
- Subtle floating petal animation in background

### Story Section
- Single-column centered layout (max-w-3xl)
- Generous whitespace around storytelling paragraph
- Decorative dividers or flourishes between sections
- Soft beige background to differentiate from hero

### Gift Registry Grid
- 3-column grid on desktop (lg:grid-cols-3), 2-column on tablet (md:grid-cols-2), single column on mobile
- Gift cards with:
  - Square or 4:3 aspect ratio images
  - White background with subtle shadow
  - Rounded corners (rounded-lg)
  - Title, brief description, "View Details" button
  - Hover effect: slight lift (transform) and shadow increase

### Individual Gift Pages
- Two-column layout: image gallery on left, details on right (desktop)
- Image display with thumbnail carousel if multiple images
- Purchase links as prominent gold buttons
- Personal note in italic serif font in soft pink card
- "Mark as Reserved" toggle with guest name input

### Pix Donation Section
- Elegant centered card design (max-w-lg)
- QR code prominently displayed
- Pix key in monospace font with copy button
- Gold accent border on card
- Heartfelt message in serif italic
- Could be modal popup or dedicated section on homepage

### Contact Form
- Centered single-column layout (max-w-lg)
- Input fields with soft borders and focus states (pink glow)
- Large textarea for messages
- "Send with Love" button in gold with heart icon
- Success message with romantic confirmation

### Footer
- Centered couple's initials in decorative monogram style
- Wedding date
- Optional social media links as soft gold icons
- Subtle decorative flourishes

## Animations & Interactions

**Subtle Animations:**
- Floating petals or particles in hero background (very gentle, slow movement)
- Fade-in on scroll for sections (intersection observer)
- Smooth scroll behavior between sections
- Hover lift on gift cards (translate-y-1)
- Button hover: slight scale and brightness increase
- Countdown timer numbers flip/fade when updating

**Avoid:**
- Aggressive or jarring animations
- Auto-playing carousels
- Excessive parallax effects

## Images

### Hero Image
- Large, romantic photo of the couple together
- High quality, professionally shot or well-composed
- Landscape orientation, full-width background
- Should convey emotion and connection
- Soft overlay to ensure text readability

### Gift Images
- Product photos on white/neutral backgrounds
- Consistent aspect ratios across all gift cards
- High resolution for zoom on detail pages
- Could include lifestyle shots showing items in use

### Decorative Elements
- Subtle floral illustrations or flourishes as section dividers
- Soft watercolor textures for backgrounds
- Optional: polaroid-style photo frames for couple photos in story section

## Responsive Design

**Mobile (sm):**
- Stack all multi-column layouts to single column
- Reduce hero text sizes (text-4xl for names, text-2xl for slogan)
- Maintain generous padding (px-4, py-12)
- Touch-friendly button sizes (min-h-12)

**Tablet (md):**
- 2-column gift grid
- Maintain vertical rhythm with py-16

**Desktop (lg+):**
- Full 3-column layouts for gifts
- Maximum visual impact on hero
- Side-by-side layouts for gift details

## Special Features

**Countdown Timer:**
- Display days, hours, minutes, seconds
- Elegant number styling with serif font
- Soft pink card background
- Gold separators between units

**Gift Reservation System:**
- Simple toggle/checkbox for "I'll get this gift"
- Guest name input (optional email for confirmation)
- Visual indicator on gift cards showing reserved status
- Prevent double-purchasing with clear UI

**Pix Integration:**
- Generate QR code dynamically or use static image
- One-click copy for Pix key
- Success feedback when copied
- Support multiple Pix keys if needed (separate accounts)

## Overall Mood & Feel
Every element should evoke **love, gratitude, and celebration** while remaining **simple and practical**. The design should feel like an invitation itself—warm, personal, and beautifully crafted. Guests should feel emotionally connected from their first visit and enjoy the experience of exploring the registry and sending their wishes.