$(document).ready(function () {

    $(document).on('submit', '#cityForm', function (e) {
        e.preventDefault();


    });

    $(document).on('input', '#cityName', function (e) {
        e.preventDefault();

        let name = $('#cityName').val();

        $.ajax({
            url: '/get_user_info',
            type: 'POST',
            data: {name: name},
            dataType: 'json',
            success: function (r) {
                $('#searchResult').empty();
                out = r.result;
                for (i in out) {
                    $('#searchResult').append("<div class='columns'><div class='box searchRes'>" + out[i] + "</div></div>");
                }

                value = $('#cityName').val();
                if (value === '') {
                    $('#searchResult').empty();
                }
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });

    });

});