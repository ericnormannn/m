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

     $('.recalc').click(function(){
            $('.calculate-results').fadeOut().hide();
            $('.calculator form').addClass('enter-left').show();


     });

    $('.sign-up').click(function(){
        $('.sign-up-form').show();
    });

    $( ".launch-vid" ).hover(function(){
        $(this).find( "span, h4" ).addClass('is-hover');
    },
        function () {
           $(this).find("span, h4").removeClass('is-hover');
    });


    $('.modal').hide();

    $('.page-hero .sign-up').click(function(){
        $('#cta .sign-up').hide();
    });

    $('#cta .sign-up').click(function(){
        $(this).fadeOut(1000).hide();
    });

    $('.launch-vid').click(function(){
        $('main').fadeOut(500);
        $('.vid-contain').fadeIn(700).addClass('enter-up');
        $('.modal').fadeIn(600).show();
    });

    $('.close').click(function(){
        $('.modal').fadeOut().hide();
        $('main').fadeIn();
        $('.vid-contain').removeClass('enter-up');
        
    });

    $('.close').click(function() {
       vimeoWrap = $('#vimeoWrap');
       vimeoWrap.html( vimeoWrap.html() );
    });


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

    $("ul.tabs li, .services ul li").click(function() {
        if(!$(this).hasClass('active')){
            $(".tab_content").hide();
            $('.slider').hide();
            $('.tabs_container').fadeIn();
            $('.animated .fadeOutDown').removeClass('animated enter-right');
            var activeTab = $(this).attr("rel"); 
            $("#"+activeTab).fadeIn(100).addClass('animated enter-right');        
            clearTimeout(interval);
            $("ul.tabs li").removeClass("active first_active");
            $(this).addClass("active");
        }
    });

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


    







new WOW().init();