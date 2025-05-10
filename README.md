# Read Away - Book Review App

### [Access hosted website here](https://books-app-henna.vercel.app/)

This project is a book review application called **Read Away**. It allows users to collect and review books. Users can browse through a library, read their summaries, and leave their reviews. It provides a platform for book enthusiasts to keep track of their reading progress and thoughts gathering

Inspired by goodreads

## Features

- [x] Login/logout functionality with auth0
- [x] Create, update, delete collections and books in them (Reading lists)
- [x] Leave ratings and comments for books (Reviews)
- [x] Search for specific books by title (Library)
- [ ] Read book summaries and details
- [ ] Connect with other users and see their reviews
- [ ] Talk to the author - ChatGPT integration using streaming

## Technical concepts utilized

- app dir
- Server actions
- Route handlers

## Main Technologies

- **[Next.js](https://nextjs.org/)**: A React framework for server-side rendering and static site generation.
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Prisma](https://www.prisma.io/)**: An ORM tool for database management.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for styling.
- **[DaisyUI](https://daisyui.com/)**: A plugin for Tailwind CSS that provides pre-designed components.
- **[Auth0](https://auth0.com/)**: A platform for authentication and authorization.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.

## Installation

To run this application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/read-away.git
   cd read-away
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory
   - Add the following variables:

   ```
   DATABASE_URL="your_postgres_connection_string"
   AUTH0_SECRET="your_auth0_secret"
   AUTH0_BASE_URL="your_auth0_base_url"
   AUTH0_ISSUER_BASE_URL="your_auth0_issuer_url"
   AUTH0_CLIENT_ID="your_auth0_client_id"
   AUTH0_CLIENT_SECRET="your_auth0_client_secret"
   ```

4. Set up the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

The application should now be running at `http://localhost:3000`

If you prefer, you can skip the setup and access the hosted version of the website here:
🔗 https://books-app-henna.vercel.app/

## License

This project is licensed under the [MIT License](LICENSE).
