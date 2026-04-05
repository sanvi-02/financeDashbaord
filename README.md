# FinDash - Premium Finance Dashboard

A modern, responsive Finance Dashboard built with React, Tailwind CSS, and Recharts.

## Features

- **Premium UI Design**: Clean, modern fintech interface with soft shadows, rounded cards, and smooth animations
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Analytics Dashboard**:
  - Summary cards with income, expenses, revenue, and savings
  - Donut chart for expense categories
  - Bar chart for weekly financial data
- **Transactions Page**:
  - Complete transaction table with sorting and filtering
  - Add new transactions with form modal
  - Delete transactions
  - Status badges (Completed, Pending, Failed)
  - Real-time balance calculations
- **Responsive Design**: Sidebar collapses on mobile, fully responsive layout
- **Interactive Elements**: Hover effects, smooth transitions, and animations

## Tech Stack

- React 18 (Functional Components + Hooks)
- Tailwind CSS (with custom color palette)
- Recharts (for data visualization)
- Lucide React (for icons)
- Vite (build tool)

## Project Structure

```
src/
  components/
    Sidebar.jsx       # Navigation sidebar with mobile support
    Header.jsx        # Top header with search, theme toggle, profile
    Dashboard.jsx     # Analytics dashboard with stats and charts
    Transactions.jsx  # Transaction management page
    Charts.jsx        # Recharts components (donut + bar charts)
  context/
    ThemeContext.jsx  # Dark/light mode state management
  App.jsx             # Main app with page routing
  main.jsx            # Entry point
  index.css           # Tailwind imports + custom styles
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage

- **Navigation**: Click sidebar menu items to switch between Dashboard and Transactions
- **Theme Toggle**: Click the sun/moon icon in the header to switch between light and dark mode
- **Add Transaction**: Click "Add Transaction" button on the Transactions page
- **Delete Transaction**: Click the trash icon in the Actions column of any transaction row

## Design Highlights

- **Color Palette**: Professional green/teal accents (`emerald-500` to `teal-600`)
- **Cards**: Rounded 2xl (1rem) corners with subtle shadows
- **Typography**: Inter font family with careful hierarchy
- **Animations**: Smooth hover states with scale transforms and shadow transitions
- **Status Badges**: Color-coded badges with icons for transaction states

## License

MIT
