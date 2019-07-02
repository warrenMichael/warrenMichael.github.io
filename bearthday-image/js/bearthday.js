// Months of the Year with number of days
export const MONTHS = {
  "January": 31,
  "February": 29,
  "March": 31,
  "April": 30,
  "May": 31,
  "June": 30,
  "July": 31,
  "August": 31,
  "September": 30,
  "October": 31,
  "November": 30,
  "December": 31 
};

// API Key for NASA api
export const NASA_KEY = 'QsamKheQu2veke3NiH7pHwbDvjzFSWy1f9oogDnt';

/**
 * Adds click events to previous and next
 * and slider width to support control events
 * @returns {undefined}
 */
export function addControlEvents() {
  const slider = document.querySelector(`.slider`);
  const slide = document.querySelector(`.slider .slide`);
  const slides = document.querySelectorAll(`.slider .slide`);
  const scrollWidth = slide.scrollWidth;
  const amountOfSlides = slides.length || 0;
  const previous = document.querySelector(`.previous`);
  const next = document.querySelector(`.next`);
  
  if(!previous && !next) {
    console.warn('Missing Controls Markup');
    return;
  }

  if (amountOfSlides < 2) {
    // Do not need slider unless there is at least 2 images;
    return;
  }

  slider.style.width = (amountOfSlides * scrollWidth) + 'px';
  previous.addEventListener('click', function(event) {
    event.preventDefault();
    const previousDisabled = document.querySelector(`.controls .previous.disabled`);
    if(previousDisabled) {
      return;
    }
    const nextDisabled = document.querySelector(`.controls .next.disabled`);
    if(nextDisabled) {
      nextDisabled.classList.remove('disabled');
    }
    const currentPostionString = (slider.style.left).replace("px", "");
    const currentPosition = currentPostionString * 1;
    slider.style.left = currentPosition + scrollWidth + 'px';
    if(currentPosition === scrollWidth * -1) {
      previous.classList.add('disabled');
    }
  });
  next.addEventListener('click', function(event) {
    event.preventDefault();
    const nextDisabled = document.querySelector(`.controls .next.disabled`);
    if(nextDisabled) {
      return;
    }
    const previousDisabled = document.querySelector(`.controls .previous.disabled`);
    if(previousDisabled) {
      previousDisabled.classList.remove('disabled');
    }
    const currentPostionString = (slider.style.left).replace("px", "");
    const currentPosition = currentPostionString * 1;
    slider.style.left = currentPosition + -(scrollWidth) + 'px';
    if(currentPosition + -(scrollWidth) === -((slides.length - 1) * scrollWidth)) {
      next.classList.add('disabled');
    }
  });
};

/**
 * Calculate whether your last birtday was current year or last year
 * @param {string} month - month of your birthday
 * @param {string} day - day of your birthday
 * @returns {string}
 */
export function calculateLastBirthdayYear(month, day) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const thisYearsBirthDate = new Date(`${month} ${day} ${currentYear}`);
  if(currentDate - thisYearsBirthDate > 0) {
    return currentYear;
  } else {
    return currentYear - 1;
  }
};

/**
 * Build out select for all months
 * @returns {undefined}
 */
export function renderMonthSelect() {
  const monthSelect = document.querySelector('#birth-month-select');
  let monthOptions = '';
  for(let i = 0; i < Object.keys(MONTHS).length; i++) {
    monthOptions +=
      `<option value="${i + 1}">${Object.keys(MONTHS)[i]}</option>`;
  }
  monthSelect.innerHTML = 
    `
      <option value="">Select Month</option>
      ${monthOptions}
    `;
};

/**
 * Build out select with all days of selected month
 * @returns {undefined}
 */
export function renderDaySelect() {
  const monthSelect = document.querySelector('#birth-month-select');
  const daySelect = document.querySelector('.birth-day-wrapper');

  monthSelect.addEventListener('change', () => {
    const selected = +monthSelect.value - 1;
    const numOfDaysInMonth = MONTHS[Object.keys(MONTHS)[selected]];
    let daysInMonth = '';
    for(let i = 0; i < numOfDaysInMonth; i++) {
      daysInMonth +=
        `<option value="${i + 1}">${i + 1}</option>`;
    }
    daySelect.innerHTML = 
      `
        <label class="form-label" for="birth-day-select">Select your Birth Day</label>
        <select id="birth-day-select" class="birth-day-select">
          <option value="">Select Day</option>
          ${daysInMonth}
        </select>
      `;
    afterDaySelected();
  });
};

/**
 * After Day Select is selected enable submit
 * @returns {undefined}
 */
export function afterDaySelected() {
  const birthDateSelect = document.querySelector('#birth-day-select');
  const submit = document.querySelector('#birthdate-submit');
  birthDateSelect.addEventListener('change', () => {
    submit.disabled=false;
  });
};

/**
 * Render Slide
 * @param {string} imageSrc - src for nasa image
 * @param {string} [caption] - optional caption for image
 * @returns {undefined}
 */
