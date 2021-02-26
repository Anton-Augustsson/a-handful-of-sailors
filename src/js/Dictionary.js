// =====================================================================================================
// Control and Model, for handeling languages.
// =====================================================================================================
// Author: Anton Augustsson, 2021
//
// Two dictionaries are presented. To create a new item in the dictionary, Found out
// the 'id' or 'cl' (class) of the item wich you witch to have in the dictionary
// then write the 'id' or 'cl' as keys in the respective dictionary and then write the
// translation of the text you wich to desplay for the respective languages
//
// ==========================================================================
// Varbles

// We need to have a variable that controls which language to use.
// In this file we only show the simplest version of language change.
// How to do this with more than two languages, is left as an
// exercise.
//
var language;


// ==========================================================================
// The dictionary consists of a simple JSON structure. It also keeps
// track of the different keys that are available  for IDs.
//
dict = {
    // There are two dictionaries one for id of a html element. Make shore that
    // the id and the key has the same name.
    'id': {
        'keys' : ['selected-language', 'undo','redo', 'add', 'checkout',
                  'login', 'settings', 'logout'],       // keys for strings

        // We use one JSON substructure for each language. If we have
        // many different languages and a large set of strings we might
        // need to store a JSON file for each language to be loaded on
        // request.
        //
        'en': {
            'selected-language': "English",
            'undo': "Undo",
            'redo': "Redo",
            'add': "Add",
            'checkout': "Checkout",
            'login': "Login",
            'settings': "Settings",
            'logout': "Logout",
        },
        'sv' : {
            'selected-language': "Svenska",
            'undo': "Ångra",
            'redo': "Åter gör",
            'add': "Lägg till",
            'checkout': "Checka ut",
            'login': "Logga in",
            'settings': "Inställningar",
            'logout': "Logga ut",
        }
    },

    // The other Dictionary is class (cl) spesific dictionares make sure that each class name
    // matches the with the key. That is how it is identified.
    'cl': {
        'keys' : ['test'],

        'en': {
            'test': "Text",
        },
        'sv': {
            'test': "svergie text",
        }
    }
};

// ==========================================================================
// Helper functions

// This function will return the appropriate string for each
// key. The language handling is made "automatic".
//
function get_string(type, key) {
    return dict[type][language][key];
}

// get the local storade language "lang"
// if there dosent exist one a defoult will be set as english "en"
function getLanguage(){
    language = localStorage.getItem("lang");

    if(language == null){
        language = 'en';
        localStorage.setItem("lang", "en");
    }
}

// ==========================================================================
// Event functions

// Change the languge to swidish
// the localy stored variable lang will be updated
function swedish(){
    language = 'sv';
    localStorage.setItem("lang", "sv");
    changeLanguage("Svenska");
}

function english(){
    language = 'en';
    localStorage.setItem("lang", "en");
    changeLanguage("English");
}

function changeLanguage(lang){
    document.getElementById("selected-language").innerHTML = lang;
    update_view_dictionary();
}


// ==========================================================================
// View update

// update the view by inserting the text from the dictionary
function update_view_dictionary() {
    var idx;

    keys_id = dict.id['keys'];
    for (idx in keys_id) {
        key = keys_id[idx];
        $("#" + key).text(get_string('id', key));
    }

    keys_cl = dict.cl['keys'];
    for (idx in keys_cl) {
        key = keys_cl[idx];
        $("." + key).text(get_string('cl', key));
    }
}

$(document).ready(function() {
    getLanguage();
    update_view_dictionary();
});

// ==========================================================================
// END OF FILE
// ==========================================================================
