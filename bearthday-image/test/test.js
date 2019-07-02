
const { expect } = require('chai');

const {
  MONTHS,
  NASA_KEY,
  addControlEvents,
  calculateLastBirthdayYear,
  renderMonthSelect,
  renderDaySelect,
  afterDaySelected,
  renderSlide,
  buildImageUrl,
  fetchNasaImageData,
  bearthDateMain,
} = require('../js/bearthday');

describe("Bearthday Tests", function() {
  it('should export MONTHS with correct month/days in month', function () {
    expect(MONTHS).to.deep.equal({
      January: 31,
      February: 29,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31 
    });
  });
  
  it('should export key correctly', function () {
    expect(NASA_KEY).to.equal('QsamKheQu2veke3NiH7pHwbDvjzFSWy1f9oogDnt');
  });

  it('addControlEvents', function () {
    expect(addControlEvents).to.be.a('function');
  });

  describe('calculateLastBirthdayYear', function() {
    // Find out day before and after today for tests
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate()-1);
    const Yesterday = pastDate.getDate();
    const YesterDayMonth = pastDate.getMonth()
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate()+1);
    const nextDay =  futureDate.getDate();
    const nextDayMonth =  futureDate.getMonth();
    const currentYear = currentDate.getFullYear()

    it('calculateLastBirthdayYear', function () {
      expect(calculateLastBirthdayYear).to.be.a('function');
    });

    it('when birthday already passed this year, should return this year', function () {
      expect(calculateLastBirthdayYear(YesterDayMonth, Yesterday)).to.equal(currentYear);
    });

    it('if birthday has not already passed this year, should return last year', function () {
      expect(calculateLastBirthdayYear(nextDayMonth, nextDay)).to.equal(currentYear);
    });
  });

  it('renderMonthSelect', function () {
    expect(renderMonthSelect).to.be.a('function');
  });

  it('renderDayelect', function () {
    expect(renderDaySelect).to.be.a('function');
  });

  it('afterDaySelected', function () {
    expect(afterDaySelected).to.be.a('function');
  });

  describe('renderSlide', function() {
    it('renderSlide', function () {
      expect(renderSlide).to.be.a('function');
    });

    it('when image and caption is passed in', function () {
      const ranRenderSlide = renderSlide('image.png', 'test caption');
      expect(ranRenderSlide).to.contain('src="image.png"');
      expect(ranRenderSlide).to.contain('<div class="caption">test caption</div>');
    });

    it('when caption is not passed in', function () {
      const ranRenderSlide = renderSlide('image.png');
      expect(ranRenderSlide).to.contain('src="image.png"');
      expect(ranRenderSlide).to.not.contain('<div class="caption" data->test caption</div>');
    });

    it('when no image is passed in', function () {
      const ranRenderSlide = renderSlide();
      expect(ranRenderSlide).to.equal(undefined);
    });
  });

  describe('buildImageUrl', function() {
    it('builds correct source based on passed in date and imageName ', function () {
      expect(buildImageUrl('2019-01-02 00:22:24', 'epic_1b_20190102002713')).to.equal("https://epic.gsfc.nasa.gov/archive/natural/2019/01/02/png/epic_1b_20190102002713.png");
    });
  });

  it('fetchNasaImageData', function () {
    expect(fetchNasaImageData).to.be.a('function');
  });

  it('bearthDateMain', function () {
    expect(bearthDateMain).to.be.a('function');
  });
});