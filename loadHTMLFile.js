export function loadHTMLFile(path) {
    return new Promise(function (resolve, reject){
      var xmlhttp = new XMLHttpRequest();
  
      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
              if (xmlhttp.status == 200) {
                resolve(xmlhttp.responseText);
              }
              else if (xmlhttp.status == 400) {
                reject('Error 400');
              }
              else {
                reject('200 was not returned');
              }
          }
      };
      xmlhttp.open("GET", path, true);
      xmlhttp.send();
    });
  }