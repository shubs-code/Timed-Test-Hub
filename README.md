# 🧠 Timed Test Hub

A full-stack web application for taking and analyzing timed tests with a clean UI, PDF viewer, Google-based authentication, and in-depth analytics.

> 🔗 **Live Demo**
> - 🌐 [Frontend - Vercel](https://timed-test-hub.vercel.app/)
> - ⚙️ [Backend - CodeCrave](https://test.codecrave.tech/)

---

## 🚀 Features

### 🔐 Authentication
- Google Sign-In via **NextAuth.js**
- JWT-based session strategy
- Single Sign-On (SSO) – no password required
- Integrated with **Google Cloud Provider**

### 📄 PDF Viewer
- Load and view PDF documents
- Uses `pdf.worker.js`
- Fullscreen support for enhanced focus

### 🧪 Test Setup
- UI to configure test details
- Multiple-choice test interface
- Side menu for test settings and submission
- Submits and stores test results

### 📊 Dashboard
- View a list of all completed tests
- Test summary: name, duration, description

### 📈 Analytics Page
- Graphs powered by **Recharts**
- Detailed performance data and insights

### 🦴 Skeleton Loading
- Seamless user experience during data fetch
- Skeleton placeholders for UI sections

### 🎨 Theme Management
- Toggle between **Dark** and **Light** themes
- Automatic adaptation to system preferences

---

## 🛠 Tech Stack

| Tech            | Description                             |
|-----------------|-----------------------------------------|
| **Next.js**     | Frontend and server-side rendering      |
| **NextAuth.js** | Authentication and session management   |
| **Prisma**      | ORM for DB schema and queries           |
| **Recharts**    | Data visualization                      |
| **Tailwind CSS**| Utility-first CSS framework             |
| **PDF.js**      | PDF rendering in browser                |

---

## 🗃 Prisma Schema

Defines the schema for:
- User data
- Authentication sessions
- Test metadata and answers

---

## 📡 API Endpoints

- `POST /api/test/create` – Create a new test
- `GET /api/test/[id]` – Fetch a specific test
- `GET /api/session` – Get current user session
- `getServerSession()` for server-side authentication

---

## 🧪 Getting Started (Local Development)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/timed-test-hub.git
   cd timed-test-hub

2. **Install Dependencies**
   ```bash
   npm install

3. **Create Environment Variables**
   ```bash
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXTAUTH_SECRET=your-nextauth-secret
   DATABASE_URL=your-database-url

4. **Push Prisma Schema to the Database**
   ```bash
   npx prisma db push

5. **Run the Development Server**
   ```bash
   npm run dev


