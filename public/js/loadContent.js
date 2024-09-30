document.addEventListener('DOMContentLoaded', () => {

    // Prevent numbers in the first name and last name fields
    const firstNameInput = document.querySelector('input[name="firstName"]');
    const lastNameInput = document.querySelector('input[name="lastName"]');

    if (firstNameInput) {
        firstNameInput.addEventListener('input', () => filterNonAlpha(firstNameInput));
    }
    if (lastNameInput) {
        lastNameInput.addEventListener('input', () => filterNonAlpha(lastNameInput));
    }

    function filterNonAlpha(input) {
        input.value = input.value.replace(/[^a-zA-Z\s]/g, ''); 
    }

    // Phone number validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', () => validatePhoneNumber(phoneInput));
    }

    // Budget slider
    const budgetSlider = document.getElementById('budget');
    const budgetValue = document.getElementById('budget-value');

    if (budgetSlider) {
        updateSliderBackground(budgetSlider.value);
        budgetSlider.addEventListener('input', () => updateBudgetValue(budgetSlider.value));
    }

    if (budgetValue) {
        budgetValue.addEventListener('input', () => updateBudgetSlider(budgetValue.value));
    }

    // Calendar rendering
    renderCalendar(currentMonth, currentYear);

    // Increment and decrement buttons
    document.querySelectorAll('.increment-btn').forEach(button => {
        button.addEventListener('click', () => changeValue(button.dataset.inputId, 1));
    });

    document.querySelectorAll('.decrement-btn').forEach(button => {
        button.addEventListener('click', () => changeValue(button.dataset.inputId, -1));
    });
});

function loadHTML(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading HTML:', error));
}

function validatePhoneNumber(input) {
    input.value = input.value.replace(/[^0-9+]/g, '');

    if (input.value.includes('+')) {
        input.value = '+' + input.value.replace(/\+/g, '');
    }
    if (input.value.length > 13) {
        input.value = input.value.slice(0, 13);
    }

    let digitCount = input.value.replace(/[^0-9]/g, '').length;
    if (digitCount > 12) {
        input.value = (input.value.includes('+') ? '+' : '') + input.value.replace(/[^0-9]/g, '').slice(0, 12);
    }
}

function updateBudgetValue(value) {
    const budgetValue = document.getElementById('budget-value');
    const roundedValue = Math.round(value / 5000) * 5000;
    budgetValue.value = roundedValue;
    updateSliderBackground(roundedValue);
}

function updateBudgetSlider(value) {
    const budgetSlider = document.getElementById('budget');
    const roundedValue = Math.round(value / 5000) * 5000;
    if (budgetSlider && roundedValue >= 5000 && roundedValue <= 100000) {
        budgetSlider.value = roundedValue;
    }
    updateSliderBackground(roundedValue);
    document.getElementById('budget-value').value = roundedValue;
}

function updateSliderBackground(value) {
    const budgetSlider = document.getElementById('budget');
    if (budgetSlider) {
        const min = budgetSlider.min;
        const max = budgetSlider.max;
        const percentage = ((value - min) / (max - min)) * 100;
        budgetSlider.style.background = `linear-gradient(to right, #D6B957 ${percentage}%, #ddd ${percentage}%)`;
    }
}

function changeValue(id, delta) {
    const input = document.getElementById(id);
    if (input) {
        input.value = Math.max(0, parseInt(input.value) + delta);
    }
}

// Calendar functions
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedStartDate = null;
let selectedEndDate = null;

function renderCalendar(month, year) {
    const calendarDays = document.getElementById('calendar-days');
    const monthYear = document.getElementById('calendar-month-year');
    if (!calendarDays || !monthYear) return;

    calendarDays.innerHTML = '';

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    monthYear.textContent = `${monthNames[month]} ${year}`;

    document.getElementById('prev-month').textContent = shortMonthNames[(month + 11) % 12];
    document.getElementById('next-month').textContent = shortMonthNames[(month + 1) % 12];

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weekdayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    weekdayNames.forEach(day => {
        const weekdayCell = document.createElement('div');
        weekdayCell.textContent = day;
        weekdayCell.classList.add('calendar-day', 'weekday');
        calendarDays.appendChild(weekdayCell);
    });

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day', 'empty');
        calendarDays.appendChild(emptyCell);
    }

    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = i;
        dayCell.classList.add('calendar-day');

        const cellDate = new Date(year, month, i);
        if (cellDate >= today.setHours(0, 0, 0, 0)) {
            dayCell.onclick = () => selectDay(dayCell, cellDate);
        } else {
            dayCell.classList.add('disabled'); // Disable past days
        }

        calendarDays.appendChild(dayCell);
    }

    updateCalendarSelection();
}

function selectDay(dayCell, date) {
    if (!selectedStartDate || selectedEndDate) {
        selectedStartDate = date;
        selectedEndDate = null;
        document.getElementById('days').value = '';
        document.getElementById('nights').value = '';
    } else {
        if (date < selectedStartDate) {
            selectedEndDate = selectedStartDate;
            selectedStartDate = date;
        } else {
            selectedEndDate = date;
        }
        const days = Math.round((selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24));
        document.getElementById('days').value = days + 1;
        document.getElementById('nights').value = days;
    }
    updateCalendarSelection();
    updateFormWithDates();
}

function updateCalendarSelection() {
    const calendarDays = document.querySelectorAll('.calendar-day:not(.empty)');
    calendarDays.forEach(dayCell => {
        const day = parseInt(dayCell.textContent);
        const date = new Date(currentYear, currentMonth, day);
        if (selectedStartDate && date.toDateString() === selectedStartDate.toDateString()) {
            dayCell.classList.add('selected');
        } else if (selectedEndDate && date.toDateString() === selectedEndDate.toDateString()) {
            dayCell.classList.add('selected');
        } else if (selectedStartDate && selectedEndDate && date >= selectedStartDate && date <= selectedEndDate) {
            dayCell.classList.add('selected-range');
        } else {
            dayCell.classList.remove('selected', 'selected-range');
        }
    });
}

function updateFormWithDates() {
    const startDateField = document.getElementById('hidden-start-date');
    const endDateField = document.getElementById('hidden-end-date');

    if (selectedStartDate) {
        startDateField.value = selectedStartDate.toISOString().split('T')[0];
    } else {
        startDateField.value = '';
    }
    
    if (selectedEndDate) {
        endDateField.value = selectedEndDate.toISOString().split('T')[0];
    } else {
        endDateField.value = '';
    }
}

document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

// Initialize the calendar
renderCalendar(currentMonth, currentYear);
// Function to send form data with AJAX (optional)
function sendFormData() {
    const form = document.getElementById('trip-form');
    const formData = new FormData(form);

    fetch('/submit-form', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            alert('Form submitted successfully');
        })
        .catch(error => {
            alert('Error submitting form');
            console.error('Error:', error);
        });
}