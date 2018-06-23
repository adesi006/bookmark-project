//Bookmarks List Handlers
const bookmarkHandlers = (function(){

    //DATA SUBMISSION HANDLERS
    
    //This func opens the bookmark creator
    const expandCreate = function(){
        $('.accordion').on('click', function(){
            $(this).toggleClass("active");
            $(this).next().toggle('slow');
        })
    };
    
    


    //this func collects user input
    const collectInfo = function(){
        return {
        title: $('.js-create-name').val(),
        url: $('.js-create-url').val(),
        desc: $('js-create-description').val(),
        rating: $('js-create-rating').val(),
        };
    }
    
    //this func will check for errors in user input
    const checkErrorsAndPost = function(){
        $('.js-creator-panel').on('click', '.js-submit-bookmark', function(event){
            event.preventDefault();
            if($('.js-create-url').val().search("http") === -1 && $('.js-create-url').val().search('https') === -1) {
                alert('invalid url, please include protocol.')
            } 
            else{
                api.postBookmark(collectInfo, api.getObjFromAPI())
            }
        })
    }


    const handleBookmarkSubmit = function(event){
        $('.js-creator-panel').on('click', '.js-submit-bookmark', function(){
            event.preventDefault();
            api.postBookmark(creatorInfo, console.log('it worked!'))})
        }
    
    
    return {handleBookmarkSubmit, expandCreate, collectInfo, checkErrorsAndPost} 
    }())