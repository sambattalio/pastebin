function S3Upload(file) {
	$.ajax({
		url: 'https://wai3srveb7.execute-api.us-east-1.amazonaws.com/api',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify({
			'type': file['type']
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
					window.location.href = 'images/' + result['name'];   
				}
			});
		}
	});

}

function button_upload(ev) {
  S3Upload(ev.target.files[0]);
}


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
