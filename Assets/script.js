    $("#search").on("click", function(event){
    event.preventDefault()
    var key = "6c427e9502046eb2009affa9ab9a0d21"
    var city = $("#cityInput").val().trim();
    var qeuryUrlDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key
     $.ajax({
         url: qeuryUrlDay,
         method: "GET"
     })
     .then(function(response){ 
        check5Day()
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
         
     })
     function check5Day(){
         
        var qeuryUrl5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key
         $.ajax({
            url: qeuryUrl5Day,
            method: "GET"
         }).then(function(response){
             console.log(response)
             for(var i = 0; i < response.list.length; i +=8){
                 var humid = response.list[i].humidity
                var tempC = response.list[i].main.temp       
                var temp = ((tempC * 9) / (5 + 32)).toFixed(1)
                var col = $("<div>")
                col.attr("class", "col-sm-2").attr("id", "DayCard").html()
                col.appendTo("#cards")
             }
         })
     }

})
