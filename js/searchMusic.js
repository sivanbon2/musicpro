/***search***/
function searchAlbum(){
 $('#search').on("keyup",function(e) {
    //if ($(this).val() != '') {
      var searchValue = $(this).val().toLowerCase();

      if (searchValue.length <= 1) searchValue = '';

      //console.log($(this));
      $(".album-space").children().each(function(){
        if($(this).text().toLowerCase().indexOf(searchValue) !== -1){
          $(this).show();
        }else{
          $(this).hide()
        }
      })

    //}
  }); 
}

searchAlbum();