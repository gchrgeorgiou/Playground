(function ($) {
    'use strict';

    /*[ Wizard Config ]
        ===========================================================*/
    
    try {
        var $validator = $("#js-wizard-form").validate({
            rules: {
                username: {
                    required: true,
                    minlength: 3
                },
                
                customChartTitle: {
                    required: true,
                    minlength: 5
                }
            },
            customChartTitle: {
                title: {
                    required: "Enter a title"
                }                
            }
        });
    
        $("#js-wizard-form").bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn--next',
            'onNext': function(tab, navigation, index) {
                var $valid = $("#js-wizard-form").valid();
                //if(!$valid) {
                    //$validator.focusInvalid();
                    //return false;
                //}
            },
            'onTabClick': function (tab, navigation, index) {
                var $valid = $("#js-wizard-form").valid();
                //if(!$valid) {
                  //  $validator.focusInvalid();
                    //return false;
                //}
            }
    
        });
    
    }
    catch (e) {
        console.log(e)
    }

})(jQuery);