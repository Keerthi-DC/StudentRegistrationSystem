document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("StudentForm");
    const displayArea = document.querySelector(".display");

    studentForm.addEventListener("submit", function (event) {
        const name = studentForm.name.value;
        const id = studentForm.id.value;
        const email = studentForm.email.value;
        const phone = studentForm.phone.value;
    
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
        <td contenteditable="true">${name}</td>
        <td contenteditable="true">${id}</td>
        <td contenteditable="true">${email}</td>
        <td contenteditable="true">${phone}</td>
        <td>
            <button onclick="resetStudent(this)">Reset</button>
            <button onclick="deleteStudentEntry(this)">Delete</button>
        </td>
        `;
        newRow.dataset.originalName = name;
        newRow.dataset.originalId = id;
        newRow.dataset.originalEmail = email;
        newRow.dataset.originalPhone = phone;

        studentTableBody.appendChild(newRow);

        saveStudents();
        studentForm.reset();
    });
});

function deleteStudentEntry(button) {
    button.closest("tr").remove();
}

function resetStudent(button) {
    const row = button.closest("tr");
    row.cells[0].textContent = row.dataset.originalName;
    row.cells[1].textContent = row.dataset.originalId;
    row.cells[2].textContent = row.dataset.originalEmail;
    row.cells[3].textContent = row.dataset.originalPhone;
    saveStudents();
}


function validateInputs(name, id, email, phone) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const idRegex = /^[0-9]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.match(nameRegex)) {
        alert("Name should contain only letters and spaces.");
        return false;
    }
    if (!id.match(idRegex)) {
        alert("Student ID should contain only numbers.");
        return false;
    }
    if (!email.match(emailRegex)) {
        alert("Enter a valid email address.");
        return false;
    }
    if (!phone.match(phoneRegex)) {
        alert("Phone number should contain exactly 10 digits.");
        return false;
    }
    return true;
}


function saveStudents() {
    const students = [];
    document.querySelectorAll("#studentTableBody tr").forEach(row => {
        const student = {
            name: row.cells[0].textContent,
            id: row.cells[1].textContent,
            email: row.cells[2].textContent,
            phone: row.cells[3].textContent
        };
        students.push(student);
    });
    localStorage.setItem("students", JSON.stringify(students));
}

function loadStudents() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const studentTableBody = document.getElementById("studentTableBody");

    students.forEach(student => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td contenteditable="true">${student.name}</td>
            <td contenteditable="true">${student.id}</td>
            <td contenteditable="true">${student.email}</td>
            <td contenteditable="true">${student.phone}</td>
            <td>
                <button onclick="resetStudent(this)">Reset</button>
                <button onclick="deleteStudentEntry(this)">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(newRow);
    });
}

document.addEventListener("DOMContentLoaded", loadStudents);

