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

// Animation sequences
let mainPromptText = "Portfolio@Kristian-Moen:~$ ";

// Cursor management
class CursorManager {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.currentElement = null;
    }

    moveTo(element) {
        // Remove cursor from current location
        if (this.cursor.parentNode) {
            this.cursor.parentNode.removeChild(this.cursor);
        }
        
        // Add cursor to new location
        this.currentElement = element;
        element.appendChild(this.cursor);
    }

    hide() {
        if (this.cursor) {
            this.cursor.style.display = 'none';
        }
    }

    show() {
        if (this.cursor) {
            this.cursor.style.display = 'inline-block';
        }
    }
}

// Global cursor manager
const cursorManager = new CursorManager();

// Typewriter class for reusable animation
class Typewriter {
    constructor(elementId, text, speed = 100) {
        this.element = document.getElementById(elementId);
        this.text = text;
        this.speed = speed;
        this.index = 0;
        
        // Debug: Check if element exists
        if (!this.element) {
            console.error(`Element with ID '${elementId}' not found!`);
        } else {
            console.log(`Element '${elementId}' found successfully`);
        }
    }

    async type() {
        if (!this.element) {
            console.error("Cannot type - element not found");
            return;
        }

        // Move cursor to this element
        cursorManager.moveTo(this.element);
        
        return new Promise((resolve) => {
            const typeChar = () => {
                if (this.index < this.text.length) {
                    // Remove cursor temporarily
                    if (cursorManager.cursor.parentNode === this.element) {
                        this.element.removeChild(cursorManager.cursor);
                    }
                    
                    // Add character
                    this.element.textContent += this.text.charAt(this.index);
                    
                    // Add cursor back
                    this.element.appendChild(cursorManager.cursor);
                    
                    this.index++;
                    setTimeout(typeChar, this.speed);
                } else {
                    resolve();
                }
            };
            typeChar();
        });
    }

    async typeHTML() {
        if (!this.element) {
            console.error("Cannot type HTML - element not found");
            return;
        }

        // Move cursor to this element
        cursorManager.moveTo(this.element);
        
        return new Promise((resolve) => {
            const typeChar = () => {
                if (this.index < this.text.length) {
                    // Remove cursor temporarily
                    if (cursorManager.cursor.parentNode === this.element) {
                        this.element.removeChild(cursorManager.cursor);
                    }
                    
                    // Add character
                    this.element.innerHTML += this.text.charAt(this.index);
                    
                    // Add cursor back
                    this.element.appendChild(cursorManager.cursor);
                    
                    this.index++;
                    setTimeout(typeChar, this.speed);
                } else {
                    resolve();
                }
            };
            typeChar();
        });
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM loaded, starting animations...");
    
    // Debug: Check what elements exist
    console.log("Available elements:");
    console.log("last-login:", document.getElementById("last-login"));
    console.log("main-typewriter:", document.getElementById("main-typewriter"));
    console.log("sidebar-typewriter:", document.getElementById("sidebar-typewriter"));
    console.log("content-area:", document.getElementById("content-area"));
    
    // Set up login date
    const loginElement = document.getElementById("last-login");
    if (loginElement) {
        const now = new Date();
        const loginMessage = formatLoginDate(now);
        loginElement.textContent = loginMessage;
        console.log("Login message set");
    } else {
        console.error("last-login element not found");
    }

    // Start animations in sequence
    await startAnimations();
});

async function startAnimations() {
    console.log("Starting main typewriter animation...");
    
    // First, type the main prompt
    const mainTypewriter = new Typewriter("main-typewriter", mainPromptText, 100);
    await mainTypewriter.type();
    
    console.log("Main typewriter finished");

    // Small delay before sidebar animation
    await delay(500);

    // Then animate the sidebar
    await animateSidebar();
}

async function animateSidebar() {
    console.log("Starting sidebar animation...");
    
    const sidebarElement = document.getElementById("sidebar-typewriter");
    if (!sidebarElement) {
        console.error("sidebar-typewriter element not found!");
        return;
    }
    
    // Type "ls" command
    const lsTypewriter = new Typewriter("sidebar-typewriter", "ls\n", 80);
    await lsTypewriter.typeHTML();
    
    console.log("ls command typed");
    
    // Small delay after ls command
    await delay(300);
    
    // Add folders one by one with click functionality
    const folders = [
        { name: "about/", section: "about" },
        { name: "projects/", section: "projects" },
        { name: "articles/", section: "articles" }
    ];

    for (const folder of folders) {
        console.log(`Typing folder: ${folder.name}`);
        await typeClickableFolder(folder.name, folder.section);
        await delay(200);
    }
    
    console.log("All folders typed");
}

