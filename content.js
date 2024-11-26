const observer = new MutationObserver((mutationsList, observer) => {
  const inputElement = document.querySelector('.ant-select-selection-search-input');

  if (inputElement) {
    observer.disconnect();
    
    if (window.location.pathname === '/queries/new') {
        chrome.storage.sync.get(['defaultDataSource'], (data) => {
          const defaultDataSource = data.defaultDataSource;

          inputElement.focus();

          const keydownEvent = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            keyCode: 40,
            bubbles: true
          });
          inputElement.dispatchEvent(keydownEvent);

          inputElement.click();

          const dropdownObserver = new MutationObserver((mutationsList, dropdownObserver) => {
            const dropdownItem = document.querySelector(`[data-name='${defaultDataSource}']`);
            if (dropdownItem) {
              dropdownObserver.disconnect();

              dropdownItem.click();
              inputElement.blur();
            }
          });

          dropdownObserver.observe(document.body, { childList: true, subtree: true });
        });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
