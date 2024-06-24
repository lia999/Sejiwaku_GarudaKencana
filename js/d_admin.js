const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysInWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function renderCalendar(month, year) {
    const calendarBody = document.getElementById("calendarBody");
    const currentMonthDisplay = document.getElementById("currentMonth");
    calendarBody.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    
    currentMonthDisplay.innerHTML = `${months[month]} ${year}`;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                cell.classList.add("inactive");
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                cell.innerHTML = date;
                if (date === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
                    cell.classList.add("highlight");
                }
                row.appendChild(cell);
                date++;
            }
        }

        calendarBody.appendChild(row);
    }
}

document.getElementById("prevMonth").addEventListener("click", function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

document.getElementById("nextMonth").addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);
