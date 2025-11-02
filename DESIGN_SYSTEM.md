# 🎨 Pocket Budget - Design System

> Inspired by Wealthsimple's minimalist, bold, and delightful design language

## 🎯 Design Philosophy

**Principles:**
1. **Minimalism First**: Clean, uncluttered interface with generous white space
2. **Bold & Clear**: Strong typography hierarchy, high contrast, obvious affordances
3. **Delightful Interactions**: Subtle animations and haptic feedback that feel premium
4. **Speed as a Feature**: Every animation is purposeful and fast (< 300ms)
5. **Accessibility Always**: WCAG AA compliance with keyboard and screen reader support

---

## 🎨 Color Palette

### Primary Colors
```css
--ws-black: #000000;           /* Primary text, strong contrast */
--ws-white: #FFFFFF;           /* Background, clean canvas */
--ws-coral: #FF5A5F;           /* Primary CTA, expenses (replaces Wealthsimple's teal) */
--ws-coral-dark: #E84A4F;      /* Hover state */
--ws-coral-light: #FFE8E9;     /* Background tint */
```

### Secondary Colors
```css
--ws-green: #00D68F;           /* Success, positive values, budgets on track */
--ws-green-light: #E6FBF4;     /* Success background */
--ws-yellow: #FFB800;          /* Warning, approaching budget limit */
--ws-yellow-light: #FFF8E6;    /* Warning background */
--ws-red: #FF3B30;             /* Error, over budget */
--ws-red-light: #FFE8E6;       /* Error background */
```

### Neutral Colors
```css
--ws-gray-900: #1A1A1A;        /* Headings */
--ws-gray-700: #4A4A4A;        /* Body text */
--ws-gray-500: #8A8A8A;        /* Secondary text */
--ws-gray-300: #D1D1D1;        /* Borders */
--ws-gray-100: #F5F5F5;        /* Background tint */
--ws-gray-50: #FAFAFA;         /* Card background */
```

### Gradients
```css
--ws-gradient-coral: linear-gradient(135deg, #FF5A5F 0%, #FF8B8E 100%);
--ws-gradient-success: linear-gradient(135deg, #00D68F 0%, #00F5A0 100%);
--ws-gradient-dark: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%);
```

---

## ✍️ Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 
             'Roboto', 'Helvetica Neue', Arial, sans-serif;
