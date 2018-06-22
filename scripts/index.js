$(document).ready(function(){
//this function will collect user data and put in object
  const creatorInfo = {
    title: $('.js-create-name').val(),
    url: $('.js-create-url').val(),
    desc: $('js-create-description').val(),
    rating: $('js-create-rating').val(),
  };


const handleBookmarkSubmit = function(event){
    $('js-creator-panel').on('click', '.js-submit-bookmark', function(){
        event.preventDefault();
        api.createBookmark2Post(creatorInfo, console.log('it worked!'))})
    }


    return {creatorInfo, handleBookmarkSubmit}
}())