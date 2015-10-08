function sanitizeValue(value) {
  return value.replace(/[^\d\.]/g, '');
}

function percentageize(value) {
  return value < 1 ? value : value / 100;
}

function addCommas(n) {
  return formatMoney(n, 0, undefined, undefined, '');
}

function formatMoney(n, decPlaces, thouSeparator, decSeparator, currencySymbol) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSeparator = decSeparator == undefined ? "." : decSeparator,
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
    currencySymbol = currencySymbol == undefined ? "$" : currencySymbol,
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + currencySymbol + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
}

function updateResults() {
  var stipend = sanitizeValue($("input[name=stipend]").val()),
        employees = sanitizeValue($("input[name=employees]").val()),
        result1 = (stipend*employees*'12');
        result2 = ('0.3'*stipend+24.99)*employees*'12';
        result3 = (result1-result2);

    $("#result1").fadeIn().text(formatMoney(result1, 0));
    $("#result2").text(formatMoney(result2, 0));
    $("#result3").text(formatMoney(result3, 0));
    
}

$(document).ready(function(){
    $('.sign-up-form, .calculate-results').hide();

    $('.button').click(function(){
           $('.calculator form').fadeOut();
           updateResults();
           $('.calculate-results').fadeIn(2000);
           $('.calculator form').removeClass('exit-left enter-left');
           
    });


  $('.client-control-next, .client-control-prev').click(function() {
  
    var $this = $(this),
        curActiveClient = $('.clients-belt').find('.active-client'),
        position = $('.clients-belt').children().index(curActiveClient),
        clientNum = $('.client-unit').length;
        
      if($this.hasClass('client-control-next')) {
        
        if(position < clientNum -1){
          $('.active-client').removeClass('active-client').next().addClass('active-client');
        } else {
          $('.client-unit').removeClass('active-client').first().addClass('active-client');
          $('.client-logo').removeClass('active-client').first().addClass('active-client');
        }
        
      } else {
        
        if (position === 0) {
          $('.client-unit').removeClass('active-client').last().addClass('active-client');
          $('.client-logo').removeClass('active-client').last().addClass('active-client');
        } else {
          $('.active-client').removeClass('active-client').prev().addClass('active-client');  
        }

      }      
  
  });

  $('.clients-mobile-nav span').first().addClass('active-client');


  $('.client-logo, .clients-mobile-nav span').click(function() {
    var $this = $(this),
        $siblings = $this.parent().children(),
        position = $siblings.index($this);
        
    $('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
    $siblings.removeClass('active-client');
    $this.addClass('active-client');
  });



     $('.recalc').click(function(){
            $('.calculate-results').fadeOut().hide();
            $('.calculator form').addClass('enter-left').show();


     });

    $('.sign-up').click(function(){
        $('.sign-up-form').show();
    });

    $('.modal').hide();

    $('.page-hero .sign-up').click(function(){
        $('#cta .sign-up').hide();
    });

    $('#cta .sign-up').click(function(){
        $(this).fadeOut(1000).hide();
    });

    $('.launch-vid').click(function(){
        $('.scotch-panel-wrapper').addClass('full-height');
        $('main').fadeOut(500);
        $('.vid-contain').fadeIn(700).addClass('enter-up is-visible').show();
        $('.modal').fadeIn(600).show();
    });

    $('.close').click(function(){
        $('.modal').fadeOut().hide();
        $('main').fadeIn();
        $('.vid-contain').removeClass('enter-up');
        $('.scotch-panel-wrapper').removeClass('full-height');
        
    });

    $('.close').click(function() {
       vimeoWrap = $('#vimeoWrap');
       vimeoWrap.html( vimeoWrap.html() );
    });

    $('.contact-details').hide();

    $('.location-item').click(function() {
        $(this).find('h4').hide();
        $(this).find('.contact-details').show();
    });

    $('.exit').click(function() {
        $(this).find('h4').show();
        $(this).find('.contact-details').hide();
    });




    // $('.location-item').click(function() {
    //     $(this).find('h4').hide();
    //     $(this).find('.contact-details').show();
    //     $('.contact-details p').addClass('fadeInUp');

    // },
    //     function () {
    //        $(this).find('.contact-details').hide();
    //        $(this).find('.contact-details p').removeClass('fadeInUp');
    //        $(this).find('h4').show();
    // });



    var tabContent = $('.tab_content');
    tabContent.hide();
    tabContent.first().show();
    var currentTab = tabContent.first();
    var interval;

    //autoplay Services Tabs

    // $("ul.tabs").find('li:first').addClass('active');

    // $("ul.tabs li, .services ul li").click(function() {
    //     if(!$(this).hasClass('active')){
    //         $(".tab_content").hide();
    //         $('.slider').hide();
    //         $('.tabs_container').fadeIn();
    //         $('.animated .fadeOutDown').removeClass('animated enter-right');
    //         var activeTab = $(this).attr("rel"); 
    //         $("#"+activeTab).fadeIn(100).addClass('animated enter-right');        
    //         clearTimeout(interval);
    //         $("ul.tabs li").removeClass("active first_active");
    //         $(this).addClass("active");
    //     }
    // });

    $("ul.tabs").find('li:first').addClass('active');

    $("ul.tabs li").click(function() {
        if(!$(this).hasClass('active')){
            $(".tab_content").hide();
            $('.slider').hide();
            $('.tabs_container').fadeIn();
            $('.animated .fadeOutDown').removeClass('animated fadeIn');
            var activeTab = $(this).attr("rel"); 
            $("#"+activeTab).fadeIn(100).addClass('animated fadeIn');        
            clearTimeout(interval);
            $("ul.tabs li").removeClass("active first_active");
            $(this).addClass("active");
        }
    });


    var nav = $('.subBar');
    if (nav.length) {
        var fixmeTop = nav.offset().top -72;
        $(window).scroll(function () {
            var currentScroll = $(window).scrollTop();
            if (currentScroll >= fixmeTop) {
                $('.subBar').addClass('animated enter-down');
                $('.subBar').removeClass('animated exit-up');
                $('.subBar').css({
                    visibility: 'visible',
                    position: 'fixed',
                    top: '0',
                    opacity: '1'
                });
            } else {
                $('.subBar').removeClass('animated enter-down');
                $('.subBar').addClass('animated exit-up');
                $('.subBar').css({
                    visibility: 'hidden',
                    position: 'absolute'
                });
            }
        });
    };

    $(function() {
      $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 500);
                return false;
              }
            }
        });
    });  

});

