$(document).ready(function(){
	
	// jquery
	console.log('jquery version '+$().jquery);
	
	// moment
	console.log(moment().format());
	
	// favico
	var favicon=new Favico({
    	type : 'rectangle',
		animation:'slide'
	});

	// jquery.countdown
	$('body').append('<div><time>00:01</time></div>');
	$('time').countDown({
		with_separators: true
	});
    $('time').on('time.elapsed', function () {
		favicon.badge(1);
        var soundHandle = $('#soundHandle');
        soundHandle.attr('src','lib/08 Communicator Beeps.mp3');
        soundHandle.get(0).play();
    });
	
	// store+json2
	store.set('tags', ['javascript', 'localStorage', 'store.js'])
	console.log("We've got " + store.get('tags').length + " tags here")

});