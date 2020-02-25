const key = "6c427e9502046eb2009affa9ab9a0d21"  //API key
$("#search").on("click", function(event){   //initilization function
    if (!$("#cards").html("")){ //removes duplicates of 5-day forecasts
        event.preventDefault()
        return
    }else{
    event.preventDefault()
        var city = $("#cityInput").val().toLowerCase().trim();
        var qeuryUrlDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key
        var search = city
        localStorage.setItem(search, search)    // storing search history data (local storage)
        $.ajax({
            url: qeuryUrlDay,   //ajax call
            method: "GET"
        })
        .then(start)
    }
    function start(response){
        if(response != undefined){
            searchHistory() //search history function
            check5Day() //5-day forecast function
            $("#container-right-upper").show()
            $("#container-right-lower").show()  //
            data = response;
            console.log(data)
            var iconRef = data.weather[0].icon
            var tempC = data.main.temp;
            var temp = ((tempC * 9) / (5 + 32)).toFixed(1)  //grabing weather data
            var humid = data.main.humidity
            var name = data.name
            var wind = data.wind.speed
            var d = new Date()
            date = String(d).slice(4,15)//grabbing today's date

            $("#nameDate-Today").html(name  + " (" + date + ")" + "<img src='" + "http://openweathermap.org/img/wn/" + iconRef + "@2x.png" + "'" + " alt='Weather icon'>" +"<hr id='top'>" )//creating full date and corresponding weather icon
            $("#humidity").attr("class", "text-Style").text("Humidity: " + humid + "%")//humidity
            $("#temp").attr("class", "text-Style").text("Temperature: " + temp + " F°")//temperature
            $("#wind").attr("class", "text-Style").text("Wind Speed: " + wind + "MPH")//wind
    
        }
        else{
            console.log("error")
            return
        }
    }


    $(document).on("click", "#history", function(event){ //new API call based off of users search history
        event.preventDefault()
        $("#container-right").empty
        var city = $(this).text();
        var qeuryUrlDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key
        $.ajax({
            url: qeuryUrlDay,
            method: "GET"
        })
        .then(start)
    })

     function check5Day(){
        var qeuryUrl5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key
         $.ajax({
            url: qeuryUrl5Day,
            method: "GET"
         }).then(function(response){
             $("#cards").empty()
             console.log(response)
             var j = 0;
             var d = new Date()//creating a new date for today
             var date = (String(d).slice(8,10))//getting today's date
             day = parseInt(date)
             for(var i = 0; i < response.list.length; i += 8){
                var iconRef = response.list[i].weather[0].icon //grabbing 5-day forecast weather data
                var humid = response.list[i].main.humidity + "%"
                var tempC = response.list[i].main.temp 
                var temp = ((tempC * 9) / (5 + 32)).toFixed(1) + "F°"
                var col = $("<div>")
                col.attr("class", "col-sm-2")
                col.attr("id", "DayCard")
                col.html("<div id='forecastText'>" + String(d).slice(4,7) + "/" + (day + j) + "/" + String(d).slice(11,15) + "<br>" + "<img src='http://openweathermap.org/img/wn/" + iconRef + "@2x.png'" + "<br> <br>" + temp + "<br>" + humid + " </div>")//formatting data
                $("#cards").append(col)//appending data
                j++
             }
         })
        
     }
            function searchHistory(){
                var history = $("#recentSearches")
                $("#recentSearches").empty()
                for( var i = 0; i < localStorage.length; i++){
                    history.append("<a href='#' class='col-sm-12' id='history'> " + localStorage.getItem(localStorage.key(i)) + "<br> </a>")//create/append search history
                }
        }
})

$("#clear").on("click", function(event){//removes seach history
    event.preventDefault()
    localStorage.clear()
    $("#recentSearches").empty()
})
