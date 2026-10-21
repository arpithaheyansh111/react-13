

function myFetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // 1. Configure the request
    xhr.open(options.method || "GET", url);

    // 2. Add request headers
    const headers = options.headers || {};

    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    // 3. Handle the response
    xhr.onload = function () {
      const response = {
        status: xhr.status,
        ok: xhr.status >= 200 && xhr.status < 300,

        json: async () => JSON.parse(xhr.responseText),
        text: async () => xhr.responseText,
      };

      // HTTP 404 or 500 still resolves, like fetch()
      resolve(response);
    };

    // 4. Handle network errors
    xhr.onerror = function () {
      reject(new Error("Network error"));
    };

    // 5. Send the request body, if provided
    xhr.send(options.body ?? null);
  });
}