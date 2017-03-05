$(document).ready(function() {

  var topicList = [
    "Lost",
    "Newsroom",
    "Friends",
    "How I Met Your Mother",
    "Jane the Virgin",
    "Game of Thrones"
  ]

  // Create a topic buttons.---------------------------------------------------------
  function createBtns() {
    for (i = 0; i < topicList.length; i++) {
      var button = $("<button class='topicBtn' value='" + topicList[i] + "'>" + topicList[i] + "</button>")
      $("#btns-section").append(button);
    }
  }
  //----------------------------------------------------------------------------------

  createBtns();

  // When you click "Add", add a button to buttons list.------------------------------
  $("#add-btn").on("click", function(event) {
    $("#btns-section").empty();
    event.preventDefault();
    var newTopic = $("input").val();
    topicList.push(newTopic);
    console.log(topicList);
    createBtns();
  })
  //-----------------------------------------------------------------------------------

  // When you click a topic button, output 10 gifs for that topic.---------------------
  $(document).on("click", ".topicBtn", function() {

    $("#results").empty();

    var topic = $(this).val();
    var key = "dc6zaTOxFJmzC";
    var limit = 10;
    var url = "http://api.giphy.com/v1/gifs/search";
    url += "?" + $.param({
      "api_key": key,
      "q": topic,
      "limit": limit
    });
    
    $.ajax({
      url: url,
      method: "GET"
    }).done(function(response) {

      for (i = 0; i < response.data.length; i++) {

        var animateURL = response.data[i].images.fixed_height.url;
        var stillURL = response.data[i].images.fixed_height_still.url;

        var newImg = $("<img>");
        newImg.attr("src", animateURL)
        .attr("data-still", stillURL)
        .attr("data-animate", animateURL)
        .attr("data-state", "animate");

        $("#results").append(newImg);
      }
    }).fail(function(err) {
      throw err;
    });
  });
  //---------------------------------------------------------------------------------


  // When you click a gif, stop or animate it.---------------------------------------
  $(document).on("click", "img", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      var animate = $(this).attr("data-animate");
      $(this).attr("data-state", "animate");
      $(this).attr("src", animate);
    }
    else {
      var still = $(this).attr("data-still");
      $(this).attr("data-state", "still");
      $(this).attr("src", still);
    
  });
  }//---------------------------------------------------------------------------------



});