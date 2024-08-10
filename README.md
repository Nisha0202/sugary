
## website link - https://sugaryy.netlify.app/
## Features

### Frontend

1. **Basic Features:**
   - Google login integration.
   - User registration with email verification.
   - Password recovery and reset functionality.
   - Protected routes for secure access to features like adding to cart, placing orders, and managing user profiles.

2. **Admin Dashboard:**
   - Upload menu items with image support using ImgBB.
   - View and manage orders.
   - Pagination support for menus and orders.
   - Admin-specific navigation for managing the platform.

3. **User Experience:**
   - Smooth navigation with login/logout.
   - Add, view, and remove items from the cart.
   - Order items with date and time tracking.
   - Search functionality for menu items.
   - Display menu item details.
   - Local storage support for persisting cart data.
   - Location tracking for order deliveries.

4. **UI Enhancements:**
   - Input box styling with background color customization.
   - Responsive design with gap and justified content centered.
   - Modals for displaying additional information.

5. **Third-Party Libraries:**
   - **Carousel**: Implemented with `react-slick` and `slick-carousel`.
   - **Animations**: Added using `react-awesome-reveal`.

### Authentication

- **Email Verification**: Users must verify their email to log in.
- **Token Management**: User tokens are securely stored on login.
- **Admin and Customer Accounts**: Distinct roles with tailored navigation and permissions.

### Payment Gateway

- Integrated with **Stripe** for secure and efficient payment processing.

## Installation

### Frontend Installation

To get started with the frontend:

1. Clone the repository:

   ```
   git clone https://github.com/Nisha0202/sugary-frontend.git
   cd sugary-frontend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install react-slick slick-carousel
   npm install react-awesome-reveal
   ```

3. Start the development server:

   ```bash
   npm start
   ```

### Backend Installation

To set up the backend:

1. Clone the repository:

   ```
   git clone https://github.com/Nisha0202/sugary.git
   cd sugary-backend
   ```

2. Install the necessary dependencies:

   ```
   npm install cors dotenv express nodemon mongoose express-validator jsonwebtoken bcrypt moment nodemailer emailjs
   ```

3. Set up your environment variables in a `.env` file:

   ```
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ```

4. Start the backend server:

   ```
   npm run dev
   ```

## Admin Access

- **Admin Email**: `admin@gmail.com`
- **Admin Password**: `11111`

## Customer Access

- **Customer Email**: `aneha@gmail.com`
- **Customer Password**: `12345`

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Payment Gateway**: Stripe
- **Image Hosting**: ImgBB

## Usage

1. **Admin Dashboard**: Admins can upload new menu items, manage existing ones, and track orders.
2. **Customer Experience**: Customers can browse the menu, add items to their cart, and place orders.
3. **Order Management**: View past orders and track their status.
4. **Search and Filter**: Easily find items through search and filter options.
