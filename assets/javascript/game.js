$(document).ready(function() {

  var instructions1 = $("#instructions1");
  var instructions2 = $("#instructions2");
  gifSection = $("#gif-section");

  instructions2.hide();

  var topicList = [
    "dog",
    "developer",
    "universe",
    "i am hungry",
    "matrix"
  ]

  // Create a topic buttons.---------------------------------------------------------
  function createBtns() {
    for (i = 0; i < topicList.length; i++) {

      var button = $("<li>");
      button.addClass("topicBtn")
            .attr("value", topicList[i])
            .text(topicList[i]);

      var deleteIcon = $("<i class='material-icons'>cancel</i>")
      deleteIcon.attr("value", topicList[i]);

      button.append(deleteIcon);
      $("#btns-section").append(button);
    }
  }
 

  createBtns();

  // When you click "Add", add a button to buttons list.------------------------------
  $("#add-btn").on("click", function(event) {
    event.preventDefault();

    
    $("#btns-section").empty();

    var newTopic = $("#user-input").val();

    if ((newTopic !== "") && (topicList.indexOf(newTopic) === -1)) {
      topicList.push(newTopic);
    }

    $("#user-input").val("");

    createBtns();
    
  });
  

  // When user clicks a topic button, output 10 gifs for that topic.---------------------
  $(document).on("click", ".topicBtn", function() {

    instructions1.hide();
    instructions2.show();

    var topic = $(this).attr("value");
    var key = "dc6zaTOxFJmzC";
    var limit = 100;
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

      gifSection.empty();

      var gifIndexArray = []; // For randomizing gifs

      for (i = 0; i < 10; i++) {
        var index = Math.floor(Math.random() * 100);
        gifIndexArray.push(index);
      }

      for (i = 0; i < gifIndexArray.length; i++) {

        var gifIndex = gifIndexArray[i];

        var originalURL = response.data[gifIndex].images.original.url;
        var animateURL = response.data[gifIndex].images.fixed_height.url;
        var stillURL = response.data[gifIndex].images.fixed_height_still.url;
        var rating = response.data[gifIndex].rating.toUpperCase();

        var newDiv = $("<div class='gifDiv'>");

        var ratingDiv = $("<p class='ratingDiv'>")
        ratingDiv.text("Rating: " + rating);

        var imgDiv = $("<img>");
        imgDiv.attr({
          "src": stillURL,
          "data-still": stillURL,
          "data-animate": animateURL,
          "data-state": "still",
          "data-original": originalURL
        });

        newDiv.append(imgDiv);
        newDiv.append(ratingDiv);
        gifSection.append(newDiv);
      }
    }).fail(function(err) {
      throw err;
    });
  });
  

  // When user click a gif, stop or animate it.---------------------------------------
  $(document).on("click", "img", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      var animate = $(this).attr("data-animate");
      $(this).attr({
        "data-state": "animate",
        "src": animate
      });
    }
    else {
      var still = $(this).attr("data-still");
      $(this).attr({
        "data-state": "still",
        "src": still
      });  
    }
  });
  

  // When user double clicks gif, prompt gif url.----------------------------------------
  $(document).on("dblclick", "img", function() {
    var original = $(this).attr("data-original");
    prompt("GIF URL:", original);
  });
  

  // When user clicks x, remove button.----------------------------------------------
  $(document).on("click", ".material-icons", function() {
    var deleteValue = $(this).attr("value");
    $("li[value='" + deleteValue + "']").remove();
    topicList.splice($.inArray(deleteValue, topicList), 1);
  });

});