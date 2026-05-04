# Dengue Infection Indicators Web App

A React web application for viewing dengue infection indicator values for regions by country.

---

## Use Case

I acting as a public health worker, wanna see indicator values for dengue infection for regions by country, in a tabular format.

---

## Features

- Load dengue indicator data from local JSON files
- Select country by ID
- Filter by age group
- Filter by summary type
- View indicator values by region in a table
- View a bar chart of the selected indicator
- Automatically scaling to:
  - new indicators
  - different age groups
  - updated metadata labels

---

## Tech Stack

- React
- TypeScript
- Vite
- Recharts (for chart visualisation)
- Vitest + React Testing Library (for testing)

---

## How to Run

Clone the repository:

```bash
git clone https://github.com/mohsinsurani/reside-task.git
cd reside-task
npm install
npm run dev

# Run all tests
npm run test

# Run tests with UI coverage report
npm run test:run

## Project Structure
src/
├── components/       # UI Components
│   ├── FilterSelect     # Reusable dropdowns
│   ├── IndicatorChart   # Recharts implementation
│   └── IndicatorTable   # Tabular data display
├── lib/              # Core Logic (Formatting, Filtering, Helpers)
├── types/            # TS Interfaces (Indicator, Metadata, etc.)
├── test/             # Test Setup & Mocks
├── App.tsx           # Application Root & State
└── main.tsx          # Entry Point
└── public/           # Static assets and JSON data sources