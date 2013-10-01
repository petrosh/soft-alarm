$(document).ready(function(){ // jquery version 1.10.1
	
	// define favico
	var favicon=new Favico({
    	type : 'rectangle'
	});
	
	// return Array ( Settings, Current timers )
	var softAlarm = init();
	var settings = softAlarm[0];
	var current = softAlarm[1];
	var badges = 0;
	
	loop(current);

	function loop(current){
		for ( var i in current ) {
			var id = current[i]['id'];
			var string = current[i]['string'];
			$('#clocks').prepend('<div><time>' + string + '</time> ' + id + '</div>');
		};
		$('time').countDown();
		$('time').on('time.elapsed', function () {
			liftOff(this);
		});
		return true;
	}

	// jquery.countdown
/* 	$('body').append('<div><time></time></div>');
	var identifier=6;
	$('time').countdown({
		until: +5,
		onExpiry: function endCount() {
			liftOff(identifier);
		},
		format: 'DHMS',
		compact: true
	});
	 */
	function liftOff(e) {
		
		// get settings
		var param = settings[0]['param'];
		
		// target element
		//var div = '#' + id;
		$( e ).css('color', 'red');
		
		// badges
		badges = badges + 1;
		favicon.badge( badges );
		
		// check sound settings
		if( param == 0 ){
			console.log(e);
		}else{
			var soundHandle = $('#soundHandle');
			console.log(e)
			soundHandle.attr('src', settings[ param ][ 'file' ]);
			soundHandle.get(0).play();
		}
	};

});

function init(){
	
	// Check localStorage support
	
	if (!store.enabled) {
		alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser');
		return;
    }

	// Check current timers
	
    var current = store.get('SAcurrent');
	if( typeof current == 'undefined' ){
		// Set default timers as current (sorted array of objects)
		var data = [
			{id: 'miao', string: '2013-10-01 19:21:22'},
			{id: 'cairo', string: '00:00:10'},
			{id: 'istambul', string: '00:01'}
		];
		store.set('SAcurrent',data);
	}
	
	// Check settings
	
    var settings = store.get('SAsettings');
	if( typeof settings == 'undefined' ){
		// Set default settings
		var data = [
			{sound: 0, param: 1},
			{sound: 1, file: 'lib/08 Communicator Beeps.mp3'},
			{sound: 2, file: ''}
		];
		store.set('SAsettings',data);
	}
	
	return Array( store.get('SAsettings'), store.get('SAcurrent') );

}