export function renderSlide(imageSrc, caption) {
  if (!imageSrc) {
    console.warn("No imageSrc Data was found");
    return;
  }
  const captionMarkup = caption ? `<div class="caption">${caption}</div>`: '';
  return (
    `<div class="slide">
      <img class="bearthday-image" src="${imageSrc}" alt="The Earth on your last birthday" />
      ${captionMarkup}
    </div>`
  );
};

/**
 * Build Image src matching NASA's images
 * @param {string} date - from NASA's API expect yyyy-mm-dd
 * @param {string} imageName - name of image from NASA's API
 * @returns {string}
 */
export function buildImageUrl(date, imageName) {
  const splitDate = date.split(' '); // Don't need time smaller than day
  const datePath = splitDate[0].replace(/-/g, '/');
  const imageSrc = `https://epic.gsfc.nasa.gov/archive/natural/${datePath}/jpg/${imageName}.jpg`;
  return imageSrc;
};

/**
 * Fetch NASA EPIC data from NASA's API
 * @param {string} birthMonth - month for API request link
 * @param {string} birthDate - date for API request link
 * @param {string} birthYear - year for API request link
 * @param {boolean} [isOnBirthday] - optional isOnBirthday boolean for toogling birthday text
 * @returns {undefined}
 */
export function fetchNasaImageData(birthMonth, birthDate, birthYear, isOnBirthday = true) {
  // Add leading zero for nasa request
  const monthforRequest = birthMonth.length === 1 ? `0${birthMonth}` : birthMonth;
  const dateforRequest =  birthDate.length === 1 ? `0${birthDate}` : birthDate;
  fetch(`https://api.nasa.gov/EPIC/api/natural/date/${birthYear}-${monthforRequest}-${dateforRequest}?api_key=${NASA_KEY}`)
  .then((response) => {
    if(response.ok) {
      return response.json();
    } else {
      throw Error(`NASA API can not be reached, rejected with status ${response.status}`);
    }
  })
  .then((json) => {
    if(json && json.length) {
      let images = [];
      json.forEach((item, index) => {
        const date = item.date;
        const image = item.image;
        if(date && image) {
          const imageSrc = buildImageUrl(date, image);
          images.push(renderSlide(imageSrc, item.caption, index));
        } else {
          console.warn('Missing necessary date or image data, unable to render image');
        }
      });
      const imageContainer = document.querySelector('.bearthday-image-container');
      const birthdayImageText = isOnBirthday ? 'This image was taken on your birthday! &#127874;' : 'While this image was not taken on the same exact day as your birthday, it was taken shortly after';
      imageContainer.innerHTML= 
        `
          <p class="birthday-text">${birthdayImageText}</p> 
          <div class="slider-wrapper">
            <div class="slider">
              ${images.join(" ")}
            </div>
          </div>
          <div class="controls">
            <a class="previous control disabled" href="#"><span class="control-text">Previous</span></a>
            <a class="next control" href="#"><span class="control-text">Next</span></a>
          </div>
        `;
      addControlEvents();
    } else {
      const birthdayDate = new Date(`${birthMonth} ${birthDate} ${birthYear}`);
      const currentDate = new Date();
      const nextDay =  birthdayDate.setDate(birthdayDate.getDate()+1);
      const tomorrow = new Date(nextDay);
      if (currentDate - nextDay < 0) {
        throw Error('There are no photos during or after birthday, Will have to wait till NASA takes one');
      }
      const tomorrowsMonth = (tomorrow.getMonth() + 1).toString(); // Since getMonth starts at 0, add 1
      const tomorrowsDay = tomorrow.getDate().toString();
      const tomorrowsYear = tomorrow.getFullYear();
      // Make back up request, not getting results back
      fetchNasaImageData(tomorrowsMonth, tomorrowsDay, tomorrowsYear, false);
    }
  })
  .catch((error) => {
    const bearthDateSubmit = document.querySelector('.error-text');
    bearthDateSubmit.innerHTML=`Having Issues Fetching data from NASA's EPIC Service. Please try again later.`;
    throw Error(`NASA API can not be reached, rejected due to error ${error}. `);
  });
};

/**
 * Render BearthDate App
 * @returns {undefined}
 */
export function bearthDateMain() {
  renderMonthSelect();
  renderDaySelect();

  const bearthDateSubmit = document.querySelector('#birthdate-submit');

  bearthDateSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    const birthMonthInput = document.querySelector('#birth-month-select');
    const birthMonthValue = birthMonthInput.value;
    const birthDateInput = document.querySelector('#birth-day-select');
    const birthDateValue = birthDateInput.value;
    const lastBirthdayYear = calculateLastBirthdayYear(birthMonthValue, birthDateValue);

    if (birthMonthValue && birthDateValue) {
      fetchNasaImageData(birthMonthValue, birthDateValue, lastBirthdayYear);
    } else {
      console.warn('Not a value date');
    }
  });
};