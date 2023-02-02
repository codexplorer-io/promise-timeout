export const withPromiseTimeout = (
    promise,
    options = {}
) => {
    const {
        timeoutInMillis = 120000,
        message = 'Promise has timed out.'
    } = options;

    return Promise.race([
        promise,
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error(message)), timeoutInMillis);
        })
    ]);
};
