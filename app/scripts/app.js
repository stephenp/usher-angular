// The LOCAL IP address of the plex client
// NOTE: This only works when you are on the same network as the server!
var host = "http://192.168.0.132";

function statsUpdater() {
    $.ajax({
      url: "/rsrc/ajax/stats.php",
      dataType: "json"
    }).done(function( data ) {
      $("#statsLoad").html(data.load);
      $("#statsUptime").html(data.uptime);
      $("#statsRaidSize").html(data.raidSize);
      $("#freespace").html(data.freeSpace);
      $("#usedspace").html(data.usedSpace);

      if (data.raidRebuild){
          $("#raidRebuild").html(data.raidRebuild);
          $("#raidRebuild").parent("li").show();
      }

      $("#sendSpeed").html(data.sendSpeed);
      $("#receiveSpeed").html(data.receiveSpeed);
      $("#weather_temp_f").html(data.temp_f);
      $("#weather_pop").html(data.pop);
      $("#weather_sunset").html(data.sunset);
      
      setTimeout(statsUpdater, 1250);
    }); 
};

function plexGestures(){

    if(plexfocus == "true"){

        $("body").bind().keydown(function(e){
            e.preventDefault();
        // alert(e.keyCode);    
        // 8 = back
        // 13 = enter
        // 37 = left
        // 38 = up
        // 39 = right
        // 40 = down        
        // 70 = "f" (toggle ff or rewind speed)
        // 73 = "i" (for info)
        // 79 = "o" (onscreen menu)
        // 82 = "r" (reboot plex)

        if(e.keyCode == "8" || e.keyCode == "27"){
            $.get(host + ":32400/system/players/192.168.0.132/navigation/back", function() {})
            }
        else if(e.keyCode == "13"){
            $.get(host + ":32400/system/players/192.168.0.132/navigation/select", function() {})
            }
        else if(e.keyCode == "32"){
            $.get(host + ":32400/system/players/192.168.0.132/playback/play", function() {})
            }
        else if(e.keyCode == "37"){
            $.get(host + ":32400/system/players/192.168.0.132/navigation/moveLeft", function() {})
            }
        else if(e.keyCode == "38"){
            $.get(host + ":32400/system/players/192.168.0.132/navigation/moveUp", function() {})
            }
        else if(e.keyCode == "39"){
            $.get(host + ":32400/system/players/192.168.0.132/navigation/moveRight", function() {})
            }
        else if(e.keyCode == "40"){
            $.get(host + ":32400/system/players/192.168.0.132/navigation/moveDown", function() {})
            }
        else if(e.keyCode == "73"){
            $.get(host + ":32400/system/players/192.168.0.132/navigation/contextMenu", function() {})
            }
        else if (e.keyCode == "70"){
            $.get(host + ":32400/system/players/192.168.0.132/playback/bigStepForward", function() {})
            }
        else if (e.keyCode == "79"){
            $.get(host + ":32400/system/players/192.168.0.132/navigation/toggleOSD", function() {})
            }
        else if (e.keyCode == "82"){
            // shell fire restart plex
            }
        }); //end key function
    } else {
        $("body").unbind();
    };
}



$(document).ready(function(){

    // Run functions on DOM ready
    //abstract this out to angular
    //statsUpdater();

    // AJAX Login
    $("#login").submit(function(event) {

        event.preventDefault();

        $.post('/rsrc/ajax/auth.php', $('#login').serialize(), function(data) {

            if(data) {
                console.log(data);
                $("#login").fadeOut();
                location.reload();
            } else {
                // LOGIN FAILED
                console.log(data);
                $("#login").addClass("error");
                $("#password").val("");

                $("#login.error")
                    .animate({ left: "50.0%" }, 200)
                    .animate({ left: "49.5%" }, 75 )
                    .animate({ left: "50.5%" }, 75 )
                    .animate({ left: "49.5%" }, 75 )
                    .animate({ left: "50.5%" }, 75 )
                    .animate({ left: "49.5%" }, 75 )
                    .animate({ left: "50.5%" }, 75 )
                    .animate({ left: "50.0%" }, 200);
            }

        });

    });

});

$(window).load(function(){

    var plexFocus = 'false',
        stallFor;   
    
    $("body").addClass("loaded");
    
    $("#password").focus();
        
    $("nav ol").fadeIn(200, function() {
        
        $("nav ol li").each(function (id) {
            stallFor = 75 * parseInt(id); // 75 is the gap between delays, tweek it based on visual preference
            $(this).delay(stallFor).animate( { opacity: "1", top: "0" }, { queue: true, duration: 200 });
        });     

    });

    $('#plexControls').hover(function() {
        //$(this).addClass('listening');
        plexfocus = "true";
        plexGestures();
    }, function(){
        plexfocus = "false";
        plexGestures();
    });

});
