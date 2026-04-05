# FinDash - Premium Finance Dashboard

A modern, responsive Finance Dashboard built with React, Tailwind CSS, and Recharts.

## Features

- **Premium UI Design**: Clean, modern fintech interface with soft shadows, rounded cards, and smooth animations
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Analytics Dashboard**:
  - Summary cards with income, expenses, revenue, and savings
  - Donut chart for expense categories
  - Bar chart for weekly financial data
  - Add or delete your cards
- **Transactions Page**:
  - Complete transaction table with sorting and filtering
  - Add new transactions with form modal
  - Delete transactions
  - Status badges (Completed, Pending, Failed)
  - Real-time balance calculations
  - Export CSV for transactions
- **Responsive Design**: Sidebar collapses on mobile, fully responsive layout
- **Interactive Elements**: Hover effects, smooth transitions, and animations

## Tech Stack

- **React 18** - Frontend library
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Lucide React** - Modern icon library
- **Vite** - Fast build tool

## Project Structure

```
src/
  components/
    Sidebar.jsx       # Navigation sidebar with mobile support
    Header.jsx        # Top header with search, theme toggle, profile
    Dashboard.jsx     # Analytics dashboard with stats and charts
    Transactions.jsx  # Transaction management page
    Charts.jsx        # Recharts components (donut + bar charts)
    StatsCard.jsx     # Reusable statistics card component
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

1. Clone the repository:
```bash
git clone <your-repo-url>
cd finance
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Usage Guide

### Navigation
- Use the sidebar to switch between Dashboard and Transactions
- Mobile users can toggle the sidebar with the menu button

### Theme Toggle
- Click the sun/moon icon in the header to switch between light and dark mode

### Managing Transactions
- **Add Transaction**: Click "Add Transaction" button on the Transactions page
- **Delete Transaction**: Click the trash icon in the Actions column
- **Export Data**: Click "Export CSV" to download transaction data

### Dashboard Features
- View real-time financial statistics
- Visualize spending patterns with interactive charts
- Track savings goals and financial health

## Design System

### Color Palette
- **Primary**: Emerald-500 to Teal-600 gradient
- **Background**: White (light) / Slate-900 (dark)
- **Surface**: Slate-50 (light) / Slate-800 (dark)
- **Text**: Slate-800 (light) / White (dark)

### Components
- **Cards**: Rounded 2xl corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover states
- **Inputs**: Rounded-lg with focus rings
- **Badges**: Color-coded status indicators

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) for the beautiful icon set
- [Recharts](https://recharts.org/) for the charting components
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework

---

Built with ❤️ using React + Vite + Tailwind CSS
