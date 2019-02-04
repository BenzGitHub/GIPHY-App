// This is the initial array.
var videoGames = ["Nintendo","Playstation", "Xbox", "Mario", "Nathan Drake", "Master Chief", "Atari 2600", "Nintendo 64", "Pong", "Mario Kart", "Pac-Man", "Fallout 4", "Sims", "Zelda", "Skyrim"];
var gameImage = "";
// This puts all the buttons at the top of the page.
function showButtons () {
$("#buttonItems").empty();
$("#game-input").val("");
for (var i = 0; i < videoGames.length; i++) {
    var button = $("<button class='btn btn-primary'>");
    button.addClass("game");
    button.attr("game-name", videoGames[i]);
    button.text(videoGames[i]);
    $("#buttonItems").append(button);
    $("#buttonItems").append(" ");
}
}
showButtons();

// This runs when the user clicks "Game On!", it adds it to the button array and updates the buttons.

// DOH! I mistyped the addVideoGame id (addVideoGames - stupid "s"). I lost a little bit of my precious sanity trying to figure it out.
$("#addVideoGame").on("click", function(event) {
$("#entry").empty();
event.preventDefault();
var gameInput = $("#game-input").val().trim();
var gameTerm = $(this).attr("game-name");
// Test area to make sure the user's button has at least 10 GIFs.
// If you search for "Lugi" or "Metroid" you get less than 10 results (as of Februray 2019)

// If there aren't 10, an error message will be shown and no button will be created.

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gameInput + "&limit=2&api_key=isHN97YB5Q0F0XyjZ0Ui86qr1APYPap6";
    $.ajax({ url: queryURL, method: "GET"}).done(function(response) {
    if (response.pagination.total_count >= 10) {
        videoGames.push(gameInput);
        showButtons(); }
    else if (response.pagination.total_count === 0) {
        $("#entry").html(" Sorry, there were no results for this.  Please try again."); }
    else if (response.pagination.total_count === 1) { $("#entry").html(" Sorry, there was only 1 result for this.  Please try again."); }
    else { $("#entry").html(" Sorry, there were only " + response.pagination.total_count + " results for this.  Please try again."); }
    $("#game-input").val("");
    });
});
$(document).on("click", ".game", display);
function display() {
// This is just to clear out any error message (if there is one)
$("#entry").empty();
var gameTerm = $(this).attr("game-name");
// The GIPHY query.  This limits to 10 results

// I put a var other than "gameTerm" in this search query. It took a while to figure out.
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gameTerm + "&limit=10&api_key=isHN97YB5Q0F0XyjZ0Ui86qr1APYPap6";
$.ajax({ url: queryURL, method: "GET"}).done(function(response) {
    // This runs 10 times (limit is 10 in query) to show the returs from the GIPHY website.
    for (var j = 0; j < response.data.length; j++) {
        
        // Gets the animated gif URL
        var active = response.data[j].images.fixed_width.url;
        // Gets the still gif URL
        var still = response.data[j].images.fixed_width_still.url;
        // Gets the rating and makes it upper case
        var rating = "Rating: " + (response.data[j].rating).toUpperCase();
        // Creates the new img item
        // GGGRRR!! I mistyped this var, it produced no errors and took forever figure out!!
        var gameImage = $("<img>");
       
        // This creates a new div for the rating so that it maintains the gifs size
        var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");
        $(ratingDiv).css({"text-align":"center", "font-size":"20px", "width":"200", "display":"block"});
        gameImage.attr({"active":active, "still":still, "src":still, "state":"still"});
        // This holds the new div for both rating and the image. Every image will have a rating on top of it.
        var ratingAndImage = $("<div>");
        $(ratingAndImage).css({"float":"left"});
        $(ratingAndImage).prepend(ratingDiv, gameImage);
        // This adds the rating and image to the page.
        $("#ratings").prepend(ratingAndImage);
        // When the user clicks on a picture, this will either start or stop the animation of that picture.
        $(gameImage).on("click", function(event) {
            // This is just to clear out any error message (if there is one)
            $("#entry").empty();
            
            var state = $(this).attr("state");
            var source = $(this).attr("src");
            if (state === "still") {
            $(this).attr("src", $(this).attr("active"));
            $(this).attr("state", "active"); }
            else {
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("state", "still"); } 
        });
    }
});
}
