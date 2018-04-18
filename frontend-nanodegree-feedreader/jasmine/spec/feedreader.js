/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
      expect(allFeeds).not.toBe("");
      expect(allFeeds instanceof Array).toBeTruthy();
      expect(allFeeds).not.toBeUndefined();
      expect(allFeeds).not.toBeNull();
    });


    /* This test loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     TODO: Edge cases such as errors and empties
     */
    it('the url of each feed item is defined and not empty', function() {
      allFeeds.forEach(function(list) {
        expect(list.url).toBeDefined();
        expect(list.url).not.toBe("");
        expect(list.url).toMatch(/^(http|https):\/\//);
        expect(list.url).not.toBeUndefined();
        expect(list.url).not.toBeNull();
      });
    });


    /* This test loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     TODO: Edge cases such as errors and empties
     */
    it('the name of each feed item is defined and not empty', function() {
      allFeeds.forEach(function(list) {
        expect(list.name).toBeDefined();
        expect(list.name).not.toBe("");
        expect(list.name).not.toBeUndefined();
        expect(list.name).not.toBeNull();
      });
    });
  });

  describe('The menu', function() {
    /* This test ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('menu element is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toEqual(true);
    });
    /* This test ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('menu changes visibility when menu icon is clicked', function() {
      var sidebarMenuIcon = $('.menu-icon-link');
      sidebarMenuIcon.click();
      expect($('body').hasClass('.menu-hidden')).toBe(false);

      sidebarMenuIcon.click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

  });




  describe('Initial Entries', function() {
    /* This test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('is called and there is at least one entry within feed container', function() {
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });
  });



  describe('New Feed Selection', function() {
    /* This test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    var $firstFeedItem;
    var $secondFeedItem;

    beforeEach(function(done) {
      loadFeed(0, function() {
        $firstFeedItem = $('.feed').html();
        
        loadFeed(1, function() {
        $secondFeedItem = $('.feed').html();
        done();
      });
    });
  });

    it('should change feed content after loading feed', function(done) {
      // loadFeed(1, function() {
        expect($secondFeedItem).not.toEqual($firstFeedItem);
        done();
      // });
    });
  });
}());
