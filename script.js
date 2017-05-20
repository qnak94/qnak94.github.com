/**
 * Created by Антон on 27.03.2017.
 */
function start() {
    setInterval(writeRes, 1000);
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
    console.log(locks);
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