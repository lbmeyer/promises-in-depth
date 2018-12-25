// Wait for the fastest JS promise to settle with proimise.race()

function resolveAfter(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
};

// const promiseA = resolveAfter(1000, "A");
// const promiseB = resolveAfter(500, "B");

// const fastestPromise = Promise.race([promiseA, promiseB]);
// fastestPromise.then(value => {
//   console.log(value);
// }) 

function timeout(ms, promise) {
  let timeoutID;
  // if timeoutPromise is the promise that settles first
  // we will return a rejected promise with error
  const timeoutPromise = new Promise((_, reject) => {
    timeoutID = setTimeout(() => {
      reject(Error(`Operation timed out after ${ms}ms`));
    }, ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(
    () => {
      clearTimeout(timeoutID);
    }
  );
}

const promise = resolveAfter(1000, "A");

// setting timeout before promise resolves will trigger reject in promise in timeout fn
timeout(5000, promise).then(
  value => {
    console.log('fastest promise ' + value);
  },
  error => {
    console.log(error.message);
  }
)