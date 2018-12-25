var links = [].slice.apply(document.getElementsByClassName('zoomWindow'));

links = links.map(function(element) {
  var style = element.currentStyle || window.getComputedStyle(element, false);
  var bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");

  return bi;
});

chrome.extension.sendRequest(links);
