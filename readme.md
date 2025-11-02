# NextJS with Typescript

# Next.js Routing Guide - My Learning Journey

A comprehensive guide covering Next.js App Router folder structure and routing concepts that I learned.

## 📚 Table of Contents

- [Folder Structure](#folder-structure)
- [Special Files](#special-files)
- [App Routing](#app-routing)
- [Nested Routing](#nested-routing)
- [Dynamic Routes](#dynamic-routes)
- [Catch-all Routes](#catch-all-routes)
- [Optional Catch-all Routes](#optional-catch-all-routes)
- [Route Groups](#route-groups)
- [Parallel Routes](#parallel-routes)
- [Navigation](#navigation)
- [Font Integration](#font-integration)
- [Image Integration](#image-integration)
- [Practice Setup](#practice-setup)

---

## 📁 Folder Structure

Next.js uses a **file-system based router** where folders define routes.

### Basic Structure

```
src/app/
├── layout.jsx          # Root layout (required)
├── page.jsx            # Home page (/)
├── loading.jsx         # Loading UI
├── error.jsx           # Error boundary
├── not-found.jsx       # 404 page
├── route.jsx           # API endpoints
├── template.jsx        # Re-rendering layout
├── default.jsx         # Fallback for parallel routes
├── globals.css         # Global styles
└── favicon.ico         # Site icon
```

---

## 🔧 Special Files

| File            | Purpose                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `layout.jsx`    | Defines the shared UI for a segment                                                                         |
| `page.jsx`      | The unique UI of a route, making the folder publicly accessible                                             |
| `loading.jsx`   | Shows a skeleton UI while a segment loads                                                                   |
| `error.jsx`     | Defines an error boundary for a segment                                                                     |
| `not-found.jsx` | Renders when a segment cannot be found                                                                      |
| `route.jsx`     | Defines an API endpoint (for handling HTTP methods like GET/POST)                                           |
| `template.jsx`  | Similar to a layout, but its state is destroyed and re-created upon navigation, enabling transition effects |
| `default.jsx`   | Fallback for parallel routes                                                                                |

---

## 🚀 App Routing

### Basic Route Creation

Create a folder with `page.jsx` inside:

**File:** `app/about/page.jsx` → **URL:** `/about`

```jsx
export default function About() {
  return <h1>About Page</h1>;
}
```

**File:** `app/contact/page.jsx` → **URL:** `/contact`

```jsx
export default function Contact() {
  return <h1>Contact Page</h1>;
}
```

---

## 🪆 Nested Routing

### Nested Layouts

Create nested folders for nested layouts:

```
app/
├── shop/
│   ├── layout.jsx     # Shop layout
│   ├── page.jsx       # /shop
│   └── products/
│       ├── layout.jsx # Products layout
│       └── page.jsx   # /shop/products
```

**File:** `app/shop/layout.jsx`

```jsx
export default function ShopLayout({ children }) {
  return (
    <div>
      <h1>Shop Header</h1>
      {children}
    </div>
  );
}
```

**File:** `app/shop/products/layout.jsx`

```jsx
export default function ProductsLayout({ children }) {
  return (
    <div>
      <nav>Products Navigation</nav>
      {children}
    </div>
  );
}
```

---

## 🎯 Dynamic Routes

### Single Dynamic Segment

Use `[folderName]` for dynamic routes:

**File:** `app/users/[id]/page.jsx` → **URLs:** `/users/1`, `/users/123`

```jsx
export default function UserProfile({ params }) {
  return <h1>User Profile: {params.id}</h1>;
}
```

### Multiple Dynamic Segments

**File:** `app/categories/[category]/products/[productId]/page.jsx`  
**URL:** `/categories/electronics/products/123`

```jsx
export default function ProductPage({ params }) {
  return (
    <div>
      <h1>Category: {params.category}</h1>
      <h2>Product ID: {params.productId}</h2>
    </div>
  );
}
```

---

## 📦 Catch-all Routes

### Required Catch-all Routes

Use `[...folderName]` to catch all segments:

**File:** `app/docs/[...slug]/page.jsx`  
**Matches:**

- `/docs/getting-started`
- `/docs/getting-started/installation`
- `/docs/api/routing`

```jsx
export default function DocsPage({ params }) {
  return (
    <div>
      <h1>Documentation</h1>
      <p>Slug: {params.slug.join('/')}</p>
    </div>
  );
}
```

**Access multiple segments as array:**

```jsx
// For /docs/api/routing
params.slug; // ['api', 'routing']
```

---

## 📦 Optional Catch-all Routes

Use `[[...folderName]]` for optional catch-all:

**File:** `app/blog/[[...slug]]/page.jsx`  
**Matches:**

- `/blog` (slug is undefined)
- `/blog/2023`
- `/blog/2023/react`

```jsx
export default function BlogPage({ params }) {
  return (
    <div>
      <h1>Blog</h1>
      {params.slug ? (
        <p>Viewing: {params.slug.join('/')}</p>
      ) : (
        <p>All blog posts</p>
      )}
    </div>
  );
}
```

---

## 📂 Route Groups

### Organizing Routes without Affecting URL

Use `(folderName)` for route groups:

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.jsx    # /login
│   └── register/
│       └── page.jsx    # /register
├── (marketing)/
│   ├── about/
│   │   └── page.jsx    # /about
│   └── contact/
│       └── page.jsx    # /contact
└── page.jsx            # /
```

**Shared Layout for Group**  
**File:** `app/(auth)/layout.jsx`

```jsx
export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <h2>Authentication</h2>
      {children}
    </div>
  );
}
```

### Benefits of Route Groups

- ✅ Organize routes without affecting URL structure
- ✅ Apply different layouts to groups of routes
- ✅ Share components within groups
- ✅ Better project organization

---

## 🔀 Parallel Routes

Parallel routes allow you to render multiple pages in the same layout simultaneously based on different conditions.

### Structure

Use `@folderName` syntax for parallel routes:

```
app/
├── @team/
│   └── page.jsx
├── @analytics/
│   └── page.jsx
├── layout.jsx
└── page.jsx
```

**File:** `app/@team/page.jsx`

```jsx
import React from 'react';

const page = () => {
  return <div>This is team parallel route</div>;
};

export default page;
```

**File:** `app/@analytics/page.jsx`

```jsx
import React from 'react';

const page = () => {
  return <div>This is analytics parallel route</div>;
};

export default page;
```

**File:** `app/layout.jsx`

```jsx
export default function Layout({ children, team, analytics }) {
  return (
    <div>
      <main>{children}</main>
      <aside>{team}</aside>
      <aside>{analytics}</aside>
    </div>
  );
}
```

### How It Works

- We can show different pages based on different conditions
- Use `@` prefix for parallel route folders (e.g., `@team/`, `@analytics/`)
- Access them as props in `layout.jsx`
- Useful for dashboards, split views, and conditional rendering

---

## 🧭 Navigation

Next.js provides multiple ways to navigate between routes.

### 1. Using `<Link>` Component

The `<Link>` component is the primary way to navigate between routes in Next.js.

**File:** `app/components/Navbar.jsx`

```jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/users/123">User Profile</Link>
    </nav>
  );
}
```

#### Link with Dynamic Routes

```jsx
import Link from 'next/link';

export default function UserList() {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ];

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  );
}
```

#### Link with Active State

```jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className={pathname === '/' ? 'active' : ''}>
        Home
      </Link>
      <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
        About
      </Link>
    </nav>
  );
}
```

### 2. Using `useRouter` Hook

The `useRouter` hook allows programmatic navigation (must use `'use client'`).

**File:** `app/components/LoginButton.jsx`

```jsx
'use client';

import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    // Perform login logic
    router.push('/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

#### useRouter Methods

```jsx
'use client';

import { useRouter } from 'next/navigation';

export default function NavigationExample() {
  const router = useRouter();

  return (
    <div>
      {/* Navigate to a route */}
      <button onClick={() => router.push('/about')}>Go to About</button>

      {/* Replace current route (no history) */}
      <button onClick={() => router.replace('/profile')}>
        Replace with Profile
      </button>

      {/* Go back */}
      <button onClick={() => router.back()}>Go Back</button>

      {/* Go forward */}
      <button onClick={() => router.forward()}>Go Forward</button>

      {/* Refresh the page */}
      <button onClick={() => router.refresh()}>Refresh</button>

      {/* Prefetch a route */}
      <button onClick={() => router.prefetch('/dashboard')}>
        Prefetch Dashboard
      </button>
    </div>
  );
}
```

### 3. Using `redirect()` Function

Use `redirect()` for server-side redirects.

**File:** `app/profile/page.jsx`

```jsx
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    redirect('/login');
  }

  return <h1>Profile Page</h1>;
}
```

### Navigation Best Practices

| Method       | Use Case                                       |
| ------------ | ---------------------------------------------- |
| `<Link>`     | Default navigation, SEO-friendly               |
| `useRouter`  | Programmatic navigation, conditional redirects |
| `redirect()` | Server-side redirects, authentication checks   |

---

## 🔤 Font Integration

Next.js provides built-in font optimization with `next/font`.

### 1. Google Fonts

**File:** `app/layout.jsx`

```jsx
import { Inter, Roboto, Poppins } from 'next/font/google';

// Single font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
});

// Multiple weights
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

// Variable font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable}`}>{children}</body>
    </html>
  );
}
```

**Use in CSS:**

```css
/* globals.css */
body {
  font-family: var(--font-inter);
}

h1 {
  font-family: var(--font-roboto);
}
```

### 2. Local Fonts

**File:** `app/layout.jsx`

```jsx
import localFont from 'next/font/local';

const myFont = localFont({
  src: './fonts/my-font.woff2',
  variable: '--font-my-font',
  weight: '400',
});

// Multiple font files
const customFont = localFont({
  src: [
    {
      path: './fonts/custom-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/custom-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
```

### 3. Font Usage Examples

**Direct className:**

```jsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Page() {
  return (
    <div className={inter.className}>
      <h1>This uses Inter font</h1>
    </div>
  );
}
```

**With Tailwind CSS:**

```jsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
};
```

---

## 🖼️ Image Integration

Next.js provides the `<Image>` component for automatic image optimization.

### 1. Local Images

**File:** `app/page.jsx`

```jsx
import Image from 'next/image';
import profilePic from './profile.jpg'; // Import local image

export default function Home() {
  return (
    <div>
      <Image
        src={profilePic}
        alt="Profile Picture"
        width={500}
        height={500}
        priority // Load immediately (above the fold)
      />
    </div>
  );
}
```

### 2. Remote Images

**File:** `app/page.jsx`

```jsx
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Image
        src="https://example.com/image.jpg"
        alt="Remote Image"
        width={800}
        height={600}
      />
    </div>
  );
}
```

**Configure remote domains:**

**File:** `next.config.js`

```js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
```

### 3. Image Component Properties

```jsx
import Image from 'next/image';

export default function ImageExample() {
  return (
    <div>
      {/* Basic image */}
      <Image
        src="/images/photo.jpg"
        alt="Description"
        width={600}
        height={400}
      />

      {/* Fill container (requires parent with position: relative) */}
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Image
          src="/images/banner.jpg"
          alt="Banner"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* With quality */}
      <Image
        src="/images/hq-photo.jpg"
        alt="High Quality"
        width={800}
        height={600}
        quality={100} // 1-100, default is 75
      />

      {/* With placeholder blur */}
      <Image
        src="/images/photo.jpg"
        alt="Photo with blur"
        width={600}
        height={400}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />

      {/* Responsive image */}
      <Image
        src="/images/responsive.jpg"
        alt="Responsive"
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Priority loading (LCP) */}
      <Image
        src="/images/hero.jpg"
        alt="Hero"
        width={1200}
        height={600}
        priority
      />
    </div>
  );
}
```

### 4. Image Optimization Features

| Feature                    | Description                        |
| -------------------------- | ---------------------------------- |
| **Automatic optimization** | Images are optimized on-demand     |
| **Lazy loading**           | Images load as they enter viewport |
| **Responsive**             | Automatic srcset generation        |
| **Format conversion**      | WebP/AVIF support                  |
| **Blur placeholder**       | Show blur while loading            |
| **Priority loading**       | Load critical images first         |

### 5. Background Image Example

```jsx
import Image from 'next/image';

export default function Hero() {
  return (
    <div style={{ position: 'relative', height: '500px' }}>
      <Image
        src="/images/hero-bg.jpg"
        alt="Background"
        fill
        style={{
          objectFit: 'cover',
          zIndex: -1,
        }}
        quality={90}
        priority
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>Hero Content</h1>
      </div>
    </div>
  );
}
```

### 6. Image in Public Folder

Place images in `public` folder:

```
public/
├── images/
│   ├── logo.png
│   └── avatar.jpg
└── favicon.ico
```

**Usage:**

```jsx
import Image from 'next/image';

export default function Logo() {
  return <Image src="/images/logo.png" alt="Logo" width={200} height={50} />;
}
```

---

## 🛠️ Practice Setup

### Minimal Setup for Learning

Create these files in the `app` folder (not in nested folders):

#### 1. `app/layout.jsx`

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

#### 2. `app/page.jsx`

```jsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```

#### 3. `app/loading.jsx`

```jsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

#### 4. `app/error.jsx`

```jsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

#### 5. `app/not-found.jsx`

```jsx
export default function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}
```

#### 6. `app/route.jsx`

```jsx
export async function GET() {
  return Response.json({ message: 'Hello from API' });
}
```

#### 7. `app/template.jsx`

```jsx
export default function Template({ children }) {
  return <div>{children}</div>;
}
```

#### 8. `app/default.jsx`

```jsx
export default function Default() {
  return <div>Default Parallel Route</div>;
}
```

---

## 📝 Key Points to Remember

- ✅ Folders define routes, files define UI
- ✅ `page.jsx` is required to make a route accessible
- ✅ `layout.jsx` wraps child segments and preserves state
- ✅ Dynamic segments use `[paramName]` syntax
- ✅ Route groups `(groupName)` don't affect URLs
- ✅ Catch-all routes capture multiple path segments
- ✅ Parallel routes use `@folderName` syntax

---

## 🌳 Example Project Structure

```
app/
├── (auth)/
│   ├── login/page.jsx
│   └── register/page.jsx
├── (dashboard)/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── @team/
│   │   └── page.jsx
│   ├── @analytics/
│   │   └── page.jsx
│   └── settings/
│       └── page.jsx
├── shop/
│   ├── [category]/
│   │   └── page.jsx
│   └── products/
│       └── [...slug]/
│           └── page.jsx
├── api/
│   └── users/
│       └── route.jsx
├── layout.jsx
├── page.jsx
├── loading.jsx
├── error.jsx
└── not-found.jsx
```

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Routing Fundamentals](https://nextjs.org/docs/app/building-your-application/routing)

---

Made with ❤️ By &copy;Bhanu Pratap Patkar while learning Next.js with Typescript
