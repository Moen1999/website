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

const text = "Portfolio@Kristian-Moen:~$ "
let i = 0

function typewriter() {
    if (i < text.length) {
        document.getElementById("typewriter").textContent += text.charAt(i);
        i++;
        setTimeout(typewriter, 100);
    }
}

// Function to load different sections when folders are clicked
function loadSection(section) {
    const typewriterElement = document.getElementById("typewriter");
    
    // Clear current content and reset
    typewriterElement.textContent = "";
    i = 0;
    
    // Start typing the command
    const command = `cd ${section}/`;
    typeCommand(command, () => {
        // After typing command, show section content
        setTimeout(() => {
            showSectionContent(section);
        }, 500);
    });
}

function typeCommand(command, callback) {
    const fullCommand = `Portfolio@Kristian-Moen:~$ ${command}`;
    let commandIndex = 0;
    
    function typeCommandChar() {
        if (commandIndex < fullCommand.length) {
            document.getElementById("typewriter").textContent += fullCommand.charAt(commandIndex);
            commandIndex++;
            setTimeout(typeCommandChar, 50);
        } else {
            callback();
        }
    }
    
    typeCommandChar();
}

function showSectionContent(section) {
    const typewriterElement = document.getElementById("typewriter");
    typewriterElement.innerHTML += "<br><br>";
    
    let content = "";
    
    switch(section) {
        case 'about':
            content = `About Kristian Moen
========================

I am currently pursuing a Master's in Computer Science,
driven by a passion to understand the fundamental aspects
of computing systems from the ground up.

My journey involves building things from scratch to gain
deep insights into the core concepts that power modern
technology.`;
            break;
            
        case 'projects':
            content = `Current Projects
================

🖥️  Operating Systems Deep Dive
   Building a minimal OS kernel

🌐 Web Development Portfolio
   This terminal-style website

🔧 System Programming Tools
   Command-line utilities in Rust and C++`;
            break;
            
        case 'articles':
            content = `Technical Articles
==================

📝 "Building an OS from Scratch"
   My journey into kernel development

📝 "Understanding Memory Management"
   Deep dive into virtual memory

📝 "Modern Web Architecture"
   Exploring full-stack development

📝 "System Programming in Rust"
   Why Rust is perfect for systems work`;
            break;
    }
    
    typewriterElement.innerHTML += `<pre>${content}</pre>`;
}

window.onload = typewriter