'use strict';

const api = (function(){
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/akim'

    //This func will get objects from the API
    const getObjFromAPI = callback => {
        $.getJSON(`${BASE_URL}/bookmarks`, callback);
    }

    //This Func will create items to post
    const postBookmark = function(info, callback){
        const preppedInfo= JSON.stringify(info);
        $.ajax({
            url:`${BASE_URL}/bookmarks`,
            method: 'POST',
            contentType: 'application/json',
            data: preppedInfo,
            success: callback
        });
    } 
    
    
    
    return {getObjFromAPI, postBookmark}
}())