jQuery(document).ready(function($){
    //hide the subtle gradient layer (.pricing-list > li::after) when pricing table has been scrolled to the end (mobile version only)
    checkScrolling($('.pricing-body'));
    $(window).on('resize', function(){
        window.requestAnimationFrame(function(){checkScrolling($('.pricing-body'))});
    });
    $('.pricing-body').on('scroll', function(){ 
        var selected = $(this);
        window.requestAnimationFrame(function(){checkScrolling(selected)});
    });

    function checkScrolling(tables){
        tables.each(function(){
            var table= $(this),
                totalTableWidth = parseInt(table.children('.pricing-features').width()),
                tableViewport = parseInt(table.width());
            if( table.scrollLeft() >= totalTableWidth - tableViewport -1 ) {
                table.parent('li').addClass('is-ended');
            } else {
                table.parent('li').removeClass('is-ended');
            }
        });
    }

    //switch from monthly to annual pricing tables
    bouncy_filter($('.pricing-container'));

    function bouncy_filter(container) {
        container.each(function(){
            var pricing_table = $(this);
            var filter_list_container = pricing_table.children('.pricing-switcher'),
                filter_radios = filter_list_container.find('input[type="radio"]'),
                pricing_table_wrapper = pricing_table.find('.pricing-wrapper');

            //store pricing table items
            var table_elements = {};
            filter_radios.each(function(){
                var filter_type = $(this).val();
                table_elements[filter_type] = pricing_table_wrapper.find('li[data-type="'+filter_type+'"]');
            });

            //detect input change event
            filter_radios.on('change', function(event){
                event.preventDefault();
                //detect which radio input item was checked
                var selected_filter = $(event.target).val();

                //give higher z-index to the pricing table items selected by the radio input
                show_selected_items(table_elements[selected_filter]);

                //rotate each pricing-wrapper 
                //at the end of the animation hide the not-selected pricing tables and rotate back the .pricing-wrapper
                
                if( !Modernizr.cssanimations ) {
                    hide_not_selected_items(table_elements, selected_filter);
                    pricing_table_wrapper.removeClass('is-switched');
                } else {
                    pricing_table_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {        
                        hide_not_selected_items(table_elements, selected_filter);
                        pricing_table_wrapper.removeClass('is-switched');
                        //change rotation direction if .pricing-list has the .bounce-invert class
                        if(pricing_table.find('.pricing-list').hasClass('bounce-invert')) pricing_table_wrapper.toggleClass('reverse-animation');
                    });
                }
            });
        });
    }
    function show_selected_items(selected_elements) {
        selected_elements.addClass('is-selected');
    }

    function hide_not_selected_items(table_containers, filter) {
        $.each(table_containers, function(key, value){
            if ( key != filter ) {  
                $(this).removeClass('is-visible is-selected').addClass('is-hidden');

            } else {
                $(this).addClass('is-visible').removeClass('is-hidden is-selected');
            }
        });
    }
});


    







new WOW().init();