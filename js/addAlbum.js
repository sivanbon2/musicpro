function initAddModal() {


  const addAlbumModal = $("<div class=\"created-modal\">").load('html/addPopup.html', function(data) {
    $('body').append(addAlbumModal);

    setPartOneValidation();

    updateImageUrl();

    setResetInputsListener();


    setplayListSubmitEventListener();


    initEditModal();



    $("#add-new-playlist-button").on('click', function() {


      $('label').removeClass('error Playlist_Name-error');
      $('input').removeClass('error');
      $('#Playlist_Name-error').html('');

      $('#Playlist_Url-error').html('');
      $("input[type=text]").val('');
      $("input").keyup()
      $("#thumbnail").attr("src", "https://vignette.wikia.nocookie.net/pandorahearts/images/7/70/No_image.jpg.png/revision/latest?cb=20121025132440&format=original");

      $("#ModalAddPlayList .modal-title").html('Add New Playlist');

      $('#formSongsContainer').hide();
      $('#addPlaylistForm').show();
      $("#ModalAddPlayList").attr("data-action", "add");
    });




    //add new song fields
    $("#addBtn").click(function() {

      var num = $(".newSong").length + 1;

      var newRow = `<div class="newSong" id="newSong${num}">
            <label for="newSongUrl${num}">Song URL
              <input type="text" id="newSongUrl${num}" pattern="https?://.+" name="newSongUrl${num}" class="newSongUrl" required>
            </label>
            <label for="newSongName${num}">Name
              <input type="text" id="newSongName${num}" pattern="^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$" name="newSongName${num}" class="newSongName" required>
            </label>
          </div>`;

      $("#formSongsContainer main").append(newRow);

      $('#newSongName1 #newSongName1').css('display', 'inline-block');

    })
  });



  function setPartOneValidation() {
    $('#addPlaylistForm').on('submit', function(event) {
      if ($(this).valid()) {
        $('#addPlaylistForm').hide();
        $('#formSongsContainer').show();

        event.preventDefault();
      }
    }).validate({
      rules: {
        Playlist_Url: {
          required: true,
          url: true
        }
      }
    });
  }


  //On the first modal insert URL and update the image
  function updateImageUrl() {
    $("#Playlist_Url").on('change', function(event) {


      let url = this.value;
      $("#thumbnail").attr("src", url);
    });
  }


  //Reset input Playlist Name and Playlist Url
  function setResetInputsListener() {
    $("#reset").on('click', function(event) {
      event.preventDefault();
      $("#Playlist_Name").val("");
      $("#Playlist_Url").val("");
      $("#thumbnail").attr("src", "https://vignette.wikia.nocookie.net/pandorahearts/images/7/70/No_image.jpg.png/revision/latest?cb=20121025132440&format=original");

    });
  }

  //Adding new playlist and checking validation
  function setplayListSubmitEventListener() {
    $('#formSongsContainer').on('submit', function(event) {
      if ($("#ModalAddPlayList").attr("data-action") === "add") {

        if ($(this).valid()) {

          event.preventDefault();
          $('#playerContainer').hide();
          $("audio").trigger('pause');
          var data = {
            name: $("#Playlist_Name").val(),
            image: $("#Playlist_Url").val(),
            songs: Array.prototype.slice.call($(".newSong")).map(song => ({
              name: $(".newSongName", song).val(),
              url: $(".newSongUrl", song).val()
            })).filter(song => song.name && song.url)
          };
          $.post('api/playlist', data, () => {
            $("#ModalAddPlayList").modal('hide')
            initAll();
          });
        }
      }

    }).validate({
      rules: {
        newSongUrl1: {
          required: true,
          url: true
        },
        newSongName1: {
          required: true
        }
      }

    });

  }

}