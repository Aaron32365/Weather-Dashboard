$("#search").on("click", function(event){
    if (!$("#cards").html("")){
        event.preventDefault()
        return
    }else{
    event.preventDefault()
        var key = "6c427e9502046eb2009affa9ab9a0d21"
        var city = $("#cityInput").val().toLowerCase().trim();
        var qeuryUrlDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key
        var search = city
        localStorage.setItem(search, search)
        $.ajax({
            url: qeuryUrlDay,
            method: "GET"
        })
        .then(start)
    }
    function start(response){
        if(response != undefined){
            check5Day()
            searchHistory()
            $("#container-right-upper").show()
            $("#container-right-lower").show()
            data = response;
            console.log(data)
            var iconRef = data.weather[0].icon
            var tempC = data.main.temp;
            var temp = ((tempC * 9) / (5 + 32)).toFixed(1)
            var humid = data.main.humidity
            var name = data.name
            var wind = data.wind.speed
            var d = new Date()
            console.log(d) 
            date = String(d).slice(4,15)

            $("#nameDate-Today").html(name  + " (" + date + ")" + "<img src='" + "http://openweathermap.org/img/wn/" + iconRef + "@2x.png" + "'" + " alt='Weather icon'>" +"<hr id='top'>" )
            $("#humidity").attr("class", "text-Style").text("Humidity: " + humid + "%")
            $("#temp").attr("class", "text-Style").text("Temperature: " + temp + " F°")
            $("#wind").attr("class", "text-Style").text("Wind Speed: " + wind + "MPH")
    
        }
        else{
            console.log("error")
            return
        }        
    }

     function check5Day(){
        var qeuryUrl5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key
         $.ajax({
            url: qeuryUrl5Day,
            method: "GET"
         }).then(function(response){
             console.log(response)
             var j = 0;
             var d = new Date()
             var date = (String(d).slice(8,10))
             console.log(date)
             day = parseInt(date)
             console.log(day)
             for(var i = 0; i < response.list.length; i += 8){
                var iconRef = response.list[i].weather[0].icon
                var humid = response.list[i].main.humidity + "%"
                var tempC = response.list[i].main.temp 
                var temp = ((tempC * 9) / (5 + 32)).toFixed(1) + "F°"
                var col = $("<div>")
                col.attr("class", "col-sm-2")
                col.attr("id", "DayCard")
                col.html("<div id='forecastText'>" + String(d).slice(4,7) + "/" + (day + j) + "/" + String(d).slice(11,15) + "<br>" + "<img src='http://openweathermap.org/img/wn/" + iconRef + "@2x.png'" + "<br> <br>" + temp + "<br>" + humid + " </div>")
                $("#cards").append(col)
                j++
             }
         })
        
     }
            function searchHistory(){
                var history = $("#recentSearches")
                $("#recentSearches").empty()
                for( var i = 0; i < localStorage.length; i++){//<a href=""></a>
                    history.append("<a href='#' class='col-sm-12' id='history'> " + localStorage.getItem(localStorage.key(i)) + "<br> </a>")
                }
        }
})

$("#clear").on("click", function(event){
    event.preventDefault()
    localStorage.clear()
    $("#recentSearches").empty()
})

//$(document).on("click", "#history", start(response))