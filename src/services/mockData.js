// Mirrors the tables in section 12 of the project plan:
// Users, Departments, ConsultationCategories, Consultants, Students,
// Availability, Appointments, ConsultationNotes, Notifications, Feedback.
// Held in memory + localStorage so the demo persists across a refresh.

const STORAGE_KEY = 'educonsult_mock_db_v1';

const seed = {
  departments: [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Business Administration' },
    { id: 3, name: 'Student Affairs' },
  ],
  categories: [
    { id: 1, name: 'Academic Guidance' },
    { id: 2, name: 'Career Counseling' },
    { id: 3, name: 'Final Year Project' },
    { id: 4, name: 'Scholarship Guidance' },
    { id: 5, name: 'Personal Guidance' },
  ],
  users: [
    { id: 1, name: 'Ahmed Raza', email: 'ahmed.student@educonsult.edu', role: 'student', password: 'student123' },
    { id: 2, name: 'Sara Malik', email: 'sara.student@educonsult.edu', role: 'student', password: 'student123' },
    { id: 3, name: 'Dr. Ahmed Khan', email: 'ahmed.khan@educonsult.edu', role: 'consultant', password: 'consult123' },
    { id: 4, name: 'Ms. Aisha Noor', email: 'aisha.noor@educonsult.edu', role: 'consultant', password: 'consult123' },
    { id: 5, name: 'Mr. Ali Hassan', email: 'ali.hassan@educonsult.edu', role: 'consultant', password: 'consult123' },
    { id: 6, name: 'System Admin', email: 'admin@educonsult.edu', role: 'admin', password: 'admin123' },
  ],
  consultants: [
    {
      id: 3,
      userId: 3,
      name: 'Dr. Ahmed Khan',
      title: 'Academic Advisor',
      departmentId: 1,
      experienceYears: 8,
      specializations: ['Academic Guidance', 'Final Year Project', 'Career Counseling'],
      bio: 'Focuses on helping CS students plan course loads and final-year project scope.',
      rating: 4.8,
      reviewCount: 120,
      status: 'approved',
      availability: {
        Monday: [['10:00', '14:00']],
        Tuesday: [],
        Wednesday: [['11:00', '15:00']],
        Thursday: [],
        Friday: [['09:00', '12:00']],
        Saturday: [],
        Sunday: [],
      },
    },
    {
      id: 4,
      userId: 4,
      name: 'Ms. Aisha Noor',
      title: 'Scholarship & Financial Aid Advisor',
      departmentId: 2,
      experienceYears: 5,
      specializations: ['Scholarship Guidance', 'Academic Guidance'],
      bio: 'Helps students identify and apply for scholarships and financial aid programs.',
      rating: 4.6,
      reviewCount: 74,
      status: 'approved',
      availability: {
        Monday: [],
        Tuesday: [['09:00', '13:00']],
        Wednesday: [],
        Thursday: [['13:00', '17:00']],
        Friday: [],
        Saturday: [],
        Sunday: [],
      },
    },
    {
      id: 5,
      userId: 5,
      name: 'Mr. Ali Hassan',
      title: 'Career Counselor',
      departmentId: 3,
      experienceYears: 6,
      specializations: ['Career Counseling', 'Personal Guidance'],
      bio: 'Works on CV reviews, interview prep, and job-search strategy.',
      rating: 4.9,
      reviewCount: 96,
      status: 'approved',
      availability: {
        Monday: [['13:00', '17:00']],
        Tuesday: [],
        Wednesday: [['09:00', '12:00']],
        Thursday: [],
        Friday: [['13:00', '16:00']],
        Saturday: [],
        Sunday: [],
      },
    },
  ],
  appointments: [
    {
      id: 101,
      studentId: 1,
      consultantId: 3,
      categoryId: 3,
      date: '2026-09-15',
      startTime: '11:00',
      endTime: '11:30',
      reason: 'I need guidance regarding my Final Year Project topic selection.',
      status: 'Accepted',
      meetingLink: 'https://meet.google.com/edu-fyp-check',
      notes: null,
      createdAt: '2026-09-08T10:12:00Z',
    },
    {
      id: 102,
      studentId: 1,
      consultantId: 5,
      categoryId: 2,
      date: '2026-09-05',
      startTime: '14:00',
      endTime: '14:30',
      reason: 'Would like feedback on my resume before internship applications.',
      status: 'Completed',
      meetingLink: 'https://meet.google.com/edu-career-01',
      notes: 'Reviewed resume, recommended reordering skills section and quantifying project impact. Follow up in 2 weeks with updated draft.',
      createdAt: '2026-09-01T09:00:00Z',
    },
    {
      id: 103,
      studentId: 2,
      consultantId: 3,
      categoryId: 1,
      date: '2026-09-16',
      startTime: '10:30',
      endTime: '11:00',
      reason: 'Confused about elective course load for next semester.',
      status: 'Pending',
      meetingLink: null,
      notes: null,
      createdAt: '2026-09-09T15:40:00Z',
    },
    {
      id: 104,
      studentId: 2,
      consultantId: 4,
      categoryId: 4,
      date: '2026-08-28',
      startTime: '09:30',
      endTime: '10:00',
      reason: 'Need help identifying scholarships for the spring semester.',
      status: 'No Show',
      meetingLink: null,
      notes: null,
      createdAt: '2026-08-20T11:00:00Z',
    },
  ],
  notifications: [
    { id: 1, userId: 1, message: 'Your appointment with Dr. Ahmed Khan was accepted for Sep 15, 11:00 AM.', read: false, createdAt: '2026-09-08T10:30:00Z' },
    { id: 2, userId: 1, message: 'Reminder: your appointment starts in 30 minutes.', read: false, createdAt: '2026-09-15T10:30:00Z' },
    { id: 3, userId: 3, message: 'New pending appointment request from Sara Malik.', read: false, createdAt: '2026-09-09T15:40:00Z' },
  ],
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // fall through to reseed
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return structuredClone(seed);
}

function save(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function resetMockDb() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
}

const db = load();

export function getDb() {
  return db;
}

export function persist() {
  save(db);
}

export function nextId(collection) {
  return collection.length ? Math.max(...collection.map((c) => c.id)) + 1 : 1;
}
