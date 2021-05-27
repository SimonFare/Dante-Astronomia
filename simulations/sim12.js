const RAD = Math.PI / 180
const defDIM = 300;
const defFOV = 1 / 3;

let textures = [];
let stars;

function loadTextures(p, mode) {
    stars = p.loadImage("textures/2k_stars.jpg");
    if (mode == "Geo") {
        textures[0] = p.loadImage("textures/2k_earth_daymap.jpg");
        textures[1] = p.loadImage("textures/2k_moon.jpg");
        textures[2] = p.loadImage("textures/2k_mercury.jpg");
        textures[3] = p.loadImage("textures/2k_venus_surface.jpg");
        textures[4] = p.loadImage("textures/2k_sun.jpg");
        textures[5] = p.loadImage("textures/2k_mars.jpg");
        textures[6] = p.loadImage("textures/2k_jupiter.jpg");
        textures[7] = p.loadImage("textures/2k_saturn.jpg");
    } else if (mode == "Elio") {
        textures[0] = p.loadImage("textures/2k_sun.jpg");
        textures[1] = p.loadImage("textures/2k_mercury.jpg");
        textures[2] = p.loadImage("textures/2k_venus_surface.jpg");
        textures[3] = p.loadImage("textures/2k_earth_daymap.jpg");
        textures[4] = p.loadImage("textures/2k_mars.jpg");
        textures[5] = p.loadImage("textures/2k_jupiter.jpg");
        textures[6] = p.loadImage("textures/2k_saturn.jpg");
        textures[7] = p.loadImage("textures/2k_uranus.jpg");
        textures[8] = p.loadImage("textures/2k_neptune.jpg");
    }
}

function constructBackgroundPlane(p, img) {
    p.translate(0, 0, 0);
    p.push();
    p.texture(img);
    p.plane(1000);
    p.pop();
    p.translate(0, 0, 0);
}

function constructPurgatory(p, earthSZ) {
    p.translate(0, -earthSZ, 0);
    p.push();
    p.normalMaterial();
    p.cone(0.6 * earthSZ, -earthSZ, 10, 3, false);
    p.pop();
    p.translate(0, earthSZ, 0);
}

let stopped = true;
let stopBtn;

window.addEventListener('load', () => {
    let C = document.getElementById('sim1').parentNode.parentNode;
    stopBtn = document.createElement('button');
    stopBtn.innerHTML = "Ferma";
    stopBtn.addEventListener('mouseup', () => {
        stopped = !stopped;
    });
    C.appendChild(stopBtn);
});

// Geocentric model
var Sim1 = function (p) {

    let sizes = [30, 15, 15, 25, 50, 30, 50, 40, 0];
    let velos = [0, 1, 0.9, 0.8, 0.5, 0.4, 0.5, 0.3];
    let bodies = [];

    p.setup = function () {

        loadTextures(p, "Geo");

        let dim = defDIM;
        var canvas = p.createCanvas(dim, dim, p.WEBGL);
        canvas.parent('#sim1');
        p.perspective(Math.PI * 0.4);

        for (let i = 0; i < textures.length; i++) {
            sizes[i] *= dim / defDIM;
        }

        let dist = 0;
        for (let i = 0; i < textures.length; i++) {
            bodies[i] = new Planet(
                p,
                Math.pow(-1, i) * dist, 0, 0,
                0, (textures.length - i + 0.5) / 80, 0,
                sizes[i], velos[i],
                textures[i]
            );
            dist += sizes[i] + 2 * sizes[i + 1] + (i == 0 ? 10 : 0);
        }

    };

    p.draw = function () {
        p.background(0);
        constructBackgroundPlane(p, stars);
        constructPurgatory(p, sizes[0]);

        bodies.forEach(b => {
            b.show()
        });

        if (!stopped) {
            bodies.forEach(b => {
                b.rotateAbout();
                b.increaseAngle();
            });
        }
    };

}

// Heliocentric model
var Sim2 = function (p) {

    let sizes = [50, 15, 25, 30, 30, 50, 40, 30, 30, 0];
    let velos = [0, 1, 0.9, 0.8, 0.2, 0.7, 0.3, 0.4];
    let bodies = [];

    p.setup = function () {

        loadTextures(p, "Elio");

        let dim = defDIM;
        var canvas = p.createCanvas(dim, dim, p.WEBGL);
        canvas.parent('#sim2');
        p.perspective(Math.PI * 0.4);

        for (let i = 0; i < textures.length; i++) {
            sizes[i] *= dim / defDIM;
        }

        let dist = 0;
        for (let i = 0; i < textures.length; i++) {
            bodies[i] = new Planet(
                p,
                Math.pow(-1, i) * dist, 0, 0,
                0, (textures.length - i + 0.5) / 80, 0,
                sizes[i], velos[i],
                textures[i]
            );
            dist += sizes[i] + 2 * sizes[i + 1] + (i == 0 ? 10 : 0);
        }

    };

    p.draw = function () {
        p.background(0);
        constructBackgroundPlane(p, stars);

        bodies.forEach(b => {
            b.show()
        });

        if (!stopped) {
            bodies.forEach(b => {
                b.rotateAbout();
                b.increaseAngle();
            });
        }
    };

}

let firstSim = new p5(Sim1);
let secondSim = new p5(Sim2);
