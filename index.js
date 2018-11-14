// 1) User inputs a song title
// 2) User receives the lyrics sheet with chords
// 3) Repeats

// Guitarparty API Key: eeba69898254c9808d08202bc78e91b944bef5d0

// Other requirements/In-progress: ARIA Live.

//=========================================================================================================================================


const GParty_SEARCH_URL = 'https://api.guitarparty.com/v2/songs/';

function getDataFromApi (query, displayGPartySearchData) {
    const url ='https://api.guitarparty.com/v2/songs/?query=' + query;

    $.ajax({
        url: url,
        headers: {"Guitarparty-Api-Key": "eeba69898254c9808d08202bc78e91b944bef5d0"},
        type: 'GET',
        success: displayGPartySearchData
    });
}


function displayGPartySearchData(data) {
    if(data.objects.length === 0) {
        displayPopup();
    } else {
        let results = "";
        for (let i = 0; i < data.objects.length; i++) {
            results += `
            <div class="results">
                <p><span class="bold"> Song title: ${data.objects[i].title} </p>` ;
                for (let j = 0; j < data.objects[i].authors.length; j++) {
                    results += `<div><span class="authors-display"> Author: ${data.objects[i].authors[j].name} </div>`; 
                } 
                results += `<div><span class="lyrics-container">Lyrics: ${data.objects[i].body_chords_html} </div>
            </div>
            `;

            hidePopup();
        }
        
        $('.js-search-results').html(results);
    }
}

function displayPopup() { 
    $('.feedback-section').show();
    $('.popup-frame #popup-text').text('Sorry, we currently do not have the song you are looking for');
    $('.popup-frame').show();
    $('.js-search-results').html("");
}

function hidePopup() { 
    $('.feedback-section').hide();
    $('.popup-frame').hide();
}

function init() {
    $('.feedback-section').hide();
    $('.js-search-form').submit(event => {
    event.preventDefault();
    const userText = $(event.currentTarget).find('.js-query');
    const query = userText.val();
    userText.val("");
    getDataFromApi(query,displayGPartySearchData);
    });
}

$(init);