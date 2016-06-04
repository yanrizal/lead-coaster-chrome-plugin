const getCurrentTabUrl = (callback) => {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    const tab = tabs[0];
    const url = tab.url;
    console.assert(typeof url === 'string', 'tab.url should be a string');

    callback(url);
  });
};

const renderStatus = (statusText) => {
  //document.getElementById('status').textContent = statusText;
};

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    //renderStatus(url);
  });
  const findBtn = document.getElementById('find');
  findBtn.addEventListener('click', () => {
    const value = document.getElementById('search').value;
    console.log(value);
  });
});

