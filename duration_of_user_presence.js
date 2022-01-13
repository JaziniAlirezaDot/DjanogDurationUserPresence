// add jquery refrence

let secon, mint, hour;

function get_last_page_duration() {
    let string_duration = sessionStorage.getItem('duration_presence');
    if (string_duration) {
        string_duration = JSON.parse(string_duration);
        secon = string_duration['second'];
        mint = string_duration['mint'];
        hour = string_duration['hour'];
    } else {
        secon = 0;
        mint = 0;
        hour = 0;
    }
}

function timer_cycle() {

    get_last_page_duration();

    secon++;
    if (secon == 60) {
        mint++;
        secon = 0;
    }
    if (mint == 60) {
        hour++;
        mint = 0;
    }
    const duration = {'second': secon, 'mint': mint, 'hour': hour};
    const string_duration = JSON.stringify(duration);
    sessionStorage.setItem('duration_presence', string_duration);
    // console.log(sessionStorage.getItem('duration_presence'));

    setTimeout("timer_cycle()", 1000);
}

timer_cycle()

function save_duration_presence() {
    const duration_presence = JSON.parse(sessionStorage.getItem('duration_presence'))
    const second = duration_presence['second']
    const mint = duration_presence['mint']
    const hour = duration_presence['hour']
    if (mint >= 1) {
        console.log(duration_presence);
        $.ajax({
            url: `/manager-duration-presence-user?second=${second}&mint=${mint}&hour=${hour}`,
            type: 'get',
            dataType: 'json',
            success: function (res) {
                sessionStorage.removeItem("duration_presence");
                console.log('remove');
            }
        });
    }
}

$(document).ready(function (e) {
    save_duration_presence()
});

document.addEventListener('mouseleave', e => {
    save_duration_presence()
});
