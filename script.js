/**
 * Created by Антон on 27.03.2017.
 */
var d = new Date();
var n = d.getTime();
var shots = 3;
var lock_key;
function start() {
    setInterval(writeRes, 1000);
    generate_lock_key();
    generate_unlock_key();
}
function getHitLevel() {
    var val = document.getElementById('hit__val').value;
    if(val<85)
        return 'GUARDED';
    else if(val<170)
        return 'WARNING';
    else
        return 'ALARM!';
}
function getAccelLevel() {
    var x_val = document.getElementById('X').value;
    var y_val = document.getElementById('Y').value;
    var z_val = document.getElementById('Z').value;

    if(abs(x_val)<5)document.getElementById('X__res').value="GUARDED";
    else if(abs(x_val) <10)document.getElementById('X__res').value="WARNING";
    else document.getElementById('X__res').value="ALARM!";

    if(abs(y_val)<5)document.getElementById('Y__res').value="GUARDED";
    else if(abs(y_val) <10)document.getElementById('Y__res').value="WARNING";
    else document.getElementById('Y__res').value="ALARM!";

    if(abs(z_val)<5)document.getElementById('Z__res').value="GUARDED";
    else if(abs(z_val) <10)document.getElementById('Z__res').value="WARNING";
    else document.getElementById('Z__res').value="ALARM!";

        function abs(accVal) {
            if(accVal<0)
                accVal=-accVal;
            return accVal;
        }
}
function getLockState() {
    var locks = {
        lf:document.getElementById('LF').checked,
        rf:document.getElementById('RF').checked,
        ca:document.getElementById('Ca').checked,
        bg:document.getElementById('Bg').checked
    }
    //console.log(locks);
    //мне за этот участок кода стыдно
    if(locks.lf)document.getElementById('LF__res').value = "Closed";
    else document.getElementById('LF__res').value = "Open";
    if(locks.rf)document.getElementById('RF__res').value = "Closed";
    else document.getElementById('RF__res').value = "Open";
    if(locks.ca)document.getElementById('Ca__res').value = "Closed";
    else document.getElementById('Ca__res').value = "Open";
    if(locks.bg)document.getElementById('Bg__res').value = "Closed";
    else document.getElementById('Bg__res').value = "Open";
}
function getDistanceState() {
    var dist = document.getElementById('distance').value;
    if(dist<300)document.getElementById('signal__state').value = "Active";
    else document.getElementById('signal__state').value = "Lost";
}
function getScopeState() {
    if(document.getElementById('scope').checked)document.getElementById('scope__state').value = "Normal";
    else document.getElementById('scope__state').value = "Crashed";
}

function writeRes() {
    document.getElementById('hit__res').value=getHitLevel();
    getLockState();
    getAccelLevel();
    getDistanceState();
    getScopeState();

}
function generate_lock_key() {
    var x_low = Math.abs(Math.round((Math.random() + n / Math.pow(2, 43)) * Math.pow(2, 31)));
    var x_high = Math.abs(Math.round((Math.random() + n / Math.pow(2, 43)) * Math.pow(2, 31)));
    lock_key = Number(x_low).toString(16).concat(Number(x_high).toString(16));
    document.getElementById('current__lock').value = lock_key;
    document.getElementById('input__lock').value = lock_key;
}
function generate_unlock_key() {
    var x_low = Math.abs(Math.round((Math.random()+n/Math.pow(2, 43)) * Math.pow(2, 31)));
    var x_high = Math.abs(Math.round((Math.random()+n/Math.pow(2, 43)) * Math.pow(2, 31)));
    var unlock_key = Number(x_low).toString(16).concat(Number(x_high).toString(16));
    document.getElementById('current__unlock').value = unlock_key;
    document.getElementById('input__unlock').value = unlock_key;
    console.log(unlock_key);
}
function lock() {
    if(document.getElementById('current__lock').value == document.getElementById('input__lock').value)
        generate_lock_key();
    else{
        console.log(shots);
        if(shots==0){
            document.getElementById('input__lock').setAttribute("disabled", true);
            document.getElementById('input__lock').style.backgroundColor = "#eee";

            document.getElementById('lock__button').setAttribute("disabled", true);
            document.getElementById('lock__button').style.backgroundColor = "#eee";

            document.getElementById('unlock__button').setAttribute("disabled", true);
            document.getElementById('unlock__button').style.backgroundColor = "#eee";

            document.getElementById('show__button').setAttribute("disabled", true);
            document.getElementById('show__button').style.backgroundColor = "#eee";
            setTimeout(timer,1000);
            var time = 20;
            function timer(){
                if(time!=0){
                    time--;
                    document.getElementById('text__closed').innerHTML="Закрытие  Cooldown: " + time;
                    console.log(time);
                    setTimeout(timer,1000);
                }
                else {
                    setTimeout(function(){}, 1000);
                    document.getElementById('text__closed').innerHTML="Закрытие";

                    document.getElementById('input__lock').removeAttribute("disabled");
                    document.getElementById('input__lock').style.backgroundColor = "#fff";

                    document.getElementById('lock__button').removeAttribute("disabled");
                    document.getElementById('lock__button').style.backgroundColor = "green";

                    document.getElementById('unlock__button').removeAttribute("disabled");
                    document.getElementById('unlock__button').style.backgroundColor = "green";

                    document.getElementById('show__button').removeAttribute("disabled");
                    document.getElementById('show__button').style.backgroundColor = "green";
                    
                    shots = 3;
                    console.log(shots);
                    document.getElementById('input__lock').value = lock_key;
                }
            }

        }
        else
            shots--;
        // var shots = 3;.setAttribute("id", "uniqueIdentifsetAttribute("disabled", false)
        // setAttribute("style", "color: red;")
        // document.body.style.backgroundColor = "#FF0000";
    }

}