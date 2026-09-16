# EduConsult — Frontend

Smart Online Appointment & Educational Consultancy Management System — React frontend.

Three roles are fully built out: **Student**, **Consultant**, and **Admin**, each with their own
sidebar, dashboard, and workflows, matching the architecture in the project plan (React + Axios
talking to an ASP.NET Core Web API + SQL Server backend).

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The home page links to `/login`,
which has one-click demo account buttons for all three roles:

| Role       | Email                          | Password     |
|------------|---------------------------------|---------------|
| Student    | ahmed.student@educonsult.edu    | student123    |
| Consultant | ahmed.khan@educonsult.edu       | consult123    |
| Admin      | admin@educonsult.edu            | admin123      |

## How data works right now

There's no backend yet, so `src/services/mockData.js` holds an in-memory (localStorage-backed)
dataset — departments, consultants, appointments, notifications — shaped exactly like the SQL
tables in the project plan. Every service function in `src/services/*.js` (auth, consultants,
appointments) already calls the **real** endpoint paths from the API plan; they just short-circuit
to the mock data because `USE_MOCK = true` in `src/services/api.js`.

To reset the demo data at any point, open the browser console and run:
```js
localStorage.removeItem('educonsult_mock_db_v1')
```
then refresh.

## Wiring up the real ASP.NET Core backend

1. Copy `.env.example` to `.env` and set `VITE_API_URL` to your API's base URL.
2. In `src/services/api.js`, set `export const USE_MOCK = false;`
3. That's it — every service function already targets the matching endpoint
   (`POST /auth/login`, `GET /consultants`, `POST /appointments`,
   `PUT /appointments/{id}/accept`, etc.) and the axios instance already attaches
   the JWT from `localStorage` to every request and redirects to `/login` on a 401.

## Project structure

```
src/
├── components/       Sidebar, TopBar, DashboardLayout, ConsultantCard, AppointmentRow, ...
├── context/          AuthContext (login/register/logout, current user)
├── pages/
│   ├── Home.jsx, Login.jsx, Register.jsx
│   ├── student/      Dashboard, Consultants, ConsultantDetails, BookAppointment,
│   │                 MyAppointments, Profile
│   ├── consultant/   Dashboard, Appointments, Availability, ConsultationNotes
│   └── admin/        Dashboard, Consultants, Users, Departments, Reports
└── services/         api.js, authService.js, consultantService.js,
                       appointmentService.js, mockData.js
```

## What's implemented

- Role-based auth (student / consultant / admin) with protected routes
- Consultant directory with search + department/specialization filters
- Weekly-availability-driven slot generation with double-booking prevention
- 4-step booking flow (type → date → time → reason)
- Appointment lifecycle: Pending → Accepted/Rejected → Completed/No Show, plus Cancel
- Consultant availability editor, consultation notes on completion
- Admin dashboard with charts (appointments by department, by consultation type, by status),
  consultant CRUD, department management, and reports

## Not yet built (left for the backend phase)

- Real password hashing / JWT issuance (handled by ASP.NET Identity server-side)
- Email/SMS notifications, video call integration beyond a stored meeting link
- Feedback/rating submission UI (ratings are currently seed data)
- Department Coordinator role
