// ==========================================================================
// We need to have a variable that controls which language to use.
// In this file we only show the simplest version of language change.
// How to do this with more than two languages, is left as an
// exercise.
//
var language = 'en';

// ==========================================================================
// The dictionary consists of a simple JSON structure. It also keeps
// track of the different keys that are available  for IDs.
//
dict = {
    'keys' : ['undo','redo', 'add', 'checkout', 'login', 'settings'],       // keys for strings
    //'keys': ['add', 'checkout'],

    // We use one JSON substructure for each language. If we have
    // many different languages and a large set of strings we might
    // need to store a JSON file for each language to be loaded on
    // request.
    //
    'en': {
        'undo': "Undo",
        'redo': "Redo",
        'add': "Add",
        'checkout': "Checkout",
        'login': "Login",
        'settings': "Settings"
    },
    'sv' : {
        'undo': "Ångra",
        'redo': "Åter gör",
        'add': "Lägg till",
        'checkout': "Checka ut",
        'login': "Logga in",
        'settings': "Inställningar"
    }
};

// This function will return the appropriate string for each
// key. The language handling is made "automatic".
//
function get_string(key) {
    return dict[language][key];
}

// This function is the simplest possible. However, in order
// to handle many different languages it will not be sufficient.
// The necessary change should not be difficult to implement.
//
// After each language change, we will need to update the view, to propagate
// the change to the whole view.
//


function update_view_dictionary() {
    keys = dict['keys'];
    var idx;

    for (idx in keys) {
        key = keys[idx];
        $("#" + key).text(get_string(key));
    }
    pics = dict['pics'];
    for (idx in pics) {
        pic = pics[idx];
        $("#" + pic).attr('src', get_string(pic));
    }
}

$(document).ready(function() {
    update_view_dictionary();
});

function change_lang() {
    /*
    if (language=='en') {
        language = 'sv';
    } else (language = 'en');
    */
}
function swedish(){
    language = 'sv';
    changeLanguage("Svenska");
}

function english(){
    language = 'en';
    changeLanguage("English");
}

function changeLanguage(lang){
    document.getElementById("selected-language").innerHTML = lang;
    update_view_dictionary();
}

// ==========================================================================
// END OF FILE
// ==========================================================================
