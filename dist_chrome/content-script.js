window.addEventListener('message', function(event) {
  if (event.data === 'debugger-client') {
    var port = event.ports[0];
    listenToPort(port);
  } else if (event.data.type) {
    chrome.extension.sendMessage(event.data);
  }
});

function listenToPort(port) {
  port.addEventListener('message', function(event) {
    chrome.extension.sendMessage(event.data);
  });

  chrome.extension.onMessage.addListener(function(message) {
    if (message.from === 'devtools') {
      port.postMessage(message);
    }
  });

  port.start();
}

// let ember-debug know that content script has executed
document.documentElement.dataset.emberExtension = 1;

// Allow older versions of Ember (< 1.4) to detect the extension.
if (document.body) {
  document.body.dataset.emberExtension = 1;
}
