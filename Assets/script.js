    $("#search").on("click", function(event){
    event.preventDefault()
    var key = "6c427e9502046eb2009affa9ab9a0d21"
    var city = $("#cityInput").val().trim();
    var qeuryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key
    console.log(qeuryUrl)
     $.ajax({
         url: qeuryUrl,
         method: "GET"
     })
     .then(function(response){ 
        $("#container-right-upper").show()
         data = response;
         console.log(data)
         var iconRef = data.weather[0].icon
         var tempC = data.main.temp;
         var temp = ((tempC * 9) / (5 + 32)).toFixed(1)
         var humid = data.main.humidity
         var name = data.name
         var wind = data.wind.speed

         date()
         $("#nameDate-Today").html(name  + " (" + date + ")" + "<img src='" + "http://openweathermap.org/img/wn/" + iconRef + "@2x.png" + "'" + " alt=''>" )
         $("#humidity").text("Humidity: " + humid + "%")
         $("#temp").text("Temperature: " + temp + " F°")
         $("#wind").text("Wind Speed: " + wind + "MPH")
         
     })

})
function date(){
    var d = new Date();
    var n = d.toString()
    console.log(n)
    date = n.substring(4,9) + ", " + n.substring(10,15)
    console.log(date)
    return date
 }