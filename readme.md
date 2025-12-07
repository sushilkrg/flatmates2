# 🏠 Flatmates

Flatmates is a modern full‑stack web application that helps users find flatmates / PGs and list available rooms across Indian cities, with secure authentication, bookmarks, and Stripe‑powered featured listings.

---

## ✨ Features

- 🔐 **Authentication & Authorization**
  - Email/password signup & login
  - JWT + HTTP‑only cookies for secure sessions
  - Role support (`user`, `admin`) on the backend

- 🏘️ **Listings & Discovery**
  - Create, update, and delete room/flat listings
  - Fields like location, city, rent, accommodation type, gender preference, facilities, contact info
  - Dedicated listing details page with contact CTAs (call / email)
  - Popular cities quick‑select section to jump into search

- ⭐ **Featured Listings & Payments**
  - Upgrade a listing to “Featured” via Stripe Checkout
  - Stripe webhook marks listing as `isFeatured: true` after successful payment
  - Transaction documents stored in MongoDB and linked to the user (`myTransactions`)

- 📑 **Bookmarks & User Dashboard**
  - Bookmark/unbookmark listings and persist them in the user document
  - My Listings: manage all listings created by the logged‑in user
  - My Bookmarks: view saved listings
  - Transaction History: list of successful payments with a modern skeleton/empty state

- 🎨 **Modern UI / UX**
  - Next.js App Router with client components for interactive flows
  - Tailwind CSS for a clean dark UI
  - Toast feedback (success/error) with react‑hot‑toast
  - Loading shimmers, empty states, and minimalist success/cancel pages for payments

---

## 🛠 Tech Stack

| Layer     | Technologies                                                                 |
|----------|-------------------------------------------------------------------------------|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS, Axios, Redux Toolkit  |
| Backend  | Node.js, Express.js, TypeScript/JavaScript, Stripe SDK, Mongoose             |
| Database | MongoDB (Atlas or self‑hosted)                                               |
| Other    | JWT, bcrypt, react‑hot‑toast, Cloudinary (for images, if configured)         |

---

## 📁 Project Structure
 ```
flatmates/
├── client/ # Next.js frontend
│ ├── app/ # App Router routes
│ │ ├── (auth)/ # Login / Register
│ │ ├── search/ # Search & filters
│ │ ├── listings/ # Listing details pages
│ │ ├── dashboard/ # My listings, bookmarks, transactions
│ │ └── (payments)/ # Success / cancel pages
│ ├── components/ # Reusable UI components (cards, skeletons, etc.)
│ ├── redux/ # Redux store & slices (auth, filters, listings)
│ └── public/ # Static assets
│
└── server/ # Express backend
├── models/ # Mongoose models (User, Listing, Transaction)
├── routes/ # Route modules (auth, listing, transaction)
├── controllers/ # Business logic for each resource
├── middleware/ # Auth, error handling, etc.
└── utils/ # Helpers (Stripe, JWT, etc.)

```

---

## ⚙️ Environment Setup

### Prerequisites

- Node.js (18+ recommended)
- npm or pnpm
- MongoDB instance (local or MongoDB Atlas)
- Stripe account + API keys
- (Optional) Cloudinary account for image hosting

### 1. Clone the Repository
```
git clone https://github.com/sushilkrg/flatmates2.git
cd flatmates2

```
### 2. Backend Setup

```
Inside your backend directory (e.g. `server/`):
cd server
npm install

```

Create a `.env` file:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

CLIENT_URL=http://localhost:3000

Optional: image hosting
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Run the backend in dev mode:
```
npm run build
npm run start

```

### 3. Frontend Setup

Inside your Next.js client directory (e.g. `client/`):
```

cd client
npm install

```

Create `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Run the dev server:

```
pnpm dev
```


---

## 🔐 Core Backend Models (Conceptual)

### User

- `fullName`, `email`, `password`
- Arrays:
  - `myListings: ObjectId[]` → Listings created by the user
  - `myBookmarkedListings: ObjectId[]` → Saved listings
  - `myTransactions: ObjectId[]` → Related Stripe transactions
- `role: "user" | "admin"`

### Listing

- `location`, `cityName`, `rent`, `accommodationType`, `lookingForGender`
- `facilities: string[]`
- `contactNumber`, `contactEmail`, `postedByName`, `userId`
- `isFeatured: boolean`
- `createdAt`, `updatedAt`

### Transaction

- `userId`, `listingId`
- `amount`, `status` (e.g. `success`, `failed`)
- `stripeSessionId`, `paymentIntentId`
- Timestamps for history views

---

## 💳 Stripe Flow (High Level)

1. User clicks “Feature this listing”.
2. Frontend calls backend to create a Stripe Checkout Session.
3. User pays on Stripe’s hosted page.
4. Stripe sends a webhook to `/api/v1/transaction/webhook`.
5. Backend:
   - Verifies the event with `stripe.webhooks.constructEvent`.
   - On `checkout.session.completed`:
     - Sets `Listing.isFeatured = true`.
     - Creates a `Transaction` document.
     - Pushes the transaction `_id` into `User.myTransactions`.

---

## 🔍 API Overview (Typical)

> Adjust paths/verbs to match your actual Express routes.

### Auth

- `POST /api/v1/auth/register` – Register
- `POST /api/v1/auth/login` – Login
- `POST /api/v1/auth/logout` – Logout / clear cookies
- `GET /api/v1/auth/me` – Get current user

### Listings

- `GET /api/v1/listing/search` – Search/filter listings
- `GET /api/v1/listing/details/:id` – Get a single listing
- `POST /api/v1/listing` – Create listing
- `PATCH /api/v1/listing/:id` – Update listing
- `DELETE /api/v1/listing/:id` – Delete listing
- `PATCH /api/v1/listing/bookmark/:id` – Toggle bookmark
- `GET /api/v1/listing/my-listings` – Listings owned by current user

### Transactions

- `POST /api/v1/transaction/create-checkout-session` – Stripe Checkout Session
- `POST /api/v1/transaction/webhook` – Stripe webhook
- `GET /api/v1/transaction/my-transactions` – Auth user’s transaction history

---

## 🧪 Development Notes

- Use Postman/Thunder Client to test backend routes.
- Protect webhook route from body‑parsing conflicts (Stripe expects raw body).
- Keep `.env` files out of version control.
- Run typechecking/linters (if configured) before committing.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details (or add one if not present yet).

---

## 👤 Author

**Sushil Kumar**  
GitHub: [@sushilkrg](https://github.com/sushilkrg)

If this project helps you, consider ⭐ starring the repo!