async function typeClickableFolder(folderName, section) {
    const sidebarElement = document.getElementById("sidebar-typewriter");
    if (!sidebarElement) {
        console.error("sidebar-typewriter element not found!");
        return;
    }
    
    // Create a container for this folder line
    const folderLine = document.createElement("div");
    
    // Create clickable folder element
    const folderSpan = document.createElement("span");
    folderSpan.className = "folder";
    folderSpan.onclick = () => loadSection(section);
    
    // Add the folder line to sidebar
    sidebarElement.appendChild(folderLine);
    folderLine.appendChild(folderSpan);
    
    // Move cursor to the folder span for typing
    cursorManager.moveTo(folderSpan);
    
    // Type each character of the folder name
    for (let i = 0; i < folderName.length; i++) {
        // Remove cursor temporarily
        if (cursorManager.cursor.parentNode === folderSpan) {
            folderSpan.removeChild(cursorManager.cursor);
        }
        
        // Add character to folder span
        folderSpan.textContent += folderName.charAt(i);
        
        // Add cursor back
        folderSpan.appendChild(cursorManager.cursor);
        
        await delay(80);
    }
    
    // Remove cursor from this folder and move it to sidebar for next folder
    if (cursorManager.cursor.parentNode === folderSpan) {
        folderSpan.removeChild(cursorManager.cursor);
    }
    
    // Move cursor back to sidebar for next folder
    cursorManager.moveTo(sidebarElement);
}

// Function to load different sections when folders are clicked
async function loadSection(section) {
    console.log(`Loading section: ${section}`);
    
    const contentArea = document.getElementById("content-area");
    if (!contentArea) {
        console.error("content-area element not found!");
        return;
    }
    
    // Clear current content
    contentArea.innerHTML = "";
    
    // Type the command
    const command = `cd ${section}/\n\n`;
    const commandTypewriter = new Typewriter("content-area", command, 50);
    await commandTypewriter.typeHTML();
    
    // Show section content
    const content = getSectionContent(section);
    const contentTypewriter = new Typewriter("content-area", content, 30);
    await contentTypewriter.typeHTML();
}

function getSectionContent(section) {
    switch(section) {
        case 'about':
            return `About Kristian Moen
========================

I am currently pursuing a Master's in Computer Science,
driven by a passion to understand the fundamental aspects
of computing systems from the ground up.

My journey involves building things from scratch to gain
deep insights into the core concepts that power modern
technology.

Education & Background:
• Master's in Computer Science (In Progress)
• Focus on Systems Architecture & Low-level Programming
• Self-taught in multiple programming languages

Technical Skills:
• Languages: JavaScript, Python, C++, Rust, Java
• Web: React, Node.js, HTML/CSS, REST APIs
• Systems: Linux, Docker, Git, CI/CD
• Databases: PostgreSQL, MongoDB, Redis`;

        case 'projects':
            return `Current Projects
================

🖥️  Operating Systems Deep Dive
   Building a minimal OS kernel to understand:
   • Memory management (paging, heap allocation)
   • Process scheduling (round-robin, priority)
   • File system basics (FAT32-like)
   • Device drivers (keyboard, display)
   
   Technologies: Assembly (x86-64), C, QEMU, GDB
   Status: In Progress 🚧

🌐 Web Development Portfolio
   This terminal-style website you're browsing!
   
   Features:
   • Interactive terminal-style navigation
   • Typewriter effects and animations
   • Responsive design
   • File system metaphor
   
   Technologies: HTML, CSS, JavaScript

🔧 System Programming Tools
   Creating command-line utilities to understand
   system programming concepts:
   
   • Custom shell (bash-like)
   • File compression utility
   • Network packet analyzer
   • System monitor (htop-like)
   
   Languages: Rust, C++, Python`;

        case 'articles':
            return `Technical Articles & Learning Journey
=====================================

📝 "Building an OS from Scratch"
   My ongoing journey into kernel development
   Topics: bootloaders, memory management, scheduling
   
📝 "Understanding Memory Management" 
   Deep dive into virtual memory systems
   Topics: paging, segmentation, heap allocation
   
📝 "Modern Web Architecture"
   Exploring full-stack development patterns
   Topics: MVC, microservices, database design
   
📝 "System Programming in Rust"
   Why Rust is perfect for systems work
   Topics: memory safety, zero-cost abstractions
   
📝 "The Terminal Interface Renaissance"
   Why command-line interfaces are making a comeback
   Topics: developer tools, productivity, aesthetics

📝 "From Assembly to Abstractions"
   Understanding the layers of computing
   Topics: assembly, compilers, runtime systems

Status: Most articles are works in progress as I document
my learning journey through computer science fundamentals.`;

        default:
            return "Section not found.";
    }
}

// Utility function for delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}