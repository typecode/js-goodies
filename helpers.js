define(['jquery'], function($) {

    var scrollbar_width = null;

    return {
        get_scrollbar_width: function() {
            var inner, outer, w1, w2;

            if (typeof scrollbar_width == 'number') {
                return scrollbar_width;
            }

            inner = document.createElement('p');
            inner.style.width = '100%';
            inner.style.height = '200px';

            outer = document.createElement('div');
            outer.style.position = 'absolute';
            outer.style.top = '0px';
            outer.style.left = '0px';
            outer.style.visibility = 'hidden';
            outer.style.width = '200px';
            outer.style.height = '150px';
            outer.style.overflow = 'hidden';
            outer.appendChild(inner);

            document.body.appendChild(outer);
            w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            w2 = inner.offsetWidth;
            if (w1 == w2) {
                w2 = outer.clientWidth;
            }

            document.body.removeChild(outer);
            
            scrollbar_width = w1 - w2;
            return scrollbar_width;
        },
        reflow: function(delay) {
            if (!delay) {
                delay = 100;
            }
            var reflow_timeout = setTimeout(function() {
                var $body = $('body');
                $body.css('display', 'none');
                $(window).scrollTop();
                $body.css('display', '');
            }, delay);
        },
        once_visible: function($e, func) {
            var max_attempts  = 60; // number of tries before just running func
            var attempt_delay = 20; // milliseconds of first delay, gets longer every attempt
            var attempt_count = 0;  // internal counter
            function _test_visibility() {
                if ($e.is(':visible') || attempt_count > max_attempts) {
                    func();
                    return;
                }
                attempt_count++;
                attempt_delay = attempt_delay + 5;
                setTimeout(_test_visibility, attempt_delay);
            }
            _test_visibility();
        }
    };

});