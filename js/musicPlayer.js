function initMusicPlayer() {
  $(".playImage").click(function() {
    $('.playListImage').addClass('rotatingImage');
    $(".album").css("position", "relative");
    $(".album").animate({
      top: "160px"
    }, 1000);

    $("#playerContainer").show();
    $("ol li").addClass("songName");
    $(".songName").show();
    $(".songName").hide();
    $('.name').html('');

  });

  $("#player .buttons .btn-delete .fa").click(function() {
    $("#playerContainer").hide();
    $(".album").animate({
      top: "0px"
    }, 1000);
  });

}

//Play Music insert the songs name in list
function playMusic(id) {
  var url = "api/playlist.php?type=songs&id=" + id;
  $.get(url, function(response, songs) {
    console.log(response.data.songs);
    var object = response.data.songs;

    object.forEach(function(songs, album) {

      var li = $("<li class=\"songName\"><a href=\"javascript:void(0);\">" +
        songs.name + "</a></li>");

      $('.songsList').append(li);

      li.click(function() {
        $("audio").attr("src", songs.url);
        isPlaying = true;
        $(".playItemSmall .fa").removeClass('fa-play').addClass('fa-pause');
        $('.name').html(songs.name);
      });

      $(document).attr('title', songs.name);

    })

    $("#player .buttons .btn-edit .fa").attr("data-edit", id);

    $("audio").attr("src", object[0].url);


    var isPlaying = true;

    $(".playItemSmall .fa").removeClass('fa-play').addClass('fa-pause');

    $(".playItemSmall").click(function() {
      if (isPlaying) {
        $("audio").trigger('pause');
        $('.playListImage').removeClass('rotatingImage');
        $(".playItemSmall .fa").removeClass('fa-pause').addClass('fa-play');

        isPlaying = false;
      } else {
        $("audio").trigger('play');
        $('.playListImage').addClass('rotatingImage');
        $(".playItemSmall .fa").removeClass('fa-play').addClass('fa-pause');
        isPlaying = true;
      }
    });
  });
}