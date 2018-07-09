//Bookmarks List Handlers
const bookmarkHandlers = (function(){

    //DATA SUBMISSION HANDLERS
    
    //This func opens the bookmark creator
    const expandCreate = function(){
        $('body').on('click', '.accordion:focus', function(event){
            event.stopPropagation();
            $('.accordion:focus').toggleClass("active");
            $('.accordion:focus').next().toggle('slow');
        })
    };
    
    


    //this func collects user input
    const collectInfo = function(){
        return{
        title: $('.js-create-name').val(),
        url: $('.js-create-url').val(),
        desc: $('.js-create-description').val(),
        rating: $('.js-create-rating').val(),
        };
    }
    
    //this func will check for errors in user input and post if none. Store will be updated.
    const checkErrorsAndPost = function(){
        // target form, event to on submit
        $('.js-creator-panel').on('click', '.js-submit-bookmark', function(event){
            event.preventDefault();
            // Test form validation! you switched from text to url, shore up error handling
            // Think about form NOvalidate because both input validation and server response validation
            if($('.js-create-url').val().search("http") === -1 && $('.js-create-url').val().search('https') === -1) {
                alert('invalid url, please include protocol.')
            } 
            else{
                api.postBookmark(collectInfo(), function(response){
                    let responseFile = {
                        id : response.id,
                        title: response.title,
                        url: response.url,
                        rating: response.rating,
                        desc: response.desc,
                        hidden: false
                    };
                    console.log(responseFile);
                    //renderDOM()
                    STORE.bookmarks.push(responseFile);
                    console.log(`store.bookmarks is ${STORE.bookmarks}!`);
                    renderDOM(STORE);
                });
            }   
        })
    }

    //STORE RENDERING
    //this func will get the data from the API
    const getAPI = function(){
        api.getBookmarksFromAPI(function(response){
            for(let i = 0; i < response.length; i++){
                STORE.bookmarks.push({
                    id : response[i].id,
                    title: response[i].title,
                    url: response[i].url,
                    rating: response[i].rating,
                    desc: response[i].desc,
                    hidden: false
                });
            }
            renderDOM(STORE);
        })
    }

    //this function checks which bookmarks to hide
    const checkBookmarks = function(obj){
        console.log($('.js-sort-selector').val())
        for(let i=0; i<obj.bookmarks.length; i++){
            if(obj.bookmarks[i].rating < parseInt(
                $('.js-sort-selector').val().replace(' star', '')
            )) {
                obj.bookmarks[i].hidden = true;
            }
        }

    }

    //this is the listener for the sort by button
    const activateSortBy = function(){
        $('.js-sort-container').on('change', '.sort-toggler', function(){
            if($('.sort-toggler').is(':checked')) {
                checkBookmarks(STORE);
                for(let i=0; i<STORE.bookmarks.length; i++){
                    console.log('SORTER IS ACTIVE')
                    console.log(STORE.bookmarks[i]);
                }
            }
            else{
                for(let i=0; i<STORE.bookmarks.length; i++){
                    STORE.bookmarks[i].hidden = false;
                    console.log('SORTER DEACTIVATED');
                    console.log(STORE.bookmarks[i]);
                }
            }
        renderDOM(STORE);    
        })       
    }

    const deleteBookmark = function(){
        
        $('.js-bookmark-holder').on('click', '.js-delete:focus', function(event){
            let deleteID = $(event.currentTarget)
            .closest('.js-individual-bookmark').attr("id");

            let bookmarkToDelete = STORE.bookmarks
            .findIndex(bookmark => bookmark.id === deleteID);

            STORE.bookmarks.splice(bookmarkToDelete, 1);
            api.deleteRequest(deleteID);
            renderDOM(STORE);
        })
    }


    //This function will render the DOM
    const renderDOM = function(obj){
        let stringDOM = ' ';
        if(STORE.bookmarks.length === 0){
            $('.js-bookmark-holder').html(stringDOM);
            return;
        }
        else{
        for(let i=0; i < obj.bookmarks.length; i++) {
            if(obj.bookmarks[i].hidden === true){
                stringDOM = stringDOM + `
            <li class="js-individual-bookmark js-hidden" id="${obj.bookmarks[i].id}" role="article">
                <button class="js-bookmark-accordion accordion" name="Title-and-Rating"> <span class="js-bookmark-title">${obj.bookmarks[i].title}||</span><span class="js-bookmark-rating">${obj.bookmarks[i].rating}</span></button>
                <div class="js-bookmark-panel panel" hidden>
                    <a href=${obj.bookmarks[i].url}><button class="visit-button">visit link</button></a> 
                    <a href="${obj.bookmarks[i].url}"></a><span class = "js-bookmark-url">|| ${obj.bookmarks[i].url}</span><a></a><br>
                    <dl>
                        <dt>Description</dt>
                        <dd class = "js-bookmark-description">${obj.bookmarks[i].desc}</dd>
                    </dl>
                    <button class="js-delete" name="delete button">delete</button>
                </div>
            </li>`;
            }
            else{
                stringDOM = stringDOM + `
                <li class="js-individual-bookmark" id="${obj.bookmarks[i].id}" role="article">
                <button class="js-bookmark-accordion accordion" name="Title-and-Rating"> <span class="js-bookmark-title">${obj.bookmarks[i].title}||</span><span class="js-bookmark-rating">${obj.bookmarks[i].rating}</span></button>
                <div class="js-bookmark-panel panel" hidden>
                    <a href=${obj.bookmarks[i].url}><button class="visit-button">visit link</button></a> 
                    <a href="${obj.bookmarks[i].url}"></a><span class = "js-bookmark-url">|| ${obj.bookmarks[i].url}</span><a></a><br>
                    <dl>
                        <dt>Description</dt>
                        <dd class = "js-bookmark-description">${obj.bookmarks[i].desc}</dd>
                    </dl>
                <button class="js-delete" name="delete button">delete</button>
                </div>
            </li>`;
            }
            $('.js-bookmark-holder').html(stringDOM)
        }
    }
        console.log(stringDOM);
}
    
    return {expandCreate, collectInfo, checkErrorsAndPost, checkBookmarks, activateSortBy, renderDOM, getAPI, deleteBookmark} 
    }())