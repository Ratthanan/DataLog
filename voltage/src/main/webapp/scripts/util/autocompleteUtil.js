
function AutocompleteUtil() {

}

AutocompleteUtil.init=function (id,link) {
    var data = $.ajax({
        url: session.context + "//"+link,
        headers: {
            Accept : "application/json"
        },
        type: "GET",
        async: false
    }).responseJSON;

    console.log(data.content)
};