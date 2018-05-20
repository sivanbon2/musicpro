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
    $("audio").trigger('pause');
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
    console.log('dsadasd');
    var object = response.data.songs;

    $('.songsList').empty();
    object.forEach(function(songs, album) {

      var li = $("<li class=\"songName \"><span id='songNameList' class='playIcon'></span><a href=\"javascript:void(0);\">" +
        songs.name + "</a></li>");

      $('.songsList').append(li);

      li.click(function() {
        $("audio").attr("src", songs.url);
        isPlaying = true;
        $(".playItemSmall .fa").removeClass('fa-play').addClass('fa-pause');
        $('.name').html(`Now Playing: ${songs.name}`);
        $(document).attr('title', $('.name').html());
        $('.songsList i').remove();
        $(this).prepend(`<i class="fa fa-play"></i>`);

      });

    })


    $('.songsList li:first-child').click();

    $("#player .buttons .btn-edit .fa").attr("data-edit", id);

    //$("audio").attr("src", object[0].url);


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