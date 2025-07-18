 const form = document.getElementById('studentForm');
  const tableBody = document.querySelector('#studentTable tbody');
  let students = JSON.parse(localStorage.getItem('students')) || [];
  let editIndex = -1;


// to display the rows in the table
  function renderStudents() {
    tableBody.innerHTML = '';
    students.forEach((student, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="border border-solid border-[#ddd] text-center p-3">${student.name}</td>
        <td class="border border-solid border-[#ddd] text-center p-3">${student.studentId}</td>
        <td class="border border-solid border-[#ddd] text-center p-3">${student.email}</td>
        <td class="border border-solid border-[#ddd] text-center p-3">${student.contact}</td>
        <td class="border border-solid border-[#ddd] text-center p-3">
          <button class="py-[5px] px-[10px] text-[14px] cursor-pointer rounded-[4px] text-bg bg-[#0288d1]" onclick="editStudent(${index})">Edit</button>
          <button class="py-[5px] px-[10px] text-[14px] cursor-pointer rounded-[4px]  ml-[5px] text-bg bg-[#e53935]" onclick="deleteStudent(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }


//        Function to validate input fields
  function validateInput(name, studentId, email, contact) {
    const nameRegex = /^[A-Za-z ]+$/;
    const idRegex = /^\d+$/;
    const contactRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !studentId || !email || !contact) {
      alert("All fields are required.");
      return false;
    }

    if (!nameRegex.test(name)) {
      alert("Name must contain only letters.");
      return false;
    }

    if (!idRegex.test(studentId)) {
      alert("Student ID must be numbers only.");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return false;
    }

    if (!contactRegex.test(contact)) {
      alert("Contact must be a 10-digit number.");
      return false;
    }

    return true;
  }


// Event button for submit
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    if (!validateInput(name, studentId, email, contact)) return;

    const studentData = { name, studentId, email, contact };

    if (editIndex >= 0) {
      students[editIndex] = studentData;
      editIndex = -1;
    } else {
      students.push(studentData);
    }

    localStorage.setItem('students', JSON.stringify(students));
    form.reset();
    renderStudents();
  });

// Function to edit and delete student records
  function editStudent(index) {
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;
    editIndex = index;
  }

  function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
      students.splice(index, 1);
      localStorage.setItem('students', JSON.stringify(students));
      renderStudents();
    }
  }
  renderStudents();