const { timelinePage } = inject();

Then('I validate timeline page is loaded', () => {
    timelinePage.validatePageLoaded();
});

Then('I validate timeline events', () => {
    timelinePage.validateTimelineEvents();
});