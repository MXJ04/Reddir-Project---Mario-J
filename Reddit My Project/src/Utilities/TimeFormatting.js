const Time = {
    postFormatting: function(sincePosted, posted) {
        if(sincePosted <= 59) {
            return posted = Math.floor(sincePosted);
        }
        if(sincePosted >= 60 && sincePosted <= 1439) {
            return posted = Math.floor(sincePosted / 60);
        }
        if(sincePosted >= 1440 && sincePosted <= 10079) {
            return posted = Math.floor(sincePosted / 1440);
        }
        if(sincePosted >= 10080 && sincePosted <= 40320) {
            return posted = Math.floor(sincePosted / 10080);
        }
        if(sincePosted >= 40320 && sincePosted <= 483839) {
            return posted = Math.floor(sincePosted / 40320);
        }
        if(sincePosted >= 483840) {
            return posted = Math.floor(sincePosted / 483840);
        }
    },
    unitFormatting: function(sincePosted, units){
        if(sincePosted <= 1) {
            return units = "minute"}
        if(sincePosted >= 2 && sincePosted <= 59) {
            return units = "minutes"}
        if(sincePosted >= 60 && sincePosted <= 119) {
            return units = "hour"}
        if(sincePosted >= 120 && sincePosted <= 1439) {
            return units = "hours"}
        if(sincePosted > 1439 && sincePosted <= 2879) {
            return units = "day"}
        if(sincePosted > 2879 && sincePosted <= 10079) {
            return units = "days"}
        if(sincePosted > 10079 && sincePosted <= 21559) {
            return units = "week"}
        if(sincePosted > 21559 && sincePosted <= 40319) {
            return units = "weeks"}
        if(sincePosted > 40319 && sincePosted <= 86239) {
            return units = "month"}
        if(sincePosted > 86239 && sincePosted <= 483839) {
            return units = "months"
        }
        if(sincePosted > 483839 && sincePosted <= 967679) {
            return units = "year"}
        if(sincePosted > 967680) {
            return units = "years"
        }
        
    }

    
}
/*if(sincePosted <= 59) {
        posted = sincePosted;
        posted = Math.floor(posted);
        if(posted === 1) {units = "minute"}
        else {units = "minutes"}
    }
    if(sincePosted >= 60 && sincePosted <= 1439) {
        posted = sincePosted / 60;
        posted = Math.floor(posted);
        if(posted < 2) {units = "hour"}
        else {units = "hours"}
    }
    if(sincePosted >= 1440 && sincePosted <= 10079) {
        posted = sincePosted / 1440;
        posted = Math.floor(posted);
        if(posted < 2) {units = "day"}
        else {units = "days"}
    }
    if(sincePosted >= 10080 && sincePosted <= 40320) {
        posted = sincePosted / 10080;
        posted = Math.floor(posted);
        if(posted < 2) {units = "week"}
        else {units = "weeks"}
    }
    if(sincePosted >= 40320 && sincePosted <= 483839) {
        posted = sincePosted / 40320;
        posted = Math.floor(posted);
        if(posted < 2) {units = "month"}
        else {units = "months"}
    }
    if(sincePosted >= 483840) {
        posted = sincePosted / 483840;
        posted = Math.floor(posted);
        if(posted < 2) {units = "year"}
        else {units = "years"}
    }

*/
export default Time;
