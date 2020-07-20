/**
 * We have a function called makeRequest that makes an API request.
 * We also have a function called eventHandler that is hooked up to
 * an event (a click, for example), and right now it's a dumb handler
 * that simply calls makeRequest.
 *
 * Write a new event handler eventHandlerWithThrottling that we can hook
 * up to the click event such that it won't call makeRequest more
 * than once every 5 seconds.
 *
 * We do not care what the API request returns (assume it's a fire-and-forgot POST)
 *
 * Events that occur within 5 seconds of an API request are "remembered",
 * and once the 5 second timeout is over, **the latest one will be fired**.
 **/

let now = 0;

function makeRequest(payload) {
  // let's pretend this makes a request, and logs the payload/time of request
  console.log({
    data: payload,
    time: Math.round((new Date().getTime() - now) / 1000)
  });
}

const throttle = (callback, delay) => payload => callback(payload);
// const throttledMakeRequest = throttle(makeRequest, 5000);

/**
 * TESTS (do not edit)
 **/
{
  // set "now" to the moment when tests started
  now = new Date().getTime();

  // util function for testing
  function simulateEvent(fn, payload, timeOfEvent) {
    setTimeout(function() {
      fn(payload);
    }, timeOfEvent);
  }

  function test(name, timeout, code) {
    setTimeout(() => {
      console.groupEnd();
      console.group(name);
      code();
    }, timeout);
  }

  console.clear();
  // ADDED first case. just one call
  test("test 1: hello", 0, () => {
    const eventHandlerWithThrottling1 = throttle(makeRequest, 50);
    simulateEvent(eventHandlerWithThrottling1, "1. hello", 0); // hello logged at 0
  });

  //  2. 'hello' (t = 0), 'goodbye' (t = 5)
  test("test 2: hello, goodbye", 60, () => {
    const eventHandlerWithThrottling2 = throttle(makeRequest, 50);
    simulateEvent(eventHandlerWithThrottling2, "2. hello", 0); // hello logged at 0
    simulateEvent(eventHandlerWithThrottling2, "2. goodbye", 40); // goodbye logged at 5
  });

  // 3. a (t = 0), 'c' (t = 5), 'd' (t = 10)
  test("test 3: a, c, d", 160, () => {
    const eventHandlerWithThrottling3 = throttle(makeRequest, 50);
    simulateEvent(eventHandlerWithThrottling3, "3. a", 0); // a logged at 0
    simulateEvent(eventHandlerWithThrottling3, "3. b", 20); // ignored
    simulateEvent(eventHandlerWithThrottling3, "3. c", 40); // c logged at 5
    simulateEvent(eventHandlerWithThrottling3, "3. d", 70); // d logged at 10
  });

  // ADDED 4.
  test("test 4: a, c, d, e, f, g", 300, () => {
    const eventHandlerWithThrottling4 = throttle(makeRequest, 50);
    simulateEvent(eventHandlerWithThrottling4, "4. a", 0); // a logged at 0
    simulateEvent(eventHandlerWithThrottling4, "4. b", 20); // ignored
    simulateEvent(eventHandlerWithThrottling4, "4. c", 40); // c logged at 5
    simulateEvent(eventHandlerWithThrottling4, "4. d", 70); // d logged at 10
    simulateEvent(eventHandlerWithThrottling4, "4. e", 200); // e logged at 20. like if it was first call
    simulateEvent(eventHandlerWithThrottling4, "4. f", 220); // f called at 25
    simulateEvent(eventHandlerWithThrottling4, "4. g", 260); // g logged at 30
  });
}
