window.onload = function () {

  var queryBtn = document.getElementById("queryBtn");
  var cleanUpBtn = document.getElementById("cleanUpBtn");
  let lines = [];
  var fileInputV = document.getElementById('file-input');

  
  fileInputV.onchange = function () {
    let fileList = fileInputV.files[0];
    //console.log(fileList);
    let reader = new FileReader();
    reader.readAsText(fileList);
    console.log(reader);

    reader.onload = function () {

      let fileResult = reader.result;
      lines = fileResult.split(/[\r\n]+/g);
      for (var i = 0; i < lines.length; i++) {}
      //console.log(reader.result);

    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  }

  // Gives cropped file based on inputted query
  queryBtn.onclick = function () {

    var checkStr = prompt("Enter your query (If multiple separate with ,)", "Query");
    checkStr = checkStr.split(",");
    outputStr = ""
    lines.forEach(function (line) {
      checkStr.forEach(function (checkS) {
        if (line.toUpperCase().includes(checkS.toUpperCase())) {
          outputStr = outputStr + line + "\n";
          //console.log(line);
        }
      })
    })
    download(outputStr, 'Cropped.txt', 'text/plain');

  }

  // Gives cleaned up file based on pre set values
  cleanUpBtn.onclick = function () {

    var checkStr = ["@from", "@to", "died", "sirus", "maven", "elder", "%", "trade", " : "];
    outputStr = ""
    lines.forEach(function (line) {
      checkStr.forEach(function (checkS) {
        if (line.toUpperCase().includes(checkS.toUpperCase())) {
          outputStr = outputStr + line + "\n";
          //console.log(line);
        }
      })
    })
    download(outputStr, 'Cropped.txt', 'text/plain');

  }

  // Allows downloading file
  function download(data, filename, type) {

    var file = new Blob([data], {
      type: type
    });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }

  }

}