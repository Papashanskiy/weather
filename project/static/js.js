$(document).ready(function () {

    let value = $('#cityName').val();
    if (value !== '') {
        searchCities(value);
    }

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    function searchCities (name) {
        const url = '/api/get_user_info';
        $.ajax({
            url: url,
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
                    $('#searchResult').append("<div class='columns'><div class='box searchRes' idcity='" + out[i][0] + "'>" + data + "</div></div>");
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

    function addToWeatherList(city, country, iconId, descript, temp, feels, min, max, windSpeed, windDeg) {
        let card = "\n" +
            "        <div class=\"columns is-multiline\">\n" +
            "            <div class=\"column is-full\">\n" +
            "                <div class=\"columns is-full\" style=\"width: 450px;\">\n" +
            "                    <div class=\"column\" style=\"text-align: center;\">\n" +
            "                        <img src=\"http://openweathermap.org/img/wn/" + iconId + "@2x.png\" style=\"width: 133px; top: -25px; position: relative;\"/>\n" +
            "                        <p style=\"top: -45px; position: relative;\">" + descript.capitalize() + "</p>\n" +
            "                    </div>\n" +
            "                    <div class=\"column\" style=\"text-align: center; font-size: 20px;\">\n" +
            "                        <p style=\"font-size: 30px\">" + temp + " &#8451;</p>\n" +
            "                        <p class=\"help\">Feels like " + feels + " &#8451;</p>\n" +
            "                        <p style=\"margin-top: 20px; font-size: 15px;\">\n" +
            "                            <img src=\"/static/wind.png\" style=\"width: 25px\">\n" +
            "                            " + windSpeed + " km/h " + windDeg + "&#176;\n" +
            "                        </p>\n" +
            "                    </div>\n" +
            "                    <div class=\"column is-one-fifth\">\n" +
            "                        <p style=\"color: orange;\">" + max + "</p>\n" +
            "                        <p style=\"color: dodgerblue\">" + min + "</p>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"column if-full\">\n" +
            "                <p style=\"font-size: 30px; position: relative; top: -55px; left: 30px;\">" + city + " " + country + "</p>\n" +
            "            </div>\n" +
            "        </div>";
        $("#weatherCard").append(card);
    }

    function getWeatherById(id) {
        const url = '/api/get_weather_by_id';
        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            data: {id: id},
            success: function (r) {
                result = JSON.parse(r.result);
                addToWeatherList(
                    city=result.name, country=result.sys.country, iconId=result.weather[0].icon,
                    descript=result.weather[0].description, temp=result.main.temp, feels=result.main.feels_like,
                    min=result.main.temp_min, max=result.main.temp_max, windSpeed=result.wind.speed,
                    windDeg=result.wind.deg
                    );
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
    }

    $(document).on('submit', '#cityForm', function (e) {
        e.preventDefault();
    });

    $(document).on('mousedown', '.searchRes', function () {
        $(this).animate({boxShadow: 'inset 2px 2px 2px'}, 'fast');

        let id = $(this).attr('idcity');
        getWeatherById(id);
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

    $('html').bind('keypress', function(e) {
       if(e.keyCode == 13) {
          return false;
       }
    });

});
