var allLinks = [];

function showLinks() {
  var linksTable = document.getElementById('links');
  while (linksTable.children.length > 1) {
    linksTable.removeChild(linksTable.children[linksTable.children.length - 1])
  }
  for (var i = 0; i < allLinks.length; ++i) {
    var row = document.createElement('tr');
    var col0 = document.createElement('td');

    col0.innerText = allLinks[i];
    col0.style.whiteSpace = 'nowrap';

    row.appendChild(col0);
    linksTable.appendChild(row);
  }
}

function showEmpty() {
  document.getElementById('empty').style.display = 'block';
  document.getElementById('links').style.display = 'none';
}

chrome.extension.onRequest.addListener(function(links) {
  if (links.length > 0)
  {
    for (var index in links) {
      allLinks.push(links[index]);
    }
  
    allLinks.sort();
    showLinks();
  
  for (var i = 0; i < links.length; ++i) {
    if(links[i].endsWith("=jpg"))
    {
      chrome.downloads.download(
        {
          url: links[i],
          filename: getFilename(links[i])
        }, function(id) { });
    }
    else
    {
      chrome.downloads.download({url: links[i]}, function(id) { });
    }
  }
}
else
{
  showEmpty();
}

});


window.onload = function() {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'download.js', allFrames: true});
    });
  });
};

function getFilename(link) {
  var fileId = link.slice(link.lastIndexOf("/") + 1, link.lastIndexOf("?"));
  var filename = "goskatalog/" + fileId + "." + link.slice(link.lastIndexOf("=") + 1);
  console.log(filename);
  return filename;
}
