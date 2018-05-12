var initAll;
$(document).ready(initAll = function() {

  deleteAll();

  var playlistUrl = 'api/playlist.php?type=playlist';
  var albumDetails = {};
  // Make ajax request
  $.ajax({
    url: playlistUrl,
    type: 'GET',
    dataType: 'json',
    success: function(songs) {
      
      //GET Playlist songs
      $.get(playlistUrl, function(response) {
        if (response.success) {
          for (i = 0; i < response.data.length; i++) {
            if (name === "" || response.data[i].name.toUpperCase().startsWith(name.toUpperCase()))
              addAlbum(response.data[i]);
          }

          initAddModal(albumDetails);
          initDeleteModal();

          initMusicPlayer();
        }
        //Playlist Album
        function addAlbum(album) {
          albumDetails[album.name] = album;
          console.log(album);
          console.log("id=" + album.id + ", name=" + album.name + ", image=" + album.image);
          var imageUrl = album.image;
          console.log(album.image);
          var albumName = $(`
              <div class="album">
                <div class="image-container">
                  <h5 class="albumName" data-filter="one">${album.name}</h5>
                  <div  class="aligner">
                    <i class="edit-trash delete" data-del="${album.id}" data-toggle="modal" data-target="#deleteModal"></i>
                    <i class="edit-trash edit" data-edit="${album.id}" data-toggle="modal" data-target="#ModalAddPlayList"></i>
                  </div>
                  <div class="circle albumImg">
                    <img class="albumSmallImg" src="${album.image}"/>
                    <div class="playImage"></div>
                  </div>
                </div>
              </div>
            `).appendTo(".album-space");
          $(".playImage", albumName).click(function() {
            playMusic(album.id);
            $(".playListImage").attr("src", album.image);

          })

        }

        //Circle album name using circleType
        function circleAlbumName() {
          for (var i = 0; i < $('.albumName').length; i++) {
            const circleType = new CircleType($('.albumName')[i]);
            circleType.radius(130);


          }
        }
        circleAlbumName();


        $('#myModal').on('shown.bs.modal', function() {
          $('#myInput').trigger('focus')
        });

      });
    }


  });

  $('#formSongsContainer').hide();


});


function deleteAll() {
  $(".container .album-space div").remove();
  $(".created-modal").remove();
  $(".modal-backdrop").remove();
  $('body').removeClass('modal-open')
}