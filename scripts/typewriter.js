


function formatLoginDate(date) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const weekday = weekdays[date.getDay()];
    const month   = months[date.getMonth()];
    const day     = date.getDate();
    const hour    = String(date.getHours()).padStart(2, '0');
    const minute  = String(date.getMinutes()).padStart(2, '0');
    const second  = String(date.getSeconds()).padStart(2, '0');

    return `Last login: ${weekday} ${month} ${day} ${hour}:${minute}:${second}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    const loginMessage = formatLoginDate(now);
    document.getElementById("last-login").textContent = loginMessage;
});

const text = "Portfolio@Kristian-Moen"
let i = 0

function typewriter() {
    if (i <text.length) {
        document.getElementById("typewriter").textContent += text.charAt(i);
        i++
        setTimeout(typewriter,100);
    }
}


window.onload = typewriter

