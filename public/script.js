const API_URL = '/api/students';

const form = document.getElementById('studentForm');
const table = document.getElementById('studentTable');
const message = document.getElementById('message');

// Fetch all students
async function loadStudents() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Unable to load students');
        }

        const students = await response.json();

        table.innerHTML = '';

        students.forEach(student => {

            const row = document.createElement('tr');

            const values = [
                student.id,
                student.name,
                student.email,
                student.course
            ];

            values.forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });

            const actionCell = document.createElement('td');

            const deleteButton = document.createElement('button');

            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-btn';

            deleteButton.onclick = () => deleteStudent(student.id);

            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            table.appendChild(row);

        });

    } catch (error) {
        message.textContent = error.message;
    }
}

// Add student
form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const student = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        course: document.getElementById('course').value
    };

    try {

        const response = await fetch(API_URL, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(student)

        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Unable to add student');
        }

        message.textContent = 'Student added successfully!';

        form.reset();

        loadStudents();

    } catch (error) {

        message.textContent = error.message;

    }

});

// Delete student
async function deleteStudent(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || result.error);
        }

        message.textContent = 'Student deleted successfully!';

        loadStudents();

    } catch (error) {

        message.textContent = error.message;

    }

}

// Initial loading
loadStudents();