jQuery(document).ready(function($){
	var isLateralNavAnimating = false;


	$('.cd-primary-nav li').click( function(){
    if ( $(this).hasClass('active') ) {
    	$(this).removeClass('active').find('a').removeClass('active');
    	$(this).find('.sub-nav').hide();
        $(this).find('.sub-nav li').removeClass('is-visible enter-left').addClass('fadeOutDown');

    } else {
    	$('.cd-primary-nav li:first-of-type a').removeClass('active');  
        $(this).addClass('active').find('a').addClass('active');
        $(this).find('.sub-nav').show();
        $(this).find('.sub-nav li').addClass('is-visible enter-left').removeClass('fadeOutDown');
        //remove .hidden up in here 
    }
});


	$(document).on("click", function(e){
	    var $navItem = $(".cd-primary-nav li");
	    if($navItem !== event.target && !$navItem.has(event.target).length){
	        $(this).find('a').removeClass('active');
	        $(this).find('.sub-nav li').removeClass('is-visible enter-left').addClass('fadeOutDown');
	        $(this).find('.sub-nav').hide();
	    }            
	});

    var tabContent = $('.tab_content');
    tabContent.hide();
    tabContent.first().show();
    var currentTab = tabContent.first();
    var interval;
  
    //autoplay Services Tabs

    $("ul.tabs").find('li:first').addClass('active');

    $("ul.tabs li, .services ul li").click(function() {
        if(!$(this).hasClass('active')){
            $(".tab_content").hide();
            $('.slider').hide();
            $('.tabs_container').fadeIn();
            $('.animated .fadeOutDown').removeClass('animated fadeOutDown');
            var activeTab = $(this).attr("rel"); 
            $("#"+activeTab).fadeIn(100).addClass('animated enter-left');        
            clearTimeout(interval);
            $("ul.tabs li").removeClass("active first_active");
            $(this).addClass("active");
        }
    });

	new WOW().init();
    
});	
