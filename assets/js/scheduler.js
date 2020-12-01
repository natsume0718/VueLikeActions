let isFlushing = false;
let isFlushPending = false;

let queue = [];
const p = Promise.resolve();

/**
 * @param {function} callback
 */
function nextTick(callback) {
  return p.then(callback);
}

function queueFlash() {
  if (isFlushPending || isFlushing) {
    return;
  }
  isFlushPending = true;
  nextTick(flushJobs);
}

/**
 * @param {function} job
 */
function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job);
    queueFlash();
  }
}

function flushJobs() {
  let job;
  isFlushing = true;
  isFlushPending = false;
  while ((job = queue.shift()) !== undefined) {
    job();
  }
}

export { queueJob, nextTick };
