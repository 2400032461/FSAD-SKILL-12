import React, { useState, useEffect } from 'react';
import { addStudent, updateStudent } from '../services/studentService';

const AddStudent = ({ onStudentAdded, editingStudent, onCancelEdit }) => {
  const [form, setForm] = useState({ name: '', email: '', course: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course,
      });
    } else {
      setForm({ name: '', email: '', course: '' });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, form);
        setMessage('Student updated successfully!');
        onCancelEdit();
      } else {
        await addStudent(form);
        setMessage('Student added successfully!');
      }
      setForm({ name: '', email: '', course: '' });
      onStudentAdded();
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{editingStudent ? 'Update Student' : 'Add New Student'}</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter student email"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Course</label>
          <input
            type="text"
            name="course"
            value={form.course}
            onChange={handleChange}
            placeholder="Enter course name"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.btnRow}>
          <button type="submit" style={styles.submitBtn}>
            {editingStudent ? 'Update' : 'Add Student'}
          </button>
          {editingStudent && (
            <button type="button" onClick={onCancelEdit} style={styles.cancelBtn}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    background: '#fff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '32px',
  },
  title: { margin: '0 0 16px', color: '#1a237e', fontSize: '20px' },
  message: { color: '#2e7d32', background: '#e8f5e9', padding: '8px 12px', borderRadius: '4px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#333' },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
  },
  btnRow: { display: 'flex', gap: '12px' },
  submitBtn: {
    padding: '10px 24px',
    background: '#1a237e',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
  cancelBtn: {
    padding: '10px 24px',
    background: '#e0e0e0',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
};

export default AddStudent;
