const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

/**
 * Adds click events to previous and next to generate last or next month's calendar
 * @param {number} currentMonth - month used for generating previous and next
 * @param {number} currentYear - year used for generating calender view
 * @param {string} calendar - calendar class selector used to add control events to specific calendar
 * @returns {undefined}
 */
const addControlEvents = (currentMonth, currentYear, calendar) => {
  const previous = document.querySelector(`.${calendar} .previous`);
  const next = document.querySelector(`.${calendar} .next`);
  
  if(!previous && !next) {
    console.warn('Missing Controls Markup');
    return;
  }

  let previousMonth = currentMonth - 1;
  let previousMonthYear = currentYear;
  let nextMonth = currentMonth+ 1;
  let nextMonthYear = currentYear;
  
  if(currentMonth === 0) {
    previousMonth = 11;
    previousMonthYear = currentYear - 1;
  } else if(currentMonth === 11) {
    nextMonth = 0;
    nextMonthYear = currentYear + 1;
  }

  previous.addEventListener('click', function(event) {
    event.preventDefault();
    populateCalendars(calendar, previousMonth, previousMonthYear);
  });
  next.addEventListener('click', function(event) {
    event.preventDefault();
    populateCalendars(calendar, nextMonth, nextMonthYear);
  });
};

/**
 * Creates a string  rows for that month's calendar
 * @param {number} firstOfMonth - number representing the first day of the month's day of the week
 * @param {number} numberOfDaysInMonth - number of days for that month
 * @returns {string}
 */
const getTableBodyRows = (firstOfMonth, numberOfDaysInMonth) => {
  const numberOfCellsNeeded = (firstOfMonth + 1) + numberOfDaysInMonth; // add 1 to firstOfMonth since getDay starts at 0
  const rowNumber = Math.ceil(numberOfCellsNeeded / 7);
  let rows = '';
  let i;
  for(i = 0; i < rowNumber; i++) {
    rows +=
      `<tr>
        <td class="weekend"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="weekend"></td>
      </tr>`;
  }
  return rows;
};

/**
 * Populate Calendars on page
 * @param {string} calendarClassSelector - generate calendar on a div with this class name
 * @param {number} [month] - month used for generating calender view, will use current month if not set
 * @param {number} [year] - year used for generating calender view, will use current year if not set
 * @returns {undefined}
 */
const populateCalendars = (calendarClassSelector, month, year) => {
  let currentMonth;
  let currentYear;
  // Use current date unless month and year are passed
  if (month || month === 0 && year) {
    currentMonth = month;
    currentYear = year;
  } else {
    const currentDate = new Date();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();
  }

  const dateOfMonth = new Date(currentYear, currentMonth);
  const firstOfMonth = dateOfMonth.getDay();
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const numberOfDaysInMonth = lastDateOfMonth.getDate();

  const thead = `
    <thead>
      <tr>
        <th class="weekend">S</th>
        <th>M</th>
        <th>T</th>
        <th>W</th>
        <th>T</th>
        <th>F</th>
        <th class="weekend">S</th>
      </tr>
    </thead>
  `;

  const calendars = document.querySelectorAll(`.${calendarClassSelector}`);
  calendars.forEach(function(calendar, index) {
    // Add unique class based on index in case multiple calendars exist on page
    calendar.classList.add(`${calendarClassSelector}-${index + 1}`);
    calendar.innerHTML=`
    <div class="hdr">${MONTH_NAMES[currentMonth]} ${currentYear}</div>
    <div class="calendar-table-container">
      <table class="calendar-table calendar-table-${index + 1}">
        ${thead}
        <tbody>
          ${getTableBodyRows(firstOfMonth, numberOfDaysInMonth)}
        </tbody>
      </table>
      <div class="controls">
        <a class="previous" href="#"><span class="control-text">Previous</span></a>
        <a class="next" href="#"><span class="control-text">Next</span></a>
      </div>
    </div>
    `;
    // Append dates to cells
    const cells = document.querySelectorAll(`.${calendarClassSelector} .calendar-table-${index + 1} td`);
    let i;
    for(i = 0; i < numberOfDaysInMonth; i++) {
      cells[i + firstOfMonth].innerHTML=i + 1;
    }
    addControlEvents(currentMonth, currentYear, `${calendarClassSelector}-${index + 1}`);
  });
};

populateCalendars('calendar-awesome');
