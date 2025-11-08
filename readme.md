# Next.js with TypeScript - Complete Learning Guide

A comprehensive guide covering Next.js App Router, TypeScript fundamentals, data fetching strategies, and API creation.

## 📚 Table of Contents

### Next.js Fundamentals
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

### TypeScript Fundamentals
- [What is TypeScript?](#what-is-typescript)
- [Installation & Setup](#installation--setup)
- [Basic Types](#basic-types)
- [Arrays & Tuples](#arrays--tuples)
- [Type Annotations](#type-annotations)
- [Type Declaration & Type Inference](#type-declaration--type-inference)
- [Union Types](#union-types)
- [Functions](#functions)
- [Objects & Interfaces](#objects--interfaces)
- [Type Aliases](#type-aliases)
- [Difference between Type & Interface](#difference-between-type--interface)
- [Union & Intersection Types](#union--intersection-types)
- [Enums](#enums)
- [Generics](#generics)
- [Global Declaration](#global-declaration)
- [React with TypeScript](#react-with-typescript)
- [React Types Reference](#react-types-reference)

### Data Fetching & APIs
- [Data Fetching in Next.js](#data-fetching-in-nextjs)
- [Server Side Rendering (SSR)](#server-side-rendering-ssr)
- [Static Site Generation (SSG)](#static-site-generation-ssg)
- [Incremental Static Regeneration (ISR)](#incremental-static-regeneration-isr)
- [Client-Side Data Fetching](#client-side-data-fetching)
- [API Routes Creation](#api-routes-creation)
- [Best Practices Summary](#best-practices-summary)

---

## 📁 Folder Structure

Next.js uses a **file-system based router** where folders define routes.

### Basic Structure
```
src/app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── loading.tsx         # Loading UI
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── route.ts            # API endpoints
├── template.tsx        # Re-rendering layout
├── default.tsx         # Fallback for parallel routes
├── globals.css         # Global styles
└── favicon.ico         # Site icon
```

---

## 🔧 Special Files

| File | Purpose |
|------|---------|
| `layout.tsx` | Defines the shared UI for a segment |
| `page.tsx` | The unique UI of a route, making the folder publicly accessible |
| `loading.tsx` | Shows a skeleton UI while a segment loads |
| `error.tsx` | Defines an error boundary for a segment |
| `not-found.tsx` | Renders when a segment cannot be found |
| `route.ts` | Defines an API endpoint (for handling HTTP methods like GET/POST) |
| `template.tsx` | Similar to a layout, but its state is destroyed and re-created upon navigation |
| `default.tsx` | Fallback for parallel routes |

---

## 🚀 App Routing

### Basic Route Creation
Create a folder with `page.tsx` inside:

**File:** `app/about/page.tsx` → **URL:** `/about`
```typescript
export default function About() {
  return <h1>About Page</h1>;
}
```

**File:** `app/contact/page.tsx` → **URL:** `/contact`
```typescript
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
│   ├── layout.tsx     # Shop layout
│   ├── page.tsx       # /shop
│   └── products/
│       ├── layout.tsx # Products layout
│       └── page.tsx   # /shop/products
```

**File:** `app/shop/layout.tsx`
```typescript
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Shop Header</h1>
      {children}
    </div>
  );
}
```

---

## 🎯 Dynamic Routes

### Single Dynamic Segment
Use `[folderName]` for dynamic routes:

**File:** `app/users/[id]/page.tsx` → **URLs:** `/users/1`, `/users/123`
```typescript
interface UserProfileProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: UserProfileProps) {
  return <h1>User Profile: {params.id}</h1>;
}
```

### Multiple Dynamic Segments
**File:** `app/categories/[category]/products/[productId]/page.tsx`

```typescript
interface ProductPageProps {
  params: {
    category: string;
    productId: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
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

**File:** `app/docs/[...slug]/page.tsx`

```typescript
interface DocsPageProps {
  params: {
    slug: string[];
  };
}

export default function DocsPage({ params }: DocsPageProps) {
  return (
    <div>
      <h1>Documentation</h1>
      <p>Slug: {params.slug.join('/')}</p>
    </div>
  );
}
```

---

## 📦 Optional Catch-all Routes

Use `[[...folderName]]` for optional catch-all:

**File:** `app/blog/[[...slug]]/page.tsx`

```typescript
interface BlogPageProps {
  params: {
    slug?: string[];
  };
}

export default function BlogPage({ params }: BlogPageProps) {
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
│   │   └── page.tsx    # /login
│   └── register/
│       └── page.tsx    # /register
├── (marketing)/
│   ├── about/
│   │   └── page.tsx    # /about
│   └── contact/
│       └── page.tsx    # /contact
└── page.tsx            # /
```

---

## 🔀 Parallel Routes

Parallel routes allow you to render multiple pages in the same layout simultaneously.

**File:** `app/layout.tsx`
```typescript
interface LayoutProps {
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}

export default function Layout({ children, team, analytics }: LayoutProps) {
  return (
    <div>
      <main>{children}</main>
      <aside>{team}</aside>
      <aside>{analytics}</aside>
    </div>
  );
}
```

---

## 🧭 Navigation

### 1. Using `<Link>` Component

**File:** `app/components/Navbar.tsx`
```typescript
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
```

### 2. Using `useRouter` Hook

```typescript
'use client';

import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### 3. Using `redirect()` Function

```typescript
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    redirect('/login');
  }

  return <h1>Profile Page</h1>;
}
```

---

## 🔤 Font Integration

### Google Fonts

**File:** `app/layout.tsx`
```typescript
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
});

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

---

## 🖼️ Image Integration

### Local Images

```typescript
import Image from 'next/image';
import profilePic from './profile.jpg';

export default function Home() {
  return (
    <Image
      src={profilePic}
      alt="Profile Picture"
      width={500}
      height={500}
      priority
    />
  );
}
```

### Remote Images

```typescript
import Image from 'next/image';

export default function Home() {
  return (
    <Image
      src="https://example.com/image.jpg"
      alt="Remote Image"
      width={800}
      height={600}
    />
  );
}
```

---

## 🎯 What is TypeScript?

- **TypeScript is a strongly typed, object-oriented, compiled programming language developed by Microsoft.**
- **It is a superset of JavaScript**, meaning that all valid JavaScript code is also valid TypeScript code.
- **The primary addition TypeScript brings to JavaScript is static typing**, allowing developers to define the types of variables, function parameters, and return values.

### Key Benefits
✅ Catch errors at compile time  
✅ Better IDE support and autocomplete  
✅ Improved code documentation  
✅ Enhanced code maintainability  

---

## 🚀 Installation & Setup

### Install TypeScript
```bash
npm i typescript -D
```

### Initialize TypeScript Configuration
```bash
npx tsc --init
```

---

## 📝 Basic Types

```typescript
let age: number = 25;
let name: string = "Aman";
let isOnline: boolean = true;
let scores: number[] = [10, 20, 30];
let user: [string, number] = ["Aman", 23];  // Tuple
```

---

## 📊 Arrays & Tuples

### Arrays
```typescript
let scores: number[] = [10, 20, 30];
let names: Array<string> = ["Aman", "Ravi"];
```

### Tuples
Fixed-length, ordered arrays with specific types.
```typescript
let user: [string, number] = ["Aman", 23];
```

---

## 🏷️ Type Annotations

```typescript
let username: string = "John Doe";
let username: string = 5434523; // ❌ Error
```

---

## 🔍 Type Declaration & Type Inference

### Explicit Declaration
```typescript
let count: number = 5;
```

### Type Inference
```typescript
let age = 20;           // inferred number
let city = "Delhi";     // inferred string
```

---

## 🔀 Union Types

```typescript
let topseller: (string | number)[] = ["laptop", "iphone", 42];
```

---

## 🔧 Functions

### Basic Functions
```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

### Optional & Default Parameters
```typescript
function greet(name: string, prefix?: string): string {
  return `${prefix}, ${name}`;
}

function greet2(name: string, prefix: string = "Hi"): string {
  return `${prefix}, ${name}`;
}
```

---

## 📦 Objects & Interfaces

```typescript
interface User {
  id: number;
  name: string;
  email?: string;        // optional
  readonly role: string; // readonly
}

const u: User = { id: 1, name: "Aman", role: "Admin" };
```

### Extending Interfaces
```typescript
interface Employee extends User {
  salary: number;
}
```

---

## 🎭 Type Aliases

```typescript
type ID = number | string;
type Status = "success" | "error" | "loading";

let userId: ID = 4;
let state: Status = "success";
```

### Function Signatures
```typescript
type MathFn = (a: number, b: number) => number;

const divide: MathFn = (a, b) => a / b;
```

---

## ⚖️ Difference between Type & Interface

| Feature | Type | Interface |
|---------|------|-----------|
| **Combine** | ✅ & operator | ✅ extends |
| **Merge** | ❌ | ✅ |
| **Union** | ✅ | ❌ |
| **Use-case** | primitives, unions, functions | object shapes |

---

## 🔗 Union & Intersection Types

### Union Types
```typescript
type Response = "ok" | "fail" | "loading";
let res: Response = "ok";
```

### Intersection Types
```typescript
type Person = { name: string };
type Contact = { phone: string };
type Full = Person & Contact;

const user: Full = { name: "Aman", phone: "123" };
```

---

## 🎨 Enums

```typescript
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

enum HttpStatusCode {
  OK = 200,
  NotFound = 404
}
```

---

## 🔮 Generics

```typescript
function identity<T>(value: T): T {
  return value;
}

const n = identity(10);
const s = identity("hello");
```

### Generic Interface
```typescript
interface Box<T> { 
  value: T; 
}

const stringBox: Box<string> = { value: "Hi" };
```

---

## 🌐 Global Declaration

### File: `src/types.d.ts`
```typescript
declare global {
  interface Window { 
    appVersion: string; 
  }
  
  type ApiResponse<T> = {
    data: T;
    error?: string;
  };
}

export {};
```

---

## ⚛️ React with TypeScript

### Props
```typescript
type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => 
  <button onClick={onClick}>{label}</button>;
```

### useState / useRef
```typescript
const [count, setCount] = useState<number>(0);
const inputRef = useRef<HTMLInputElement>(null);
```

---

## 📋 React Types Reference

| Type | Description | Common Use |
|------|-------------|------------|
| `ReactNode` | Anything React can render | Children props |
| `ReactElement` | A single React element instance | One element prop |
| `JSX.Element` | Return type of component | Function component return |
| `ReactChild` | string, number, ReactElement | Strict single child |
| `ReactComponentType<P>` | Any component with props P | Dynamic rendering |
| `React.FC<P>` | Function Component type | Components with children |

---

## 📡 Data Fetching in Next.js

**"Server ya API se data laana taaki page render ho sake."**

Next.js me data fetching ke **3 major tareeke** hote hain (App Router ke context me):

| Type | Full Form | Kab Data Fetch Hota Hai | Use Case |
|------|-----------|-------------------------|----------|
| **SSR** | Server Side Rendering | Har request pe | Dynamic pages (dashboard, user profile) |
| **SSG** | Static Site Generation | Build time pe | Blogs, landing pages |
| **ISR** | Incremental Static Regeneration | Build time + background me re-generate | News, e-commerce, changing content |

### 🔷 Simple Analogy

| Type | Example Analogy |
|------|-----------------|
| **SSR** | Har baar taja khana banana 🍳 (Fresh food every time) |
| **SSG** | Ek baar bana ke store karna 🏪 (Make once, store it) |
| **ISR** | Store kiya hua khana, lekin har kuch der baad naya bana dena 🔄 (Stored food, but remake after some time) |

### ⚙️ Next.js 15 (App Router) me ye kaise karte hain?

Ab hum `getServerSideProps` ya `getStaticProps` nahi likhte.  
Uski jagah **fetch()** ke options se control karte hain:

| Type | fetch Option | Updates? | Example Use |
|------|--------------|----------|-------------|
| **SSR** | `{ cache: 'no-store' }` | Every reload | Dashboard, profile |
| **SSG** | `{ cache: 'force-cache' }` (default) | Never | Blogs, docs |
| **ISR** | `{ next: { revalidate: X } }` | Every X seconds | Product pages, news |

---

## 🔄 Server Side Rendering (SSR)

Data is fetched on **every request** on the server.

**Har request pe fresh data laata hai**

### Example: User Dashboard
**File:** `app/ssr/page.tsx`
```typescript
interface Post {
  id: number;
  title: string;
}

export default async function SSRPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'no-store' // disables caching
  });
  const data: Post = await res.json();

  return (
    <div>
      <h1>Server Side Rendering (SSR)</h1>
      <p>{data.title}</p>
      <p>Rendered at: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
```

### 📌 Explanation:
- **cache: 'no-store'** → har request pe API call hoti hai
- Page refresh karne pe time badalta dikhega → proof that it's SSR

**Use Cases:**
- User dashboards
- Real-time data
- Personalized content
- Dynamic content that changes frequently

---

## 🏗️ Static Site Generation (SSG)

Data is fetched at **build time** and reused for every request.

**Build time pe data fetch hota hai (ek hi baar)**

### Example: Blog Posts
**File:** `app/ssg/page.tsx`
```typescript
interface Post {
  id: number;
  title: string;
}

export default async function SSGPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'force-cache' // default behavior
  });
  const data: Post = await res.json();

  return (
    <div>
      <h1>Static Site Generation (SSG)</h1>
      <p>{data.title}</p>
      <p>Built at: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
```

### 📌 Explanation:
- Ye page **build ke time** render hota hai
- Refresh karne pe **same time** rahega (static content)

**Use Cases:**
- Blog posts
- Documentation
- Landing pages
- Marketing pages
- Content that rarely changes

---

## ⚡ Incremental Static Regeneration (ISR)

Pages are generated at **build time** but can be **re-generated in the background**.

**Static page banta hai, lekin background me auto refresh hota hai**

### Example: Product Listing
**File:** `app/isr/page.tsx`
```typescript
interface Post {
  id: number;
  title: string;
}

export default async function ISRPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    next: { revalidate: 10 } // 10 seconds ke baad background me update
  });
  const data: Post = await res.json();

  return (
    <div>
      <h1>Incremental Static Regeneration (ISR)</h1>
      <p>{data.title}</p>
      <p>Generated at: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
```

### 📌 Explanation:
- Ye page **static** hai, lekin **10 seconds** ke baad Next.js background me naya version bana lega
- Refresh karte raho — 10 sec baad "Rendered at" time change ho jayega (auto regeneration)

**Use Cases:**
- E-commerce product listings
- News websites
- Social media feeds
- Content that updates periodically

---

## 💻 Client-Side Data Fetching

Fetch data on the client side using hooks.

### Example: Search Feature
**File:** `app/components/Search.tsx`
```typescript
'use client';

import { useState, useEffect } from 'react';

interface SearchResult {
  id: number;
  title: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Use Cases:**
- Search functionality
- Filters and sorting
- Interactive dashboards
- Real-time updates

---

## 🔌 API Routes Creation

Create backend APIs directly in Next.js.

### Basic GET API
**File:** `app/api/users/route.ts`
```typescript
import { NextResponse } from 'next/server';

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

export async function GET() {
  return NextResponse.json(users);
}
```

### POST API with Validation
**File:** `app/api/users/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';

interface CreateUserBody {
  name: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserBody = await request.json();
    
    // Validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Create user logic here
    const newUser = {
      id: Date.now(),
      name: body.name,
      email: body.email,
    };

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
```

### Dynamic API Route
**File:** `app/api/users/[id]/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const userId = params.id;
  
  // Fetch user by ID
  const user = {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
  };

  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  const userId = params.id;
  
  // Delete user logic here
  
  return NextResponse.json(
    { message: `User ${userId} deleted` },
    { status: 200 }
  );
}
```

### API with Database Example
**File:** `app/api/posts/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/lib/db'; // Your database instance

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

export async function GET(request: NextRequest) {
  try {
    // const posts = await db.post.findMany();
    const posts: Post[] = []; // Replace with actual DB query
    
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // const newPost = await db.post.create({
    //   data: body
    // });
    
    const newPost: Post = {
      id: Date.now(),
      ...body,
    };

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
```

---

## ✅ Best Practices Summary

### Data Fetching
1. **SSR** (`cache: 'no-store'`) → Use for dynamic, personalized content that changes on every request
2. **SSG** (`cache: 'force-cache'`) → Use for static content that rarely changes
3. **ISR** (`next: { revalidate: X }`) → Use for content that updates periodically (every X seconds)
4. **Client-side** → Use for interactive features and real-time updates

### 📊 Summary Table

| Concept | Data Fetch Time | fetch Option | Updates? | Example Use |
|---------|----------------|--------------|----------|-------------|
| **SSR** | On every request | `{ cache: 'no-store' }` | Every reload | Dashboard, profile |
| **SSG** | At build time | `{ cache: 'force-cache' }` | Never | Blogs, docs |
| **ISR** | Build + background regenerate | `{ next: { revalidate: X } }` | Every X seconds | Product pages, news |

### TypeScript
1. **children** → use `React.ReactNode`
2. **element prop** → use `React.ReactElement`
3. **component return type** → use `JSX.Element`
4. **dynamic component as prop** → use `React.ComponentType<P>`
5. **multiple possible types** → use `ReactNode | null`

### API Routes
1. Always validate input data
2. Use proper HTTP status codes
3. Handle errors gracefully
4. Type your request and response bodies
5. Use TypeScript interfaces for data structures

---

## 📝 Key Points to Remember

### Next.js
- ✅ Folders define routes, files define UI
- ✅ `page.tsx` is required to make a route accessible
- ✅ `layout.tsx` wraps child segments and preserves state
- ✅ Dynamic segments use `[paramName]` syntax
- ✅ Route groups `(groupName)` don't affect URLs
- ✅ Use `<Link>` for client-side navigation
- ✅ Use `useRouter` for programmatic navigation

### TypeScript
- ✅ TypeScript is a **superset of JavaScript** with static typing
- ✅ Use **type annotations** to catch errors at compile time
- ✅ **Interfaces** define object shapes and can be extended
- ✅ **Type aliases** create reusable custom types
- ✅ **Generics** provide reusable, type-safe code

### Data Fetching
- ✅ **SSR**: Fetch on every request (dynamic content)
- ✅ **SSG**: Fetch at build time (static content)
- ✅ **ISR**: Fetch at build + revalidate (periodic updates)
- ✅ **Client-side**: Fetch in browser (interactive features)

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

Made with ❤️ by ©Bhanu Pratap Patkar while learning Next.js with TypeScript