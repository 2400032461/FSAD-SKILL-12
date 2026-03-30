import React, { useEffect, useState } from 'react';
import { getAllStudents, deleteStudent } from '../services/studentService';

const StudentList = ({ refresh, onEdit }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents();
      setStudents(res.data);
    } catch (err) {
      console.error('Failed to fetch students', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (err) {
        console.error('Delete failed', err);
      }
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading students...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Students ({students.length})</h2>
      {students.length === 0 ? (
        <p style={styles.empty}>No students found. Add one above!</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr
                  key={student.id}
                  style={{ background: idx % 2 === 0 ? '#f9f9f9' : '#fff' }}
                >
                  <td style={styles.td}>{student.id}</td>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.email}</td>
                  <td style={styles.td}>{student.course}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => onEdit(student)}
                      style={styles.editBtn}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: '#fff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: { margin: '0 0 16px', color: '#1a237e', fontSize: '20px' },
  empty: { color: '#888', textAlign: 'center', padding: '32px 0' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  headerRow: { background: '#1a237e' },
  th: {
    padding: '12px 16px',
    color: '#fff',
    fontWeight: '600',
    textAlign: 'left',
    fontSize: '14px',
  },
  td: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#333',
    borderBottom: '1px solid #eee',
  },
  editBtn: {
    padding: '6px 14px',
    background: '#1565c0',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
    fontSize: '13px',
  },
  deleteBtn: {
    padding: '6px 14px',
    background: '#c62828',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
  },
};

export default StudentList;
