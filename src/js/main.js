let start
let elements = []
let config_stick

function elementsConnect() {
    elements.push(document.getElementById("A"))
    elements.push(document.getElementById("B"))
    elements.push(document.getElementById("X"))
    elements.push(document.getElementById("Y"))
    elements.push(document.getElementById("LB"))
    elements.push(document.getElementById("RB"))
    elements.push(document.getElementById("LT"))
    elements.push(document.getElementById("RT"))
    elements.push(document.getElementById("SELECT"))
    elements.push(document.getElementById("START"))
    elements.push(document.getElementById("LEFT_STICK"))
    elements.push(document.getElementById("RIGHT_STICK"))
    elements.push(document.getElementById("UP_PAD"))
    elements.push(document.getElementById("DOWN_PAD"))
    elements.push(document.getElementById("LEFT_PAD"))
    elements.push(document.getElementById("RIGHT_PAD"))

    for(let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("fill-opacity", "0");
    }

}

function configSticks() {
    let sticks = [document.getElementById("LEFT_STICK"), document.getElementById("RIGHT_STICK")]
    let death_point = [parseFloat(sticks[0].getAttribute("cx")), parseFloat(sticks[0].getAttribute("cy"))]
    config_stick = {
        sticks: sticks,
        death_point: death_point,
        r: 7
    }

}

function displaySticks(axes) {
    if(Math.abs(axes[0]) < 0.1) {
        config_stick.sticks[0].setAttribute("cx", String(config_stick.death_point[0]))
    } else {
        config_stick.sticks[0].setAttribute("cx", String(config_stick.death_point[0] + (axes[0] * config_stick.r)))
    }
    if(Math.abs(axes[1]) < 0.1) {
        config_stick.sticks[0].setAttribute("cy", String(config_stick.death_point[1]))
    } else {
        config_stick.sticks[0].setAttribute("cy", String(config_stick.death_point[1] + (axes[1] * config_stick.r)))
    }
    if(Math.abs(axes[2]) < 0.1) {
        config_stick.sticks[1].setAttribute("cx", String(config_stick.death_point[0]))
    } else {
        config_stick.sticks[1].setAttribute("cx", String(config_stick.death_point[0] + (axes[2] * config_stick.r)))
    }
    if(Math.abs(axes[3]) < 0.1) {
        config_stick.sticks[1].setAttribute("cy", String(config_stick.death_point[1]))
    } else {
        config_stick.sticks[1].setAttribute("cy", String(config_stick.death_point[1] + (axes[3] * config_stick.r)))
    }

}

function gameLoop() {
    let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads) {
        return;
    }
    let gp = gamepads[0]
    displaySticks(gp.axes)
    for(let i = 0; i < gp.buttons.length - 1; i++) {
        
        elements[i].setAttribute("fill-opacity", String(gp.buttons[i].value));
    }


    requestAnimationFrame(gameLoop)
}

window.onload = function() {
    configSticks()
    elementsConnect()
    window.addEventListener("gamepadconnected", function(e) {
        gameLoop()
    });
}