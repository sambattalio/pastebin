function S3Upload(file) {
	$.ajax({
		url: 'https://1znlhxx5lb.execute-api.us-east-1.amazonaws.com/api/',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify({
			'type': file['type'],
			'name': file['name']
		}),
		success: function(result) {
			console.log(result);
			$.ajax({
				type: 'PUT',
				url: result['url'],
				contentType: file['type'],
				processData: false,
				data: file,
				success: function() {
					window.location.href = '?' + result['name'];   
				}
			});
		}
	});

}

function button_upload(ev) {
  S3Upload(ev.target.files[0]);
}

function get_query() {
  var query = window.location.search.substring(1);
  var file_location = 'f/' + query;
  // Handle Images
  if (query.endsWith("jpg") || query.endsWith("jpeg") || query.endsWith("png")) {
    var img   = new Image();
    if (query) {
      console.log(file_location);
      img.src = file_location;
      img.id  = 'uploaded';
      document.body.appendChild(img);
      return true;
    }
  } else {
    // Assume it is text of some kind
    fetch(file_location)
      .then(response => response.text())
      .then(text => {
        console.log(text);
        var newDiv = document.createElement("div"); 
        newDiv.style = "white-space: pre-wrap";
        var newContent = document.createTextNode(text); 
        newDiv.appendChild(newContent);
        document.body.appendChild(newDiv);
      })
    return true;
  }
	return false;
}
window.onload = function() {
	if (get_query()) {
		$('#box').remove();
		$('#button').remove();
	}
};

window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);

function dragover_handler(ev) {
  ev.preventDefault();
}
window.doDrop = function(ev) {
    console.log('uploading');
    var dti = ev.dataTransfer.files;
    if (dti === undefined) {
      console.log("DataTransferItem NOT supported.");
      console.log("DataTransferItemList NOT supported.");
    } else {
      console.log(dti[0].type);
      S3Upload(dti[0]);
    }
}
