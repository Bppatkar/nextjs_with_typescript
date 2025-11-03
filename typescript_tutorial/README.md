# TypeScript Learning Guide

A comprehensive guide covering TypeScript fundamentals, types, and advanced concepts including React with TypeScript.

## 📚 Table of Contents
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
- [Best Practices Summary](#best-practices-summary)
- [TypeScript Configuration](#typescript-configuration)

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

This creates a `tsconfig.json` file in your project.

---

## 📝 Basic Types

TypeScript provides several built-in types for type safety.

### 1. Number
```typescript
let age: number = 25;
```

### 2. String
```typescript
let name: string = "Aman";
```

### 3. Boolean
```typescript
let isOnline: boolean = true;
```

### 4. Array
```typescript
let scores: number[] = [10, 20, 30];
```

### 5. Tuple
Fixed-length array with specific types at each position.
```typescript
let user: [string, number] = ["Aman", 23];
```

### 6. Enum
A set of named constants.
```typescript
enum Role { Admin, User, Guest }
```

### 7. Any
Can be anything - disables type checking (use sparingly).
```typescript
let something: any = "Can be anything";
```

### 8. Void
Used for functions that don't return a value.
```typescript
function log(): void { 
  console.log("Hi"); 
}
```

### 9. Null / Undefined
Explicitly typed null or undefined values.
```typescript
let x: null = null;
```

---

## 📊 Arrays & Tuples

### Arrays
Arrays are collections of values of the same type.

```typescript
let scores: number[] = [10, 20, 30];
let names: Array<string> = ["Aman", "Ravi"];
```

### Tuples
Fixed-length, ordered arrays with specific types.

```typescript
let user: [string, number] = ["Aman", 23];
```

**Key Difference:**
- **Arrays**: Variable length, same type
- **Tuples**: Fixed length, can have different types at each position

---

## 🏷️ Type Annotations

Type annotations allow you to explicitly declare variable types.

### Basic Type Annotation
```typescript
let username: string = "John Doe";
```

### ❌ Type Error Example
```typescript
let username: string = 5434523; // Error: Type 'number' is not assignable to type 'string'
```

---

## 🔍 Type Declaration & Type Inference

### Explicit Declaration
You explicitly define the type of a variable.

```typescript
let count: number = 5;
```

### Type Inference
TypeScript automatically infers the type based on the assigned value.

```typescript
let age = 20;           // inferred number
let city = "Delhi";     // inferred string

function double(x: number) {
  return x * 2;         // inferred number
}
```

**Best Practice:** Use type inference when the type is obvious, explicit declaration when clarity is needed.

---

## 🔀 Union Types

Union types allow a variable to hold values of multiple types.

### Array with Single Type
```typescript
let topseller: string[] = ["laptop", "iphone"];
topseller.push(42); // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'
```

### Array with Union Types
```typescript
let topseller: (string | number)[] = ["laptop", "iphone", 42];
topseller.push("tablet"); // ✅ Valid
topseller.push(99); // ✅ Valid
```

---

## 🔧 Functions

TypeScript allows you to specify types for function parameters and return values.

### Basic Functions
```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

### Optional & Default Parameters

#### Optional Parameters
Use `?` to make parameters optional.

```typescript
function greet(name: string, prefix?: string): string {
  return `${prefix}, ${name}`;
}
```

#### Default Parameters
Provide default values for parameters.

```typescript
function greet(name: string, prefix: string = "Hi"): string {
  return `${prefix}, ${name}`;
}
```

### Without Type Annotations (JavaScript)
```typescript
function calculateLoan(amount, rate) {
  return (amount * rate) / 12;
}

calculateLoan("twenty thousand", Object.name); // ❌ Runtime error
```

### With Type Annotations (TypeScript)
```typescript
function calculateLoan(amount: number, rate: number): number {
  return (amount * rate) / 12;
}

calculateLoan("twenty thousand", Object.name); // ❌ Compile-time error
calculateLoan(10000, 5); // ✅ Valid
```

---

## 📦 Objects & Interfaces

Interfaces define the structure of objects.

### Defining an Interface
```typescript
interface User {
  id: number;
  name: string;
  email?: string;        // optional
  readonly role: string; // readonly
}
```

### Using the Interface
```typescript
const u: User = { id: 1, name: "Aman", role: "Admin" };
```

### Extending Interfaces
Interfaces can extend other interfaces.

```typescript
interface Employee extends User {
  salary: number;
}
```

### Example
```typescript
interface User {
  id: number;
  name: string;
  email?: string;        // optional
  readonly role: string; // readonly (cannot be modified)
}

const u: User = { id: 1, name: "Aman", role: "Admin" };

// ❌ Error: Cannot assign to 'role' because it is a read-only property
// u.role = "User";
```

---

## 🎭 Type Aliases

Type aliases create custom type names for reusability.

### Reusable Type Definitions
```typescript
type ID = number | string;
type Status = "success" | "error" | "loading";

let userId: ID = 4;
let state: Status = "success";
```

### Also for Function Signatures
```typescript
type MathFn = (a: number, b: number) => number;

const divide: MathFn = (a, b) => a / b;
```

### Multiple Type Aliases
```typescript
type Username = string;
let userOne: Username = "John Doe";

type Label = string;
type Amount = number;
type Check = boolean;
```

---

## ⚖️ Difference between Type & Interface

| Feature | Type | Interface |
|---------|------|-----------|
| **Combine** | ✅ & operator | ✅ extends |
| **Merge** | ❌ | ✅ |
| **Union** | ✅ | ❌ |
| **Use-case** | primitives, unions, functions | object shapes |

### Examples

#### Type with Union
```typescript
type A = { a: number };
type B = { b: string };
type AB = A & B;
```

#### Interface with Extends
```typescript
interface X { x: number; }
interface Y extends X { y: string; }
```

**When to use:**
- **Type**: For primitives, unions, tuples, and complex types
- **Interface**: For object shapes and when you need declaration merging

---

## 🔗 Union & Intersection Types

### Union Types
A value can be **one of several types**.

```typescript
type Response = "ok" | "fail" | "loading";
let res: Response = "ok";
```

### Intersection Types
Combines multiple types into one (must have **all properties**).

```typescript
type Person = { name: string };
type Contact = { phone: string };
type Full = Person & Contact;

const user: Full = { name: "Aman", phone: "123" };
```

---

## 🎨 Enums

Enums define a set of named constants.

### String Enum
```typescript
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}
```

### Numeric Enum
```typescript
enum HttpStatusCode {
  OK = 200,
  NotFound = 404
}

function handleResponse(statusCode: HttpStatusCode) {
  switch (statusCode) {
    case HttpStatusCode.OK:
      console.log("Request successful!");
      break;
    case HttpStatusCode.NotFound:
      console.log("Resource not found");
      break;
    default:
      console.log("Unexpected status code", statusCode);
  }
}

handleResponse(HttpStatusCode.OK); // Output: Request successful!
```

### Using Enums with Type Aliases and Interfaces
```typescript
type Role = "admin" | "moderator" | "user";

interface User {
  username: string;
  role: Role;
}

const adminUser: User = {
  username: "admin1",
  role: "admin" // ✅ Valid
};

const guestUser: User = {
  username: "guest1",
  role: "guest" // ❌ Error: Type '"guest"' is not assignable to type 'Role'
};
```

---

## 🔮 Generics

Generics allow you to write reusable, type-safe code.

### Generic Function
Reusable, type-safe structures.

```typescript
function identity<T>(value: T): T {
  return value;
}

const n = identity(10);
const s = identity("hello");
```

### Generic Interface
```typescript
interface Box<T> { value: T; }

const stringBox: Box<string> = { value: "Hi" };
```

### Without Generics (Type Information Lost)
```typescript
function identity(arg) {
  return arg;
}

let num = "five"; // No type enforcement - becomes a string
```

### Generic with Arrays
```typescript
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

let firstNum = getFirstElement([1, 2, 3]); // Type: number
let firstName = getFirstElement(["Alice", "Bob"]); // Type: string
```

---

## 🌐 Global Declaration

Extend global objects or declare global types.

### File: `src/types.d.ts`
```typescript
declare global {
  interface Window { appVersion: string; }
  
  type ApiResponse<T> = {
    data: T;
    error?: string;
  };
}

export {};
```

**Usage:**
```typescript
// Now you can use Window.appVersion anywhere
window.appVersion = "1.0.0";

// Use ApiResponse type globally
const response: ApiResponse<User> = {
  data: { id: 1, name: "John" }
};
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
| `ReactPortal` | For portals | Portal rendering |
| `ReactFragment` | For `<>...</>` | Grouping |
| `ReactComponentType<P>` | Any component with props P | Dynamic rendering |
| `React.FC<P>` | Function Component type | Components with children |

---

## ✅ Best Practices Summary

1. **children** → use `React.ReactNode`
2. **element prop** → use `React.ReactElement`
3. **component return type** → use `JSX.Element`
4. **dynamic component as prop** → use `React.ComponentType<P>`
5. **multiple possible types** → use `ReactNode | null`

---

## ⚙️ TypeScript Configuration

The `tsconfig.json` file configures TypeScript compiler options.

### Basic Configuration
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

### Common Compiler Options

| Option | Description |
|--------|-------------|
| `target` | ECMAScript target version (e.g., ES5, ES6, ES2016) |
| `module` | Module system (commonjs, es6, esnext) |
| `strict` | Enable all strict type-checking options |
| `esModuleInterop` | Enables compatibility with CommonJS modules |
| `skipLibCheck` | Skip type checking of declaration files |
| `forceConsistentCasingInFileNames` | Ensure consistent file name casing |

---

## 📝 Key Points to Remember

- ✅ TypeScript is a **superset of JavaScript** with static typing
- ✅ Use **type annotations** to catch errors at compile time
- ✅ **Interfaces** define object shapes and can be extended
- ✅ **Type aliases** create reusable custom types
- ✅ **Union types** allow multiple types for a variable
- ✅ **Intersection types** combine multiple types
- ✅ **Enums** create named constants
- ✅ **Generics** provide reusable, type-safe code
- ✅ **Type inference** reduces boilerplate code
- ✅ Use **React.FC** for functional components with TypeScript
- ✅ Always configure **tsconfig.json** for your project needs

---

## 🎓 Next Steps

- Learn about **Advanced Types** (Conditional, Mapped Types)
- Explore **Classes** and **Inheritance** in TypeScript
- Study **Decorators** for meta-programming
- Understand **Namespaces** and **Modules**
- Practice with **Type Guards** and **Type Narrowing**
- Master **Utility Types** (Partial, Required, Pick, Omit)

---

Made with ❤️ By &copy;Bhanu Pratap Patkar while learning Next.js with Typescript