```

### Type Scale
```css
/* Display - Hero numbers, main totals */
.text-display {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

/* H1 - Page titles */
.text-h1 {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

/* H2 - Section headers */
.text-h2 {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
}

/* H3 - Card headers */
.text-h3 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

/* Body - Default text */
.text-body {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
}

/* Small - Secondary info */
.text-small {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
}

/* Caption - Hints, labels */
.text-caption {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
```

### Number Formatting
```css
/* Always use tabular nums for financial data */
.amount {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}
```

---

## 🎭 Spacing System

### Scale (8px base)
```css
--space-1: 4px;    /* Tight spacing */
--space-2: 8px;    /* Default gap */
--space-3: 12px;   /* Small margin */
--space-4: 16px;   /* Medium margin */
--space-5: 24px;   /* Large margin */
--space-6: 32px;   /* Section spacing */
--space-7: 48px;   /* Page section */
--space-8: 64px;   /* Hero spacing */
```

### Component Spacing
- **Input fields**: `padding: 16px;` (space-4)
- **Buttons**: `padding: 12px 24px;` (space-3 space-5)
- **Cards**: `padding: 24px;` (space-5)
- **List items**: `padding: 16px;` (space-4)

---

## 🎬 Animation & Motion

### Timing Functions
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);        /* Wealthsimple signature ease */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);      /* Smooth deceleration */
--ease-in-out-back: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Playful bounce */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);     /* Spring effect */
```

### Duration
```css
--duration-instant: 100ms;   /* Hover states */
--duration-fast: 200ms;      /* Micro-interactions */
--duration-base: 300ms;      /* Default transitions */
--duration-slow: 500ms;      /* Page transitions */
```

### Keyframe Animations

#### Fade In Up (Entry animation)
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 400ms var(--ease-out-expo) both;
}
```

#### Scale In (Success feedback)
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 300ms var(--ease-out-quart) both;
}
```

#### Shimmer (Loading state)
```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
}
```

#### Pulse (Active state)
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

#### Slide In From Right (Toast notification)
```css
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in-right {
  animation: slideInRight 400ms var(--ease-out-expo) both;
}
```

---

## 📱 Haptic Feedback

### Implementation Strategy
```typescript
// lib/haptics.ts
type HapticStyle = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

export const haptic = (style: HapticStyle = 'light') => {
  // Check if running in standalone PWA mode
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  
  // iOS Haptic Engine (Safari/PWA)
  if ('vibrate' in navigator) {
    const patterns: Record<HapticStyle, number[]> = {
      light: [10],                    // Quick tap
      medium: [20],                   // Button press
      heavy: [30],                    // Important action
      success: [10, 50, 10],          // Success pattern
      warning: [20, 100, 20],         // Warning pattern
      error: [30, 100, 30, 100, 30]   // Error pattern (SOS-like)
    };
    
    navigator.vibrate(patterns[style]);
  }
  
  // iOS Taptic Engine (for future native wrapper)
  if ('TapticEngine' in window) {
    // @ts-ignore
    window.TapticEngine.impact({ style });
  }
};

export const hapticOnClick = (callback?: () => void) => {
  return () => {
    haptic('light');
    callback?.();
  };
};

export const hapticOnSuccess = () => haptic('success');
export const hapticOnError = () => haptic('error');
export const hapticOnWarning = () => haptic('warning');
```

### Usage Patterns
```typescript
// Button press
<button onClick={() => {
  haptic('medium');
  handleSubmit();
}}>
  Add Expense
</button>

// Success toast
const showSuccessToast = () => {
  haptic('success');
  toast.success('Transaction added!');
};

// Swipe actions
const handleSwipe = () => {
  haptic('light');
  // Handle swipe
};

// Input focus (subtle)
<input 
  onFocus={() => haptic('light')}
  onChange={handleChange}
/>

// Category selection
<CategoryPill 
  onClick={() => {
    haptic('medium');
    selectCategory(id);
  }}
/>
```

---

## 🧩 Component Patterns

### 1. Primary Button (Coral CTA)
```tsx
<button className="
  w-full
  bg-[--ws-coral]
  text-white
  font-semibold
  text-base
  px-6 py-4
  rounded-2xl
  shadow-[0_4px_12px_rgba(255,90,95,0.3)]
  transition-all
  duration-200
  ease-out-expo
  hover:bg-[--ws-coral-dark]
  hover:shadow-[0_6px_20px_rgba(255,90,95,0.4)]
  hover:translate-y-[-2px]
  active:translate-y-[0px]
  active:shadow-[0_2px_8px_rgba(255,90,95,0.3)]
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:transform-none
">
  Add Expense
</button>
```

### 2. Input Field (Minimal Border)
```tsx
<input 
  type="text"
  className="
    w-full
    bg-white
    border-2
    border-[--ws-gray-300]
    rounded-xl
    px-4 py-4
    text-lg
    font-medium
    placeholder:text-[--ws-gray-500]
    focus:border-[--ws-coral]
    focus:outline-none
    focus:ring-4
    focus:ring-[--ws-coral-light]
    transition-all
    duration-200
  "
  placeholder="15 beef, 12.9 carrot"
/>
```

### 3. Period Chip (Toggle)
```tsx
<button className={`
  px-6 py-3
  rounded-full
  font-semibold
  text-sm
  transition-all
  duration-200
  ${active 
    ? 'bg-[--ws-black] text-white shadow-lg' 
    : 'bg-[--ws-gray-100] text-[--ws-gray-700] hover:bg-[--ws-gray-300]'
  }
`}>
  Today · $127.50
</button>
```

### 4. Transaction Card (Elevated)
```tsx
<div className="
  bg-white
  rounded-2xl
  p-5
  shadow-[0_2px_8px_rgba(0,0,0,0.08)]
  hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]
  transition-all
  duration-300
  ease-out-expo
  border
  border-[--ws-gray-100]
">
  <div className="flex items-center justify-between">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base font-medium text-[--ws-gray-900]">
          Grocery
        </span>
        <CategoryPill />
      </div>
      <p className="text-sm text-[--ws-gray-500]">
        beef, carrot, milk
      </p>
    </div>
    <div className="text-right">
      <p className="text-2xl font-bold tabular-nums text-[--ws-gray-900]">
        $27.90
      </p>
      <p className="text-xs text-[--ws-gray-500] mt-1">
        2:34 PM
      </p>
    </div>
  </div>
</div>
```

### 5. Toast Notification (Slide In)
```tsx
<div className="
  fixed bottom-8 right-8
  bg-[--ws-black]
  text-white
  px-6 py-4
  rounded-2xl
  shadow-[0_8px_32px_rgba(0,0,0,0.3)]
  animate-slide-in-right
  backdrop-blur-sm
">
  <div className="flex items-center gap-3">
    <CheckCircle className="w-5 h-5 text-[--ws-green]" />
    <div>
      <p className="font-semibold">Added Grocery · $27.90</p>
      <p className="text-sm opacity-80">Today: $127.50</p>
    </div>
  </div>
</div>
```

### 6. Loading Skeleton
```tsx
<div className="animate-shimmer h-12 rounded-xl bg-gradient-to-r from-[--ws-gray-100] via-[--ws-gray-200] to-[--ws-gray-100]" />
```

---

## 🎯 Interaction States

### Button States
```css
/* Default */
.btn-primary {
  background: var(--ws-coral);
  box-shadow: 0 4px 12px rgba(255, 90, 95, 0.3);
  transform: translateY(0);
}

/* Hover */
.btn-primary:hover {
  background: var(--ws-coral-dark);
  box-shadow: 0 6px 20px rgba(255, 90, 95, 0.4);
  transform: translateY(-2px);
}

/* Active/Press */
.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(255, 90, 95, 0.3);
}

/* Focus (keyboard) */
.btn-primary:focus-visible {
  outline: 3px solid var(--ws-coral);
  outline-offset: 2px;
}

/* Disabled */
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

---

## 📐 Layout Principles

### Container Widths
```css
--container-sm: 480px;   /* Mobile */
--container-md: 768px;   /* Tablet */
--container-lg: 1024px;  /* Desktop */
--container-xl: 1280px;  /* Wide */
```

### Grid System
```tsx
// Home page layout
<div className="min-h-screen bg-[--ws-gray-50] pb-safe">
  {/* Top section - Hero input */}
  <section className="bg-white px-6 pt-safe pt-12 pb-8 border-b border-[--ws-gray-200]">
    <input />
    <div className="flex gap-3 mt-6">
      <PeriodChip />
    </div>
  </section>

  {/* Summary cards */}
  <section className="px-6 py-8">
    <div className="grid gap-4">
      <TotalCard />
    </div>
  </section>

  {/* Recent transactions */}
  <section className="px-6 pb-24">
    <h2 className="text-h2 mb-4">Recent</h2>
    <div className="grid gap-3">
      <TransactionCard />
    </div>
  </section>
</div>
```

---

## 🎨 Dark Mode (Future)
```css
@media (prefers-color-scheme: dark) {
  --ws-black: #FFFFFF;
  --ws-white: #000000;
  --ws-gray-900: #F5F5F5;
  --ws-gray-700: #D1D1D1;
  --ws-gray-500: #8A8A8A;
  --ws-gray-300: #4A4A4A;
  --ws-gray-100: #2A2A2A;
  --ws-gray-50: #1A1A1A;
}
```

---

## ♿ Accessibility

### Minimum Requirements
- **Contrast**: 4.5:1 for text, 3:1 for UI components
- **Tap Targets**: Minimum 44×44pt on mobile
- **Focus Indicators**: 3px solid outline with 2px offset
- **Motion**: Respect `prefers-reduced-motion`
- **Screen Readers**: Semantic HTML + ARIA labels

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 Mobile-Specific

### Safe Areas (iPhone notch/home indicator)
```css
/* Add padding for safe areas */
.pt-safe {
  padding-top: env(safe-area-inset-top);
}

.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

.pl-safe {
  padding-left: env(safe-area-inset-left);
}

.pr-safe {
  padding-right: env(safe-area-inset-right);
}
```

### Touch Optimization
```css
/* Prevent text selection on buttons */
.no-select {
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

/* Smooth scroll on iOS */
.scroll-smooth {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Remove tap highlight */
.no-tap-highlight {
  -webkit-tap-highlight-color: transparent;
}
```

---

## 🎬 Page Transitions

### Entry Animation (Page load)
```tsx
// Stagger animation for list items
{transactions.map((tx, i) => (
  <TransactionCard 
    key={tx.id}
    style={{
      animationDelay: `${i * 50}ms`
    }}
    className="animate-fade-in-up"
  />
))}
```

### Exit Animation (Navigation)
```tsx
// Fade out before navigation
const navigate = async (path: string) => {
  document.body.classList.add('fade-out');
  await new Promise(r => setTimeout(r, 200));
  router.push(path);
};
```

---

## 🔧 Implementation Utilities

### Tailwind Config Extensions
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'ws-coral': '#FF5A5F',
        'ws-coral-dark': '#E84A4F',
        'ws-coral-light': '#FFE8E9',
        'ws-green': '#00D68F',
        'ws-yellow': '#FFB800',
        'ws-red': '#FF3B30',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'ws-sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'ws-md': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'ws-lg': '0 8px 32px rgba(0, 0, 0, 0.16)',
        'ws-coral': '0 4px 12px rgba(255, 90, 95, 0.3)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 300ms cubic-bezier(0.25, 1, 0.5, 1) both',
        'slide-in-right': 'slideInRight 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer': 'shimmer 2s infinite linear',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
};
```

---

## 📊 Performance Guidelines

1. **Animation Budget**: Max 300ms duration for any transition
2. **FPS Target**: 60fps for all animations (16.67ms per frame)
3. **GPU Acceleration**: Use `transform` and `opacity` only for animations
4. **Lazy Load**: Images and heavy components below the fold
5. **Code Split**: Route-based splitting with React.lazy()

---

## ✅ Design Checklist

- [ ] All buttons have haptic feedback
- [ ] All animations respect `prefers-reduced-motion`
- [ ] All interactive elements ≥44pt tap targets
- [ ] All text meets WCAG AA contrast ratios
- [ ] All states (hover, focus, active, disabled) defined
- [ ] All amounts use tabular-nums for alignment
- [ ] All transitions under 300ms
- [ ] Safe area insets applied on iOS
- [ ] Loading skeletons match content layout
- [ ] Error states are gentle and helpful

---

**Last Updated**: 2025-11-02
**Version**: 1.0.0

