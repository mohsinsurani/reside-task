# reside-task
# Dengue Infection Indicators

A simple React web application for viewing dengue infection indicator values for regions by country.

## User story

Public health sector worker wanna see indicator values for dengue infection for regions by country, in a table format.

## Features

- Load dengue indicator data from local JSON files
- Select country by country ID
- Filter by age group
- Filter by summary type
- View indicator values by region in a table
- View a bar chart of the selected indicator by region
- Dynamically detects indicators from the dataset, so new indicators appear automatically
- Dynamically detects age groups and summary types from the dataset

## Tech stack

- React
- TypeScript
- Vite
- Recharts

## Architecture overview

The application is intentionally small and split into clear layers:

```txt
src/
├── components/        # Reusable UI components
├── lib/               # Data transformation and formatting helpers
├── types/             # TypeScript types for data and metadata
├── test/              # Test setup configuration
├── App.tsx            # Main application state and page composition
└── index.css          # Global styling

## How to run

Install dependencies:

```bash
npm install

## How to run tests

```bash
npm run test