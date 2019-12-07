$( document ).ready(function() {


    // my anime array
var themes = ["Dragon Ball Z", "FLCL", "Hamtaro", "Naruto", "ONe Piece", "Pokemon", "Sailor Moon","Spirited Away", "Trigun"];
    
    
    //function that displays the gif buttons
    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < themes.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("anime");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", themes[i]);
            gifButton.text(themes[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    
    //function to add new button
    
    function addNewButton() {
        $("#addGif").on("click", function() {
            var anime = $("#newThemeSearch").val().trim();
            if (anime == ""){
                return false;//no blank buttons
            }
            themes.push(anime);
    
            displayGifButtons();
            return false;
            });
    }
    
    //function to reset button
    function resetButton() {
        $("removeGif").on("click", function() {
            themes.pop(anime);
            displayGifButtons();
            return false;
        });
    
    }
    
    // display gif function
    function displayGifs() {
        var anime = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=rFCusnMyFTu6qDGA1w4jYaExlAiwVHGK&limit=12&rating=g&lang=en";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        .done(function(response) {
            $("#gifsView").empty();
            //return of selected theme of gifs
            var themeResults = response.data;
            if (themeResults == ""){
                alert("Sorry, there is no related gif for this search!");	
            }
            // iterate through all the results limited to 10 gifs
            for (var i = 0; i < themeResults.length; i++){
                //put gifs in a div
                var gifDiv = $("<div>");
                //pull rating of gif
                var gifRating = $("<p>").text("Rating: " + themeResults[i].rating);
                gifDiv.append(gifRating);
    
                //pull gif
                var gifImage = $("<img>");
                gifImage.attr("src", themeResults[i].images.fixed_height_still.url);
                //paused images
                gifImage.attr("data-still", themeResults[i].images.fixed_height_still.url);
                //animated images
                gifImage.attr("data-animate", themeResults[i].images.fixed_height.url);
                //how images come in, already paused
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                //add new div to existing divs
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    
    //list of already created animes
    displayGifButtons();
    addNewButton();
    resetButton();
    
//     var input = $( ":button" ).addClass( "marked" );
// $( "div" ).text( "For this type jQuery found " + input.length + "." );
// Prevent the form from submitting
// $( "form" ).submit(function( event ) {
//   event.preventDefault();
// });
    
    //event listeners
    $(document).on("click", ".anime", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    
    });
});
