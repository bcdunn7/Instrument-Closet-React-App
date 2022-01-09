/** Frequency Counter for Totaling quantity of reservations. Automatically set to increment 1 hour, 3600 seconds. If reservations are adjusted so a smaller level of granularity is allowed, that increment would also need to be adjusted. */

const createFreqCounter = (arr) => {
    let frequencyCounter = {};

    for (let resv of arr) {
        let start = resv.startTime;
        while (start < resv.endTime) {
            frequencyCounter[start] = (frequencyCounter[start] || 0) + resv.quantity;
            start += 3600;
        }
    }

    return frequencyCounter;
}

export default createFreqCounter;