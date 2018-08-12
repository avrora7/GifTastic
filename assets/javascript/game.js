var puppies = ["cocker spaniel", "golden retriever", "miniature poodle", "great dane"];

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < puppies.length; i++) {

        var nextButton = $("<button>");
        nextButton.addClass("puppy-btn btn btn-info mr-4 mb-3");
        nextButton.attr("data-name", puppies[i]);
        nextButton.text(puppies[i]);
        $("#buttons-view").append(nextButton);
    }
}

function displayGif(response) {
    console.log(response)

    let results = response.data;
    let gifView = $("#gifs-view");
    let template = $('#template').html()
    console.log(template)

    for (var i = 0; i < results.length; i++) {
        let title = results[i].title;
        let rating = results[i].rating;
        let stillURL = results[i].images.fixed_height_still.url;
        let animatedURL = results[i].images.fixed_height.url;

        let nextItem = $(template);
        nextItem.find("img").attr("src", stillURL);
        nextItem.find("#rating").text(rating);
        nextItem.find(".card-title").text(title);
        gifView.prepend(nextItem);
    }
  }




function displayPuppyInfo() {

    var puppy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    encodeURI(puppy) + "&api_key=1MHhT030Ez0bgRugAOSYZbZVSIHiKaAo&limit=10";

    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        displayGif(response)
      });
}

$(document).ready(function () {
    renderButtons()
    $(document).on("click", ".puppy-btn", displayPuppyInfo);
    $("#add-puppy").on("click", function (event) {
        event.preventDefault();
        var puppy = $("#puppy-input").val().trim();
        if (puppy === "") return;
        puppies.push(puppy);
        renderButtons();
        $("#puppy-input").val("")
    });
});

