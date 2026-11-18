# Flight Seat Selection & Passenger Management

A modern, responsive flight seat selection application built using **React.js, Vite, and Tailwind CSS**. The application allows users to select passengers, explore aircraft seating configurations, assign seats, and calculate the total seat-selection cost dynamically.

## Live Demo

**Live Application:** : https://flywithme-three.vercel.app/

## Features

### Passenger Management

- Select the number of passengers.
- Dynamically generate passenger lists.
- Switch between passengers while selecting seats.
- View assigned seats for each passenger.
- Assign only one seat per passenger.

### Aircraft Seat Selection

- Supports multiple aircraft seating configurations:
  - 3–2 seating configuration.
  - 2–3–2 seating configuration.
- Interactive aircraft seat layout.
- Display row numbers and seat labels.
- Differentiate between available, occupied, selected, and free seats.
- Prevent selection of occupied seats.
- Change or remove assigned seats.

### Seat Pricing

- Different seat pricing categories.
- Free standard seats.
- Premium and extra-legroom seats.
- Display individual passenger seat prices.
- Automatically calculate the total seat-selection cost.
- Update the total whenever a seat is selected, changed, or removed.

### Additional Features

- Passenger-specific meal selection.
- Free and paid meal options.
- Dynamic total calculation including additional charges.

### Responsive Design

- Clean and modern user interface.
- Responsive layout for desktop, tablet, and mobile.
- Interactive components and user-friendly navigation.

## Tech Stack

| Technology         | Purpose                           |
| ------------------ | --------------------------------- |
| React 19           | Frontend library                  |
| Vite 7             | Development server and build tool |
| Tailwind CSS 4     | Styling and responsive design     |
| React Router DOM 7 | Client-side routing               |
| Lucide React       | Icons                             |
| JavaScript (ES6+)  | Application logic                 |
| ESLint             | Code quality and linting          |

_Note: The structure above represents a suggested organization. Adjust it according to your actual project files._

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### 2. Navigate to the project directory

```bash
cd YOUR_REPOSITORY
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

```text
http://localhost:5173
```

## Available Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start development server     |
| `npm run build`   | Build production application |
| `npm run preview` | Preview production build     |
| `npm run lint`    | Run ESLint checks            |

## State Management & Seat Assignment Logic

The application uses React state management with `useState` to handle passenger information, seat assignments, seating configurations, and pricing.

### Seat Assignment Logic

1. Users select the number of passengers.
2. The application generates the passenger list.
3. Users select an active passenger.
4. When an available seat is clicked, it is assigned to that passenger.
5. Previously assigned seats remain associated with their passengers when switching between passengers.
6. Occupied seats cannot be assigned again.
7. Users can change or remove their assigned seats.

### Pricing Logic

Each seat has an associated price based on its category and position.

The total seat-selection cost is calculated dynamically:

**Total Seat Cost = Sum of All Assigned Seat Prices**

If meal selection is enabled:

**Final Total = Total Seat Cost + Total Meal Cost**

All prices are updated automatically whenever a passenger changes or removes a seat or meal selection.

## Deployment

The application can be deployed using **Vercel**.

1. Push the project to GitHub.
2. Visit [Vercel](https://vercel.com/).
3. Import your GitHub repository.
4. Configure the build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click Deploy.

## Project Information

- **Project Type:** Frontend Development Assessment
- **Framework:** React.js
- **Build Tool:** Vite
- **Backend:** Not required
- **Data Management:** Mock data and React local state
- **Deployment:** Vercel

## Author

"Suvendu Behera"

---

If you find this project interesting, consider giving the repository a star!
