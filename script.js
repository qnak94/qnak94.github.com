/**
 * Created by Антон on 27.03.2017.
 */
var d = new Date();
var n = d.getTime();
var shots = 3;
var key_on,key_off;
var state = 'guarded';

function set_state(element,state){

    var state, element;
    var type = document.getElementById(element).getAttribute("type");
    if(type == 'button') {
        if (state == 'inactive') {
            document.getElementById(element).setAttribute("disabled", true);
            document.getElementById(element).style.backgroundColor = "#eee";
        }
        else if (state == 'active') {
            document.getElementById(element).removeAttribute("disabled");
            document.getElementById(element).style.backgroundColor = "green";
        }
    }
    else if(type == 'input') {
            if (state == 'inactive') {
                document.getElementById(element).setAttribute("disabled", true);
                document.getElementById(element).style.backgroundColor = "#eee";
            }
            else if (state == 'active') {
                document.getElementById(element).removeAttribute("disabled");
                document.getElementById(element).style.backgroundColor = "#fff";
            }

    }

}
set_state('lock__button', 'inactive');
set_state('unlock__button', 'inactive');
set_state('show__button', 'inactive');
set_state('input__lock', 'inactive');
set_state('input__unlock', 'inactive');
function start() {
    setInterval(writeRes, 1000);
    generate_lock_key();
    generate_unlock_key();
    set_state('unlock__button', 'active');
    set_state('lock__button', 'inactive');
    set_state('show__button', 'active');
    set_state('input__unlock', 'active');
    set_state('input__lock', 'inactive');

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
        lf:document.getElementById('left__door__lock').checked,
        rf:document.getElementById('right__door__lock').checked,
        ca:document.getElementById('capote__lock').checked,
        bg:document.getElementById('trunk__lock').checked
    }
    //console.log(locks);
    //мне за этот участок кода стыдно
    if(locks.lf)document.getElementById('left__door__lock__res').value = "Closed";
    else document.getElementById('left__door__lock__res').value = "Open";
    if(locks.rf)document.getElementById('right__door__lock__res').value = "Closed";
    else document.getElementById('right__door__lock__res').value = "Open";
    if(locks.ca)document.getElementById('capote__lock__res').value = "Closed";
    else document.getElementById('capote__lock__res').value = "Open";
    if(locks.bg)document.getElementById('trunk__lock__res').value = "Closed";
    else document.getElementById('trunk__lock__res').value = "Open";
}
function getDoorsState() {
    var doors = {
        lf:document.getElementById('left__door').checked,
        rf:document.getElementById('right__door').checked,
        ca:document.getElementById('capote').checked,
        bg:document.getElementById('trunk').checked
    }
    //console.log(doors);
    //мне за этот участок кода стыдно, еще стыднее
    if(doors.lf){//закрыта левая дверь
        document.getElementById('left__door__res').value = "Closed";

        if(doors.rf){//закрыта правая дверь
            document.getElementById('right__door__res').value = "Closed";

            if(doors.ca){//закрыт капот
                document.getElementById('capote__res').value = "Closed";

                if(doors.bg){//закрыт багажник
                    document.getElementById('trunk__res').value = "Closed";
                    document.getElementById('left__side').src="img/left_side/left_side.png";
                    document.getElementById('right__side').src="img/right_side/right_side.png";
                }
                else{//открыт багажник
                    document.getElementById('trunk__res').value = "Open";
                    document.getElementById('left__side').src="img/left_side/left_side_trunk.png";
                    document.getElementById('right__side').src="img/right_side/right_side_trunk.png";
                }
            }
            else{//открыт капот
                document.getElementById('capote__res').value = "Open";

                if(doors.bg){//закрыт багажник
                    document.getElementById('trunk__res').value = "Closed";
                    document.getElementById('left__side').src="img/left_side/left_side_capote.png";
                    document.getElementById('right__side').src="img/right_side/right_side_capote.png";
                }
                else{//открыт багажник
                    document.getElementById('trunk__res').value = "Open";
                    document.getElementById('left__side').src="img/left_side/left_side_capote&trunk.png";
                    document.getElementById('right__side').src="img/right_side/right_side_capote&trunk.png";
                }
            }

        }
        else{//открыта правая дверь
            document.getElementById('right__door__res').value = "Open";

            if(doors.ca){//закрыт капот
                document.getElementById('capote__res').value = "Closed";

                if(doors.bg){//закрыт багажник
                    document.getElementById('trunk__res').value = "Closed";
                    document.getElementById('left__side').src="img/left_side/left_side.png";
                    document.getElementById('right__side').src="img/right_side/right_side_door.png";
                }
                else{//открыт багажник
                    document.getElementById('trunk__res').value = "Open";
                    document.getElementById('left__side').src="img/left_side/left_side_trunk.png";
                    document.getElementById('right__side').src="img/right_side/right_side_trunk&door.png";
                }
            }
            else{//открыт капот
                document.getElementById('capote__res').value = "Open";

                if(doors.bg){//закрыт багажник
                    document.getElementById('trunk__res').value = "Closed";
                    document.getElementById('left__side').src="img/left_side/left_side_capote.png";
                    document.getElementById('right__side').src="img/right_side/right_side_capote&door.png";
                }
                else{//открыт багажник
                    document.getElementById('trunk__res').value = "Open";
                    document.getElementById('left__side').src="img/left_side/left_side_capote&trunk.png";
                    document.getElementById('right__side').src="img/right_side/right_side_capote&trunk&door.png";
                }
            }
        }
    }
    else{//открыта левая дверь
        document.getElementById('left__door__res').value = "Open";

        if(doors.rf){//закрыта правая дверь
            document.getElementById('right__door__res').value = "Closed";

            if(doors.ca){//закрыт капот
                document.getElementById('capote__res').value = "Closed";

                if(doors.bg){//закрыт багажник
                    document.getElementById('trunk__res').value = "Closed";
                    document.getElementById('left__side').src="img/left_side/left_side_door.png";
                    document.getElementById('right__side').src="img/right_side/right_side.png";
                }
                else{//открыт багажник
                    document.getElementById('trunk__res').value = "Open";
                    document.getElementById('left__side').src="img/left_side/left_side_trunk&door.png";
                    document.getElementById('right__side').src="img/right_side/right_side_trunk.png";
                }
            }
            else{//открыт капот
                document.getElementById('capote__res').value = "Open";

                if(doors.bg){//закрыт багажник
                    document.getElementById('trunk__res').value = "Closed";
                    document.getElementById('left__side').src="img/left_side/left_side_capote&door.png";
                    document.getElementById('right__side').src="img/right_side/right_side_capote.png";
                }
                else{//открыт багажник
                    document.getElementById('trunk__res').value = "Open";
                    document.getElementById('left__side').src="img/left_side/left_side_capote&trunk&door.png";
                    document.getElementById('right__side').src="img/right_side/right_side_capote&trunk.png";
                }
            }
        }
        else{//открыта правая дверь
            document.getElementById('right__door__res').value = "Open";

            if(doors.ca){//закрыт капот
                document.getElementById('capote__res').value = "Closed";

                if(doors.bg){//закрыт багажник
                    document.getElementById('trunk__res').value = "Closed";
                    document.getElementById('left__side').src="img/left_side/left_side_door.png";
                    document.getElementById('right__side').src="img/right_side/right_side_door.png";
                }
                else{//открыт багажник
                    document.getElementById('trunk__res').value = "Open";
                    document.getElementById('left__side').src="img/left_side/left_side_trunk&door.png";
                    document.getElementById('right__side').src="img/right_side/right_side_trunk&door.png";
                }
            }
            else{//открыт капот
                document.getElementById('capote__res').value = "Open";

                if(doors.bg){//закрыт багажник
                    document.getElementById('trunk__res').value = "Closed";
                    document.getElementById('left__side').src="img/left_side/left_side_capote&door.png";
                    document.getElementById('right__side').src="img/right_side/right_side_capote&door.png";
                }
                else{//открыт багажник
                    document.getElementById('trunk__res').value = "Open";
                    document.getElementById('left__side').src="img/left_side/left_side_capote&trunk&door.png";
                    document.getElementById('right__side').src="img/right_side/right_side_capote&trunk&door.png";
                }
            }
        }
    }

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
    getDoorsState();
    getAccelLevel();
    getDistanceState();
    getScopeState();

}
function generate_lock_key() {
    var x_low = Math.abs(Math.round((Math.random() + n / Math.pow(2, 43)) * Math.pow(2, 31)));
    var x_high = Math.abs(Math.round((Math.random() + n / Math.pow(2, 43)) * Math.pow(2, 31)));
    key_on = Number(x_low).toString(16).concat(Number(x_high).toString(16));
    document.getElementById('current__lock').value = key_on;
    document.getElementById('input__lock').value = key_on;
}
function generate_unlock_key() {
    var x_low = Math.abs(Math.round((Math.random()+n/Math.pow(2, 43)) * Math.pow(2, 31)));
    var x_high = Math.abs(Math.round((Math.random()+n/Math.pow(2, 43)) * Math.pow(2, 31)));
    key_off = Number(x_low).toString(16).concat(Number(x_high).toString(16));
    document.getElementById('current__unlock').value = key_off;
    document.getElementById('input__unlock').value = key_off;
}
function lock() {
    if(document.getElementById('current__lock').value == document.getElementById('input__lock').value)
    {
        generate_lock_key();
        state = 'locked';
        set_state('input__lock','inactive');
        set_state('lock__button', 'inactive');
        set_state('input__unlock','active');
        set_state('unlock__button', 'active');

    }
    else{
        console.log(shots);
        if(shots==0){ //если попытки закончились
            set_state('input__lock','inactive');
            set_state('input__unlock','inactive');
            set_state('lock__button', 'inactive');
            set_state('unlock__button', 'inactive');
            set_state('show__button', 'inactive');

            setTimeout(timer,1000);
            var time = 20;
            function timer(){
                if(time!=0){
                    time--;
                    document.getElementById('info_message').innerHTML="Cooldown: " + time;
                    console.log(time);
                    setTimeout(timer,1000);
                }
                else {
                    setTimeout(function(){}, 1000);
                    document.getElementById('text__closed').innerHTML="Закрытие";

                    set_state('input__lock','active');
                    set_state('lock__button', 'active');
                    set_state('unlock__button', 'active');
                    set_state('show__button', 'active');

                    shots = 3;
                    console.log(shots);
                    document.getElementById('input__lock').value = key_on;
                }
            }

        }
        else{ // если количество попыток не равно 0
            document.getElementById('info_message').innerHTML="Количество попыток: " + shots;
            shots--; //то уменьшаем на 1 попытку
            console.log(shots);
        }
        // var shots = 3;.setAttribute("id", "uniqueIdentifsetAttribute("disabled", false)
        // setAttribute("style", "color: red;")
        // document.body.style.backgroundColor = "#FF0000";
    }

}
function unlock() {
    if(document.getElementById('current__unlock').value == document.getElementById('input__unlock').value)
    {
        generate_unlock_key();
        state = 'unlocked';
        set_state('input__unlock','inactive');
        set_state('unlock__button', 'inactive');
        set_state('input__lock','active');
        set_state('lock__button', 'active');
    }
    else{
        console.log(shots);
        if(shots==0){ //если попытки закончились
            set_state('input__lock','inactive');
            set_state('input__unlock','inactive');
            set_state('lock__button', 'inactive');
            set_state('unlock__button', 'inactive');
            set_state('show__button', 'inactive');
            setTimeout(timer,1000);
            var time = 20;
            function timer(){
                if(time!=0){
                    time--;
                    document.getElementById('info_message').innerHTML="Cooldown: " + time;
                    console.log(time);
                    setTimeout(timer,1000);
                }
                else {
                    setTimeout(function(){}, 1000);
                    document.getElementById('text__closed').innerHTML="Закрытие";

                    set_state('input__unlock','active');
                    set_state('lock__button', 'active');
                    set_state('unlock__button', 'active');
                    set_state('show__button', 'active');

                    shots = 3;
                    console.log(shots);
                    document.getElementById('input__unlock').value = key_off;
                }
            }

        }
        else{ // если количество попыток не равно 0
            document.getElementById('info_message').innerHTML="Количество попыток: " + shots;
            shots--; //то уменьшаем на 1 попытку
            console.log(shots);
        }
        // var shots = 3;.setAttribute("id", "uniqueIdentifsetAttribute("disabled", false)
        // setAttribute("style", "color: red;")
        // document.body.style.backgroundColor = "#FF0000";
    }

}