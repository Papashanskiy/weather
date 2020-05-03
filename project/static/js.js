$(document).ready(function () {

    let value = $('#cityName').val();
    if (value !== '') {
        searchCities(value);
    }

    function searchCities (name) {
        $.ajax({
            url: '/get_user_info',
            type: 'POST',
            data: {name: name},
            dataType: 'json',
            success: function (r) {
                $('#searchResult').empty();
                $('#searchResult').children().fadeOut(500, function () {
                    $('#searchResult').empty();
                });

                let out = r.result;
                for (let i in out) {
                    // let data = out[i].toString();
                    // data = data.split(',').join(', ');
                    let data = out[i][1] + " " + out[i][2] + " " + out[i][3];
                    $('#searchResult').append("<div class='columns'><div class='box searchRes'>" + data + "</div></div>");
                }

                let value = $('#cityName').val();
                if (value === '') {
                    $('#searchResult').empty();
                }
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
    }

    $(document).on('submit', '#cityForm', function (e) {
        e.preventDefault();
    });

    /* $(document).on('input', '#cityName', function (e) {
        e.preventDefault();

        let name = $('#cityName').val();

        if (name !== '') searchCities(name);

    }); */

    $(document).on('mousedown', '.searchRes', function () {
        $(this).animate({boxShadow: 'inset 2px 2px 2px'}, 'fast');
    });

    $(document).on('mouseup', '.searchRes', function () {
        $(this)
            .delay(100)
            .queue(function () {
                // $(this).css('box-shadow', '0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.02)');
                $(this).css('box-shadow', '');
                $(this).dequeue();
            });
    });

    let timeout = null;
    $(document).on('keyup', '#cityName', function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            let name = $('#cityName').val();
            if (name !== '') searchCities(name);
        }, 1000);
    });

});
