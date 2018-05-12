//Delete Existing Playlist

function initDeleteModal() {

  const deleteAlbumModal = $("<div class=\"created-modal\">").load('html/deletePopup.html', function() {
    $('body').append(deleteAlbumModal);


    $('.delete').on('click', function() {
      var id = $(this).attr('data-del');

      $('.confirmDelete').attr('data-del', id);
    })

    $('.confirmDelete').on('click', function() {

      var id = $(this).attr('data-del');
      var url = "api/playlist/" + id;
      $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'json',
        success: function() {

          $(".album").each(function(index, album) {
            var dataDelElement = $("i[data-del=" + id + "]", album);
            if (dataDelElement.length > 0) {
              $(album).remove();
            }



          });

        }

      });

    });

  });
}