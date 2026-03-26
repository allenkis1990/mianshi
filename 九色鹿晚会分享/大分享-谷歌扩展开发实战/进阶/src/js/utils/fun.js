/**
 * Created by Allen Liu on 2026/3/24.
 */

export let getToken = async function () {
  return new Promise((resolve) => {
    chrome.storage.local.get(["token"], (result) => {
      resolve(result.token);
    });
  });
};