$(document).ready(function() {
  // Initial array of topics
  var topics = ["dennis chi","asimo", "anki cosmo", "raspberry pi", "arduino uno", "amazon grand tour", "jeremy clarkson", "richard hammond", "james may"];
  // Function for displaying topics data
  function renderButtons() {
  // Deleting the topic buttons prior to adding new topic buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#giphyButton").empty();
    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
      // Then dynamicaly generating buttons for each topic in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("topic");
      // Adding a data-attribute with a value of the topic at index i
      a.attr("data-name", topics[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $("#giphyButton").append(a);
    }
  }
  // This function handles events where one button is clicked
  $("#addButton").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // This line will grab the text from the input box
    var topic = $("#giphyInput").val().trim();
    if (topic !== "") {
      // The topic from the textbox is then added to our array
      topics.push(topic);
      $("#giphyInput").val("");
      // calling renderButtons which handles the processing of our topic array
      renderButtons();
    }
  });
  // Calling the renderButtons function at least once to display the initial list of topics
  renderButtons();
  // Adding click event listen listener to all buttons
  $("#giphyButton").on("click",".topic", function() {
    $("#giphy").empty();
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-name");
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=Wjo2pl3bqy3TsIKgkFrTWLFPOTQQvomo&limit=10";
    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);
      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;
      // Looping through each result item
      for (var i = 0; i < results.length; i++) {
        // Creating and storing a div tag
        var animalDiv = $("<div>");
        animalDiv.addClass("result")
        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);
        // Creating and storing an image tag
        var animalImage = $("<img>");
        animalImage.addClass("gif");
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalImage.attr("data-state", "still");
        // Appending the paragraph and image tag to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);
        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#giphy").prepend(animalDiv);
      }
    });
  });
  // Adding click event listen listener to all gifs
  $("#giphy").on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});