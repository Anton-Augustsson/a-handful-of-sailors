
function beverageList(){
    var beveragelist = document.getElementById("spirits");
    for (i = 0; i < DB2.spirits.length; i++) {
        var name = DB2.spirits[i].namn;
        var artikelid = DB2.spirits[i].artikelid;
        var bevaregeContent = `
            <div class="spirits" id="${name}" >
                <span> Namn: ${name} Article Nr: ${artikelid} <span>
            </div>`;
        var beverageElement = document.createElement('div');
        beverageElement.innerHTML= bevaregeContent;
        beveragelist.appendChild(beverageElement);
    }
}
