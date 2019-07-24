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
	var img   = new Image();
	if (query) {
		console.log('f/' + query);
		img.src = 'f/' + query;
		img.id  = 'uploaded';
		document.body.appendChild(img);
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
