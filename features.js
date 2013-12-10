define(['jquery'], function($) {

    return {
        can_touch: (!!('ontouchstart' in window) || !!('onmsgesturechange' in window) ? true : false)
    };

});