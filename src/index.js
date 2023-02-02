export const withPromiseTimeout = (
    promise,
    options = {}
) => {
    const {
        timeoutInMillis = 120000,
        message = 'Promise has timed out.'
    } = options;

    let promiseTimeout;
    const clearPromiseTimeout = () => {
        promiseTimeout !== undefined && clearTimeout(promiseTimeout);
        promiseTimeout = undefined;
    };

    return Promise.race([
        (async () => {
            try {
                const result = await promise;
                clearPromiseTimeout();
                return result;
            } catch (error) {
                clearPromiseTimeout();
                throw error;
            }
        })(),
        new Promise((_, reject) => {
            promiseTimeout = setTimeout(() => {
                promiseTimeout = undefined;
                reject(new Error(message));
            }, timeoutInMillis);
        })
    ]);
};
