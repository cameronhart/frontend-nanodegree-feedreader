/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe("RSS Feeds", () => {
      it("Feeds are defined", () => {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      it("URLs are defined", () => {
        for (let i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].url).toBeDefined();
          expect(allFeeds[i].url.length).not.toBe(0);
        }
      });

      it("Names are defined", () => {
        allFeeds.forEach(feed => {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        });
      });
    });

    describe("The menu", () => {
      it("Menu element is hidden", () => {
        expect($("body").hasClass("menu-hidden")).toEqual(true);
      });

      it("Toggle on click event", () => {
        $(".menu-icon-link").trigger("click");
        expect($("body").hasClass("menu-hidden")).toBe(false);
        $(".menu-icon-link").trigger("click");
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });
    });

    describe("Initial Entries", () => {
      beforeEach(done => {
        loadFeed(0, () => {
          done();
        });
      });

      it("Feed has at least a single entry", () => {
        expect($(".feed .entry").length).toBeGreaterThan(0);
      });
    });

    describe("New Feed Selection", () => {
      let firstFeed, secondFeed;

      beforeEach(done => {
        loadFeed(1, () => {
          firstFeed = $(".feed").html();
          loadFeed(2, () => {
            done();
          });
        });
      });

      afterEach(() => {
        loadFeed(0);
      });

      it("Two feeds are different", () => {
        secondFeed = $(".feed").html();
        expect(firstFeed).not.toEqual(secondFeed);
      });
    });
  })()
);
