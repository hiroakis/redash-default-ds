document.getElementById('saveSettings').addEventListener('click', () => {
  const defaultDataSource = document.getElementById('defaultDataSource').value;
  if (defaultDataSource) {
    chrome.storage.sync.set({ defaultDataSource: defaultDataSource }, () => {
      alert('saved');
    });
  }
});

chrome.storage.sync.get(['defaultDataSource'], (data) => {
  if (data.defaultDataSource) {
    document.getElementById('defaultDataSource').value = data.defaultDataSource;
  }
});

