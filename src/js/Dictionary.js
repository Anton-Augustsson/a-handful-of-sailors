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
var language = 'en';


// ==========================================================================
// The dictionary consists of a simple JSON structure. It also keeps
// track of the different keys that are available  for IDs.
//
dict = {
    // There are two dictionaries one for id of a html element. Make shore that
    // the id and the key has the same name.
    'id': {
        'keys' : ['selected-language', 'undo','redo', 'add', 'checkout',
                  'login', 'settings', 'logout', 'login_header', 'login_continue_button',
                  'close_login_window', 'menu_categories', 'menu_beer', 'menu_wine', 'menu_drinks',
                  'without_gluten_text', 'without_lactose_text', 'without_nuts_text'],       // keys for strings


        /*LÄGG TILL

        Producer / tillverkare
        Country  / land
        Type     / typ
        Alcohol  / Alkoholhalt
        Size     / Storlek



        ADD TO CART / LÄGG TILL KUNDVAGN

        CART / KUNDVAGN

        ITEM     / VARA
        PRICE    / PRIS
        QUANTITY / Antal
        Total    / Totalt
        Order    / Beställ

         */



        // We use one JSON substructure for each language. If we have
        // many different languages and a large set of strings we might
        // need to store a JSON file for each language to be loaded on
        // request.
        //
        'en': {
            'selected-language': 'English',
            'undo': "Undo",
            'redo': "Redo",
            'add': "Add",
            'checkout': "Checkout",
            'login': "Login",
            'settings': "Settings",
            'logout': "Logout",
            'login_header': 'Login',
            'login_continue_button': 'Continue',
            'close_login_window': 'close',
            'menu_beer' : 'Beer',
            'menu_wine' : 'Wine',
            'menu_drinks' : 'Drinks',
            'menu_categories': 'Categories',
            'without_gluten_text': 'Without Gluten',
            'without_lactose_text': 'Without Lactose',
            'without_nuts_text': 'Without Nuts',
        },
        'sv' : {
            'selected-language': 'Svenska',
            'undo': 'Ångra',
            'redo': 'Åter gör',
            'add': 'Lägg till',
            'checkout': 'Checka ut',
            'login': 'Logga in',
            'settings': 'Inställningar',
            'logout': 'Logga ut',
            'login_header': 'Logga in',
            'login_continue_button': 'Fortsätt',
            'close_login_window': 'stäng',
            'menu_beer' : 'Öl',
            'menu_wine' : 'Vin',
            'menu_drinks' : 'Drinkar',
            'menu_categories': 'Kategorier',
            'without_gluten_text': 'Utan Gluten',
            'without_lactose_text': 'Utan Laktos',
            'without_nuts_text': 'Utan Nötter',
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
    },


    'attr': {
        'keys' : ['username_input_field', 'password_input_field'],

        'en': {
            'username_input_field': ['placeholder', 'Username'],
            'password_input_field': ['placeholder', 'Password'],
        },
        'sv': {
            'username_input_field': ['placeholder', 'Användarnamn'],
            'password_input_field': ['placeholder', 'Lösenord'],
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
        console.log(key);
        $("." + key).text(get_string('cl', key));
    }


    // For Attributes
    keys_attr = dict.attr['keys'];
    for (idx in keys_attr) {
        key = keys_attr[idx];

        input = get_string('attr', key);

        $('#' + key).attr(input[0],input[1]);
    }


}


$(document).ready(function() {
    getLanguage();
    update_view_dictionary();
});

// ==========================================================================
// END OF FILE
// ==========================================================================
