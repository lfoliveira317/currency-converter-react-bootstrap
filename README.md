# Currency Converter - MXN to USD

A responsive single-page currency converter application built with React and Bootstrap. This application simulates a currency converter similar to Google's, featuring a clean Material Design-inspired interface and random exchange rate generation on each visit.

## Features

*   **Real-time Conversion:** Instantly converts between Mexican Peso (MXN) and US Dollar (USD).
*   **Randomized Rates:** Simulates market volatility by generating a random exchange rate from a predefined set on each page load.
*   **Swap Functionality:** Easily switch between converting MXN to USD and USD to MXN.
*   **Responsive Design:** Fully responsive layout that works seamlessly on desktop and mobile devices, powered by Bootstrap.
*   **Clean UI:** A user-friendly interface designed with Google's Material Design principles in mind.

## Tech Stack

*   **React 19:** For building the user interface.
*   **Bootstrap 5 & React-Bootstrap:** For styling and responsive layout components.
*   **Vite:** For fast development and building.
*   **TypeScript:** For type safety.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js installed on your system. This project uses [pnpm](https://pnpm.io/) as the package manager, but you can also use `npm` or `yarn`.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/lfoliveira317/currency-converter-react-bootstrap.git
    cd currency-converter-react-bootstrap
    ```

2.  **Install dependencies:**

    Using pnpm:
    ```bash
    pnpm install
    ```

    Or using npm:
    ```bash
    npm install
    ```

### Running the Application

To start the development server:

```bash
pnpm dev
```

Or with npm:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal) to view the application.

## Building for Production

To create a production build:

```bash
pnpm build
```

The built files will be in the `dist` directory.
