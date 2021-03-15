//javascript code 

$(function () {
    //variable
    var mode = 0; //App mode
    var timeCounter = 0; //time counter
    var lapCounter = 0; //lap counter
    var action; //variable for setInterval
    var lapNumber = 0; //number of laps
    //minutes,seconds,centiseconds for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

    //On App load show start and lap buttons
    hideshowButtons("#startButton", "#lapButton");

    //click on startButton
    $('#startButton').click(function () {
        //mode on
        mode = 1;
        //show stop and lap buttons
        hideshowButtons("#stopButton", "#lapButton");
        //start counter
        startAction();
    });




    //click on stopButton
    $('#stopButton').click(function () {
        //show resume and reset buttons
        hideshowButtons("#resumeButton", "#resetButton");
        //stop counter
        clearInterval(action);
    });


    //click on resumeButton
    $('#resumeButton').click(function () {
        //show resume and reset Buttons
        hideshowButtons("#stopButton", "#lapButton");
        //        start Counter
        startAction();
    });

    //start action

    //click on resetButton
    $('#resetButton').click(function () {
        //reload page
        location.reload();
    });


    //click on lapButton
    $('#lapButton').click(function () {
        //if mode is on
        if (mode) {
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }


    });


    //functions
    //    hideshowbuttons function shows two buttons
    function hideshowButtons(x, y) {
        $('.control').hide();
        $(x).show();
        $(y).show();
    }
    //    startAction function grows time counter by one each 
    function startAction() {
        action = setInterval(function () {
            timeCounter++;
            if (timeCounter == 100 * 60 * 100) {
                timeCounter = 0;
            }
            lapCounter++;
            if (lapCounter == 100 * 60 * 100) {
                lapCounter = 0;
            }
            updateTime();
        }, 10);

    }
    //    updateTime is going to convert counters to min,sec, and centisec
    function updateTime() {
        //        1min = 60*100centiseconds = 6000centiseceonds
        timeMinutes = Math.floor(timeCounter / 6000);
        //        1sec= 100centiseconds
        timeSeconds = Math.floor((timeCounter % 6000) / 100);
        timeCentiseconds = (timeCounter % 6000) % 100;
        $('#timeMinutes').text(timeMinutes);
        $('#timeSeconds').text(timeSeconds);
        $('#timeCentiseconds').text(timeCentiseconds);

        //        1 min = 60 * 100 centiseconds = 6000 centiseceonds
        lapMinutes = Math.floor(lapCounter / 6000);
        //        1sec= 100centiseconds
        lapSeconds = Math.floor((lapCounter % 6000) / 100);
        lapCentiseconds = (lapCounter % 6000) % 100;
        $('#lapMinutes').text(lapMinutes);
        $('#lapSeconds').text(lapSeconds);
        $('#lapCentiseconds').text(lapCentiseconds);


    }
    //format numbers
    function format(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }

    //addLap : print lap details inside the lap box 
    function addLap() {
        lapNumber++;
        var myLapDetails =
            '<div class="lap">' +
            '<div class="laptimetitle">' +
            'lap' + lapNumber +
            '</div>' +
            '<div class="laptime">' +
            '<span>' + format(lapMinutes) + '</span>' +
            ':<span>' + format(lapSeconds) + '</span>' +
            ':<span>' + format(lapCentiseconds) + '</span>' +
            '</div>' +
            '</div>';
        $(myLapDetails).prependTo("#laps");

    }

});
