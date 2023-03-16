import * as config from './config.js';

const timeOut = function (timeInSecond) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long to respond.TimeOut in ${timeInSecond}`)
      );
    }, timeInSecond * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const fetchPromise = fetch(url);
    const res = await Promise.race([
      fetchPromise,
      timeOut(config.timeOutValueInSecond),
    ]);
    if (!res.ok) throw new Error(`Error: ${res.message}(${res.status})`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const postJson = async function (url, uploadData) {
  try {
    console.log(uploadData);
    const fetchApi = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    var response = await Promise.race([
      fetchApi,
      timeOut(config.timeOutValueInSecond),
    ]);
    console.log(response);
    if (!response.ok)
      throw new Error(`${response.message} :${response.status}`);
    const data = await response.json();
    return data.data.recipe;
  } catch (err) {
    throw err;
  }
};
