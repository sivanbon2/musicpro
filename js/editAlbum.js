//Edit Modal after clicking on the edit btn
function initEditModal(albumDetails) {

  $(".edit").on('click', function() {
    $('input').removeClass('error');
    $('#newSongUrl1-error').hide();
    $('#newSongName1-error').hide();
    $('#addPlaylistForm').show();
    $('#formSongsContainer').hide();
    $("input[type=text]").val("");
    $('label').removeClass('error Playlist_Name-error');
    $('#Playlist_Name-error').html('');
    $('#Playlist_Url-error').html('');
  });


  $(".edit").on('click', function() {

    let album = null,
      id = $(this).attr('data-edit');

    $("#ModalAddPlayList .modal-title").html('Edit New Playlist');

    $("#ModalAddPlayList").attr("data-action", "edit");
    $("#ModalAddPlayList").attr("data-id", id);

    for (let i in albumDetails) {
      if (albumDetails[i].id === $(this).attr('data-edit'))
        album = albumDetails[i];
    }

    $("#Playlist_Name").val(album.name);

    $("#Playlist_Url").val(album.image).change();


    var url = "api/playlist.php?type=songs&id=" + id;
    $.get(url, function(response) {
      var object = response.data.songs;
      while (object.length > $('.newSong').length) {
        $("#addBtn").click();
      }
      while (object.length < $('.newSong').length) {
        $(`#newSong` + $('.newSong').length).remove();
      }
      object.forEach(function(song, key) {
        $(".newSong:nth-child(" + (key + 1) + ") .newSongUrl").val(song.url)
        $(".newSong:nth-child(" + (key + 1) + ") .newSongName").val(song.name)
        console.log("(:");
        $("input").keyup()
      })
      $("input").keyup()
    });

  });

  //Update playlists
  setplayListSubmitEventListener();

  function setplayListSubmitEventListener() {
    $('#formSongsContainer').on('submit', function(event) {
      if ($("#ModalAddPlayList").attr("data-action") === "edit") {
        if ($(this).valid()) {
          let id = $("#ModalAddPlayList").attr("data-id");
          event.preventDefault();
          var data = {
            name: $("#Playlist_Name").val(),
            image: $("#Playlist_Url").val(),
            songs: Array.prototype.slice.call($(".newSong")).map(song => ({
              name: $(".newSongName", song).val(),
              url: $(".newSongUrl", song).val()
            })).filter(song => song.name && song.url)
          };
          $.post('api/playlist/' + id, data, () => {
            $.ajax({
              url: 'api/playlist/' + id + '/songs',
              type: 'POST',
              // contentType: 'application/json',
              data: {
                songs: data.songs
              }, // JSON.stringify({songs: data.songs}),
              dataType: 'json',
              success: function() {
                $("#ModalAddPlayList").modal('hide');
                initAll();

              }
            });
            $('#playerContainer').hide();
            $("audio").trigger('pause');

          });

        }
      }
    });
  }
}