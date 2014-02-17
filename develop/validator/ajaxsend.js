
$('form').submit(function(event) {
	
	event.preventDefault();
	
		
	
	//ez árulja el a kiszolgálónak, h ajaxot haszálunk
	$('input[name="usingAJAX"]', this).val('true');
	
	//var this = $(this);
	
	var url = $(this).attr('action');
	var dataToSend = $this.serialize();
	
	var callback = function(datarecived) {
		$this.hide();
		$('body').append(datarecived);
		
	};
	
	//html-ben várjuk vissza az adatot
	var typeOfDataToRecive = 'html';
	
	$get( url, dataToSend, callback, typeOfDataToRecive);
	
});
