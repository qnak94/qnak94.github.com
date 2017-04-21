/**
 * Created by Антон on 27.03.2017.
 */
function start() {
    setInterval(writeRes, 1000);
}
function getHitLevel() {
    var val = document.getElementById('hit__val').value;
    if(val<20)
        return 'GUARDED';
    else if(val<50)
        return 'WARNING';
    else
        return 'ALARM!';
}
//function getAccelLevel() {
//}
function getLockState() {
    var locks = {
        lf:document.getElementById('LF').checked,
        rf:document.getElementById('RF').checked,
        lb:document.getElementById('LB').checked,
        rb:document.getElementById('RB').checked,
        ca:document.getElementById('Ca').checked,
        bg:document.getElementById('Bg').checked
    }
    console.log(locks);
    //мне за этот участок кода стыдно
    if(locks.lf)document.getElementById('LF__res').value = "Closed";
    else document.getElementById('LF__res').value = "Open";
    if(locks.rf)document.getElementById('RF__res').value = "Closed";
    else document.getElementById('RF__res').value = "Open";
    if(locks.lb)document.getElementById('LB__res').value = "Closed";
    else document.getElementById('LB__res').value = "Open";
    if(locks.rb)document.getElementById('RB__res').value = "Closed";
    else document.getElementById('RB__res').value = "Open";
    if(locks.ca)document.getElementById('Ca__res').value = "Closed";
    else document.getElementById('Ca__res').value = "Open";
    if(locks.bg)document.getElementById('Bg__res').value = "Closed";
    else document.getElementById('Bg__res').value = "Open";
}

function writeRes() {
    document.getElementById('hit__res').value=getHitLevel();
    getLockState();
}