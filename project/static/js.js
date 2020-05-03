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
                    let data = out[i].toString();
                    data = data.split(',').join(', ');
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

    $(document).on('input', '#cityName', function (e) {
        e.preventDefault();

        let name = $('#cityName').val();

        searchCities(name);

    });

    $(document).on('click', '.searchRes', function (e) {
        // alert($(this).text());
        let btn = $(this);
        btn.animate({height: '300px', opacity: '0.4'}, "slow");
        btn.animate({width: '300px', opacity: '0.8'}, "slow");
    });

});