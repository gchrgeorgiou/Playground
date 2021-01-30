/*global $, ace, console*/
$('document').ready(function () {
    var formObject = {
        schema: {
            example: {
                title: 'JSON Form example to start from',
                type: 'string',
                'enum': [
                    'diagram'
                ],
                'default': 'diagram'
            },
            greatform: {
                title: 'JSON Form object to render',
                type: 'string'
            }
        },
        form: [
            {
                key: 'example',
                notitle: true,
                prepend: 'You are viewing',
                htmlClass: 'trywith',
                titleMap: {
                    'diagram': 'DaaS Service'
                },
                onChange: function (evt) {
                    var selected = $(evt.target).val();

                    loadExample(selected);
                    if (history) history.pushState(
                        { example: selected },
                        'Example - ' + selected,
                        '?build=' + selected);
                }
            },
            {
                key: 'greatform',
                type: 'ace',
                aceMode: 'json',
                width: '100%',
                height: '' + (window.innerHeight - 140) + 'px',
                notitle: true,
                onChange: function () {
                    generateForm();
                }
            }
        ]
    };


    /**
     * Extracts a potential form to load from query string
     */
    var getRequestedExample = function () {
        return 'diagram';
    };

    /**
     * Loads and displays the example identified by the given name
     */
    var loadExample = function (example) {
        $.ajax({
            url: 'examples/' + example + '.json',
            dataType: 'text'
        }).done(function (code) {
            var aceId = $('#form .ace_editor').attr('id');
            var editor = ace.edit(aceId);
            editor.getSession().setValue(code);
        }).fail(function () {
            $('#result').html('Sorry, I could not retrieve the example!');
        });
    };


    /**
     * Displays the form entered by the user
     * (this function runs whenever once per second whenever the user
     * changes the contents of the ACE input field)
     */
    var generateForm = function () {
        var values = $('#form').jsonFormValue();

        // Reset result pane
        $('#result').html('');

        // Parse entered content as JavaScript
        // (mostly JSON but functions are possible)
        var createdForm = null;
        try {
            // Most examples should be written in pure JSON,
            // but playground is helpful to check behaviors too!
            eval('createdForm=' + values.greatform);
        }
        catch (e) {
            $('#result').html('<pre>Entered content is not yet a valid' +
                ' JSON Form object.\n\nJavaScript parser returned:\n' +
                e + '</pre>');
            return;
        }

        // Render the resulting form, binding to onSubmitValid
        try {
            createdForm.onSubmitValid = function (values) {
                if (console && console.log) {
                    console.log('Values extracted from submitted form', values);
                }
                var formatted = JSON.stringify(values, null, 2);
                $('#resultjson').html(formatted);
                //window.alert(JSON.stringify(values, null, 2));
            };
            createdForm.onSubmit = function (errors, values) {
                if (errors) {
                    console.log('Validation errors', errors);
                    return false;
                }
                return true;
            };
            $('#result').html('<form id="result-form" class="form-vertical"></form>');
            $('#result-form').jsonForm(createdForm);
        }
        catch (e) {
            $('#result').html('<pre>Entered content is not yet a valid' +
                ' JSON Form object.\n\nThe JSON Form library returned:\n' +
                e + '</pre>');
            return;
        }
    };

    // Render the form
    $('#form').jsonForm(formObject);

    // Wait until ACE is loaded
    var itv = window.setInterval(function () {
        var example = 'diagram';
        if (window.ace) {
            window.clearInterval(itv);
            loadExample(example);
        }
    }, 1000);
});
