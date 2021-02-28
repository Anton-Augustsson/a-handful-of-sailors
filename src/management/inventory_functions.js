var iteamVar = 0;
var backVar = 0;
function changeBeverageList (arg) {
    var oldbeverages = document.getElementsByClassName("spirits");
    if (arg === "next" && (iteamVar + 10) < DB2.spirits.length){
        if(backVar < 0) {
            iteamVar -= backVar;
        }
        while(oldbeverages.length > 0){
            oldbeverages[0].parentNode.removeChild(oldbeverages[0]);
        }
        beverageList(document.getElementById("myselect").value);
    }
    if (arg === "back" && (iteamVar - 10) >= 0){
        if(backVar > 0) {
            iteamVar -= backVar;
        }
        while(oldbeverages.length > 0){
            oldbeverages[0].parentNode.removeChild(oldbeverages[0]);
        }
        beverageList2(document.getElementById("myselect").value);

    }
}

function changingKind (arg){
    iteamVar = 0;
    backVar = 0;
    changeBeverageList(arg);
}

function beverageList(arg){
    backVar = 0;
    var beveragelist = document.getElementById("spirits");
    for (iteamVar; document.querySelectorAll(".spirits.spirits").length < 10 && iteamVar < DB2.spirits.length; iteamVar++) {
        backVar += 1;
        if(arg === "all" || arg == DB2.spirits[iteamVar].varugrupp || arg == undefined) {
            var name = DB2.spirits[iteamVar].namn;
            var name2 = "None";
            if (DB2.spirits[iteamVar].namn2 !== "") {
                name2 = DB2.spirits[iteamVar].namn2
            }
            var artikelid = DB2.spirits[iteamVar].artikelid;
            var bevaregeContent = `
            <div class="spirits" id="${name}"  onclick=beverageInfo(${artikelid}) >
                <span> Namn: ${name} <br> Detaljer: ${name2} <br> Article Nr: ${artikelid}  <span>
            </div>`;
            var beverageElement = document.createElement('div');
            beverageElement.innerHTML = bevaregeContent;
            beveragelist.appendChild(beverageElement);
        }
    }
}

function beverageList2(arg){
    backVar = 0;
    var beveragelist = document.getElementById("spirits");
    for (iteamVar; document.querySelectorAll(".spirits.spirits").length < 10 && iteamVar < DB2.spirits.length && iteamVar > 0; iteamVar--) {
        backVar -= 1;
        if(arg == "all" || arg == DB2.spirits[iteamVar].varugrupp) {
            var name = DB2.spirits[iteamVar].namn;
            var name2 = "None";
            if (DB2.spirits[iteamVar].namn2 !== "") {
                name2 = DB2.spirits[iteamVar].namn2
            }
            var artikelid = DB2.spirits[iteamVar].artikelid;
            var bevaregeContent = `
            <div class="spirits" id="${name}"  onclick=beverageInfo(${artikelid}) >
                <span> Namn: ${name} <br> Detaljer: ${name2} <br> Article Nr: ${artikelid}  <span>
            </div>`;
            var beverageElement = document.createElement('div');
            beverageElement.innerHTML = bevaregeContent;
            beveragelist.appendChild(beverageElement);
        }
    }
}


function beverageInfo(artId){
    var allInformation = "";
    for (i = 0; i  < DB2.spirits.length; i++){
        if(artId == DB2.spirits[i].artikelid){
           var element, x;
           element = DB2.spirits[i];
           for (x in element) {
               allInformation += x + ":\xa0" + element[x] + "<br>";
           }
        }
    }
    var c = document.querySelector(".beveragesInformation");
    c.lastChild.remove();
    var bevaregeInfo = `
        <div class=${artId}></div>
            <span> ${allInformation} </span>
        </div>`;
    var beverageInfoEl = document.createElement("div");
    beverageInfoEl.innerHTML = bevaregeInfo;
    c.appendChild(beverageInfoEl);

}

