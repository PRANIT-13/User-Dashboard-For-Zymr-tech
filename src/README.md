# User Analytics Dashboard

A modern web dashboard for analyzing user data with interactive charts and user management features. Built with React and TypeScript.

## Overview

This project was created as part of a web development assignment to build a comprehensive user analytics system. The dashboard provides insights into user registration patterns, profile completeness, and includes a full user management interface.

## Features

### Dashboard Analytics
- **Total Users KPI**: Large metric tile showing current user count
- **Registration Timeline**: Area chart displaying user signups over the last 30 days
- **Avatar Analysis**: Pie chart breaking down users with/without profile pictures
- **Signup Patterns**: Bar chart showing peak registration hours
- **Recent Activity**: Quick view of the 5 most recently joined users

### User Management
- **Paginated User List**: Browse through users with 10 per page
- **Advanced Search**: Find users by name or email address
- **Smart Sorting**: Sort by name (alphabetical) or registration date
- **Detailed User Profiles**: Click any user to view their complete information
- **Responsive Design**: Works great on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts library for data visualization
- **UI Components**: Custom component library based on shadcn/ui
- **Icons**: Lucide React
- **API**: MockAPI.io for backend data

## API Integration

The app connects to a MockAPI endpoint:
```
https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users
```

Note: If the API is unavailable, the app automatically falls back to generated mock data to ensure the demo keeps working.

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main analytics dashboard
│   ├── UserList.tsx     # User management interface
│   ├── UserDetailModal.tsx  # User detail popup
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── services/            # API integration layer
├── types/               # TypeScript type definitions
└── styles/              # Global CSS and themes
```

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:3000`

## Usage

### Viewing Analytics
Navigate to the Dashboard tab to see user metrics and charts. The charts automatically update based on the current user data.

### Managing Users
Switch to the Users tab to browse, search, and sort through the user list. Click on any user row to see their detailed profile information.

### Search & Filter
Use the search bar to find specific users by typing their name or email. The dropdown menu lets you change the sort order.

## Development Notes

- The dashboard automatically handles loading states and error conditions
- Charts are responsive and work on mobile devices
- User data is cached for better performance
- All dates are displayed in a user-friendly format

## Known Issues

- Avatar images depend on external services (Dicebear API)
- Some chart animations might be slow on older devices
- Search is case-insensitive but requires exact matches for partial strings

## Future Improvements

- [ ] Add user creation and editing capabilities
- [ ] Implement more detailed analytics (geographic data, user activity)
- [ ] Add data export functionality
- [ ] Include user authentication
- [ ] Add dark mode toggle

## Assignment Requirements Met

✅ Dashboard with graphs and KPIs  
✅ User list with pagination (10 per page)  
✅ Search functionality by name/email  
✅ Sorting by name and date  
✅ Clickable rows for user details  
✅ Avatar preview and distribution analysis  
✅ Responsive design  

---

Built with ❤️ for the web development course assignment.