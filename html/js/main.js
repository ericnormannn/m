var ESPN = (function($) {

	var init = function() {
	
		// category select hover
		$('.category-select a').on("mouseover click", categoryListItem);

		// programs functionality
		if(typeof Programs !== 'undefined') 
			Programs.init();

		// schedule functionality
		if(typeof Schedule !== 'undefined') 
			Schedule.init();

		// categories functionality
		if(typeof Categories !== 'undefined') 
			Categories.init();

		// modal functionality
		if(typeof Modal !== 'undefined') 
			Modal.init();

		// locations functionality
		// if(typeof Locations !== 'undefined') 
		// 	Locations.init();

		// set backgrounds with data attribute
		$('.set-background').each(function(index) {

			$(this).css({ 'background-image':'url(' + $(this).data('background') + ')' });

		});

		// preload hero images
		$('.hero-bg').fadeOut(0);
		preloadHero();

	};

	var categoryListItem = function() {

		// toggle active classes
		$('.category-select a').removeClass('active');
		$(this).addClass('active');

		// set count and link
		$('#show-total').html($(this).data('total') + " PROPERTIES");
		$('#show-link').attr("href", $(this).data('link'));

	};

	var toggleSearch = function() {

		$('body').toggleClass('search-active');

	};

	var scrollTo = function(id) {
		
		// Stop any currently active scroll
		$('html, body').dequeue();
		// Scroll to #id offset by 90 pixels
		$('html, body').animate({ scrollTop: $(id).offset().top-60 }, 1000, 'easeOutExpo');
	
	};

	var preloadHero = function() {

		// check to see if hero-bg exists
		if(!$('.hero-bg')[0]) return false;

		// create blank image object
		var imgLoad = new Image();

		// load image + fade in container
		$(imgLoad).load(function() {
			
			$('.hero-bg').fadeIn(250);

		}).attr('src', $('.hero-bg').data('background'));

	}

	var loginAuth = function(urlAuth) {

		 $.ajax({
            type: "POST",
            url: urlAuth + '/login-check.php',
            data: $('#login').serialize(),
            success: function (data) {
                
                if(data.length === 0) {

					$('#login-success').html('<span>INVALID PASSWORD - PLEASE TRY AGAIN!</span>');

                } else {

                	$('#login-success').html('<span>YOU HAVE BEEN LOGGED IN SUCCESSFULLY!</span>');
					setTimeout(function() {
						window.location.reload(true); 
					}, 1500);

                }
				
            },
            error: function(data) {
            	$('#login-success').html('<span>SOMETHING WENT WRONG - PLEASE TRY AGAIN!</span>');
            }
        });
	};

	var loginReq = function(urlReq) {

		// check for valid email address
		var re = /\S+@\S+\.\S+/;

		if(!re.test($('#email-address').val())) {
			$('#request-success').html('<span>PLEASE PROVIDE A VALID EMAIL ADDRESS!</span>');
			return false;
		}

		// process ajax 
		 $.ajax({
            type: "POST",
            url: urlReq + '/login-req.php',
            data: $('#request').serialize(),
            success: function (data) {
                $('#request-success').html('<span>PLEASE CHECK YOUR EMAIL FOR A PASSWORD!</span>');
                $('#email-address').val('EMAIL ADDRESS');
            },
            error: function(data) {
            	$('#request-success').html('<span>SOMETHING WENT WRONG - PLEASE TRY AGAIN LATER!</span>');
            }
        });
	};   
	
	return {
		init: init,
		scrollTo: scrollTo,
		toggleSearch: toggleSearch,
		preloadHero: preloadHero,
		loginAuth: loginAuth,
		loginReq: loginReq
	};


}(jQuery));

$(function() {
	ESPN.init();
});

$(document).ready(function(){
	      // $('.datepicker').Zebra_DatePicker({direction: 1, pair: $('.datepicker2'),always_visible: $('#zebracontainer1')});
	      // 	$('#datepickbox1').bind('click',function(){
	      // 	$('.searchslide').addClass('active');
	      // 	$('#zebracontainer1').addClass('active');	
	      // });
		
		$('.datepicker').Zebra_DatePicker({direction: true, pair: $('datepicker2'), always_visible: $('#zebracontainer1')});

	     $('.datepicker').on('click', function(event){
	     	$(this).find('.searchslide').addClass('active');
		    $('#zebracontainer1').addClass('active');
		 });

		 $('.datepicker2').Zebra_DatePicker({direction: 1, always_visible: $('#zebracontainer2')});

	     $('.datepicker2').on('click', function(event){
	     	$(this).find('.searchslide').addClass('active');
		    $('#zebracontainer2').addClass('active');
		 });	     	
      
      	$('.dp_daypicker, .dp_footer').bind('click',function(){
      	$('.searchslide').removeClass('active');
      	$('.zbc').removeClass('active');
		});

		$('.select-time').on('click','.placeholder',function(){
		  var parent = $(this).closest('.select-time');
		  if ( ! parent.hasClass('is-open')){
		    parent.addClass('is-open');
		    $('.select-.is-open').not(parent).removeClass('is-open');
		  }else{
		    parent.removeClass('is-open');
		  }
		}).on('click','ul>li',function(){
		  var parent = $(this).closest('.select-time');
		  parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
		  parent.find('.placeholder').addClass('is-selected');
		  parent.find('input[type=hidden]').attr('value', $(this).attr('data-value') );
		});


});

