const { I } = inject();
const config = require("codeceptjs").config.get();

// Constants
const envConfig = config.envConfig;
const testData = config.testData["timeline"];

module.exports = {

  // Locators
  locators: {
    pageHeader: {
      section: "#timeline-1",
      title: "#timeline-1 pagetitle7",
      subTitle: "#timeline-1 h1",
    },
    timeline: {
      section: "#timeline-2",
      event: {
        all: "#timeline-2 .timeline-event",
        section: "#timeline-2 .timeline-event:nth-child(IDX)",
        year: ".source",
        title: "timeh2",
        desc: "timep2",
        img: "img",
      }
    },
    clients: {
      section: "#timeline-clients"
    },
    contact: {
      section: "#space-contact-1"
    }
  },

  // Functions
  validatePageLoaded() {
    I.waitInUrl(envConfig.timeline.path, 5);
    // Check visibility
    I.waitForVisible(this.locators.pageHeader.section, 5);
    I.waitForVisible(this.locators.pageHeader.title, 5);
    I.waitForVisible(this.locators.pageHeader.subTitle, 5);
    I.waitForVisible(this.locators.timeline.section, 5);
    I.waitForVisible(this.locators.clients.section, 5);
    I.waitForVisible(this.locators.contact.section, 5);
    // Match Test Data
    I.see(testData.heading, this.locators.pageHeader.title);
    I.see(testData.subHeading, this.locators.pageHeader.subTitle);
  },

  validateTimelineEvents() {
    I.scrollTo(this.locators.timeline.section);
    const eventsData = testData.events;
    I.assertTrue(eventsData.length > 0);
    I.seeNumberOfVisibleElements(this.locators.timeline.event.all, eventsData.length);
    for (let index = 1; index <= eventsData.length; index++) {
      const eventData = eventsData[index-1];
      const eventLocator = this.locators.timeline.event.section.replace("IDX", index+1);
      I.seeElement(eventLocator);
      I.scrollTo(eventLocator);
      I.wait(1);
      within(eventLocator, () => {
        I.see(eventData.year, this.locators.timeline.event.year);
        I.see(eventData.title.toUpperCase(), this.locators.timeline.event.title);
        I.see(eventData.desc, this.locators.timeline.event.desc);
        if(eventData.hasImage) {
          I.seeElement(this.locators.timeline.event.img);
        }
      }); 
    }
  },

};