# Holiday Calendar

A modern web application built with Next.js that displays holiday information with internationalization support.

## Features

- 📅 Display upcoming holidays
- 🌍 Internationalization support (using next-intl)
- 🎨 Modern UI with Tailwind CSS
- 🎭 Smooth animations with Framer Motion
- 📱 Responsive design
- 🎯 TypeScript support for type safety

## Tech Stack

- **Framework:** Next.js 13.5
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:**
  - Radix UI (Accordion, Select)
  - Headless UI
  - Lucide React (Icons)
- **Animation:** Framer Motion
- **Date Handling:** date-fns
- **Form Validation:** Zod
- **Internationalization:** next-intl

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd holiday-calendar
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add necessary environment variables.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Build

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

- `/app` - Next.js app directory containing pages and layouts
- `/components` - Reusable UI components
- `/data` - Static data and configurations
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and shared logic
- `/messages` - Internationalization messages
- `/public` - Static assets
- `/services` - API services and external integrations
- `/types` - TypeScript type definitions

## Scripts

- `dev` - Run development server
- `build` - Create production build
- `start` - Start production server
- `lint` - Run ESLint for code linting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.
