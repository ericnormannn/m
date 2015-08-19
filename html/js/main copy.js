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

    $("#result1").text(formatMoney(result1, 0));
    $("#result2").text(formatMoney(result2, 0));
    $("#result3").text(formatMoney(result3, 0));
    
}

(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
})(jQuery);

jQuery(function($) {
        $('.timer').countTo({
            from: 50,
            to: 2500,
            speed: 1000,
            refreshInterval: 50,
            onComplete: function(value) {
                console.debug(this);
            }
        });
    });


$(document).ready(function(){

    $('.button').click(function(){
           updateResults();
    });

    $('.sign-up-form').hide();

    $('.sign-up').click(function(){
        $('.sign-up-form').show();
    });

});