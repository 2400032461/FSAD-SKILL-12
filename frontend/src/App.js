import React, { useState } from 'react';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';

function App() {
  const [refresh, setRefresh] = useState(0);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleStudentAdded = () => {
    setRefresh(r => r + 1);
    setEditingStudent(null);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>🎓 Student Management System</h1>
        <p style={styles.headerSub}>Full-Stack CRUD | React + Spring Boot</p>
      </header>

      <main style={styles.main}>
        <AddStudent
          onStudentAdded={handleStudentAdded}
          editingStudent={editingStudent}
          onCancelEdit={handleCancelEdit}
        />
        <StudentList refresh={refresh} onEdit={handleEdit} />
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f0f2f5',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
    color: '#fff',
    padding: '32px 24px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  headerTitle: { margin: 0, fontSize: '28px', fontWeight: '700' },
  headerSub: { margin: '8px 0 0', opacity: 0.8, fontSize: '14px' },
  main: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '32px 16px',
  },
};

export default App;
