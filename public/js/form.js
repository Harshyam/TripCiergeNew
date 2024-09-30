
// phone number
document.getElementById('phone').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9+]/g, '');
});

// calender 
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedStartDate = null;
let selectedEndDate = null;

function renderCalendar(month, year) {
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';

    const monthYear = document.getElementById('calendar-month-year');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    prevMonthButton.textContent = `${monthNames[(month + 11) % 12]} `;
    nextMonthButton.textContent = `${monthNames[(month + 1) % 12]} `;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day', 'empty');
        calendarDays.appendChild(emptyCell);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = i;
        dayCell.classList.add('calendar-day');
        dayCell.onclick = () => selectDay(dayCell, new Date(year, month, i));
        calendarDays.appendChild(dayCell);
    }

    updateCalendarSelection();
}
// 
function selectDay(dayCell, date) {
    if (!selectedStartDate || selectedEndDate) {
        selectedStartDate = date;
        selectedEndDate = null;
        document.getElementById('days').value = '';
        document.getElementById('nights').value = '';
    } else {
        selectedEndDate = date;
        const days = Math.round((selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24));
        document.getElementById('days').value = days + 1;
        document.getElementById('nights').value = days;
    }
    updateCalendarSelection();
}

function updateCalendarSelection() {
    const calendarDays = document.querySelectorAll('.calendar-day:not(.empty)');
    calendarDays.forEach(dayCell => {
        const day = parseInt(dayCell.textContent);
        const date = new Date(currentYear, currentMonth, day);
        if (selectedStartDate && date.getTime() === selectedStartDate.getTime()) {
            dayCell.classList.add('selected');
        } else if (selectedEndDate && date.getTime() === selectedEndDate.getTime()) {
            dayCell.classList.add('selected');
        } else if (selectedStartDate && selectedEndDate && date >= selectedStartDate && date <= selectedEndDate) {
            dayCell.classList.add('selected');
        } else {
            dayCell.classList.remove('selected');
        }
    });
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}

function prevYear() {
    currentYear--;
    renderCalendar(currentMonth, currentYear);
}

function nextYear() {
    currentYear++;
    renderCalendar(currentMonth, currentYear);
}

function changeValue(id, delta) {
    const input = document.getElementById(id);
    const newValue = Math.max(0, parseInt(input.value) + delta);
    input.value = newValue;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar(currentMonth, currentYear);
});
    
// buget sscript 
function updateBudgetValue(value) {
    const budgetValue = document.getElementById('budget-value');
    budgetValue.value = value;
}

function updateBudgetSlider(value) {
    const budgetSlider = document.getElementById('budget');
    if (value >= 5000 && value <= 100000) {
        budgetSlider.value = value;
    }
}

