function drawCross(p, cx, cy, len, col, th) {
    p.translate(cx, cy);
    p.stroke(col);
    p.strokeWeight(th);
    p.line(-len, len, len, -len);
    p.line(len, len, -len, -len);
    p.strokeWeight(1);
    p.translate(-cx, -cy);
}

function drawPlanet(p, x, y, col, r) {
    p.noStroke();
    p.fill(col);
    p.ellipse(x, y, r);
    p.strokeWeight(1);
}

function drawOrbit(p, x, y, r) {
    p.stroke(255);
    p.noFill();
    p.ellipse(x, y, r);
    p.fill(255);
    p.stroke(0);
}



// Epicycle
var Sim3 = function (p) {

    let thicc = 1;

    let dAngle = 0;
    let eAngle = 0;
    let qAngle = -1.057;
    let sAngle = 0;

    let dRadius;
    let eRadius = 40;
    let qRadius = 30;
    let sRadius;

    let dVel = 0.01;
    let eVel = 0.043;
    let sVel = 0.02;

    let earthCol;
    let marsCol;
    let sunCol;

    let history = [];
    let trailLEN = 200;

    let stopped = true;
    let stopBtn;

    let A12 = [];
    const N12 = [
        "Pesci", "Ariete",
        "Toro", "Gemelli",
        "Cancro", "Leone",
        "Vergine", "Bilancia",
        "Scorpione", "Sagittario",
        "Capricorno", "Acquario"
    ];
    const tSize = 15;

    p.setup = function () {
        var canvas = p.createCanvas(600, 600);
        canvas.parent('#sim3');

        dRadius = 0.15 * p.width;
        sRadius = 0.75 * p.width;

        earthCol = p.color(0, 122, 200);
        marsCol = p.color(236, 100, 0);

        sunCol = p.color(255, 200, 0);

        for (let i = 0; i < 12; i++) {
            A12.push(i * Math.PI / 6);
        }

        let C = document.getElementById('sim3').parentNode;
        stopBtn = document.createElement('button');
        stopBtn.innerHTML = "Ferma";
        stopBtn.addEventListener('mouseup', () => {
            stopped = !stopped;
        });
        C.appendChild(stopBtn);

    }


    p.draw = function () {

        p.background(0);
        p.translate(0.5 * p.width, 0.5 * p.height);

        // Vectors for planet and orbit movement
        let VS = p.createVector(0.5 * sRadius * Math.cos(sAngle), 0.5 * sRadius * Math.sin(sAngle));

        let VQ = p.createVector(qRadius * Math.cos(qAngle), qRadius * Math.sin(qAngle));
        let VD = p.createVector(dRadius * Math.cos(dAngle), dRadius * Math.sin(dAngle));
        let VE = p.createVector(eRadius * Math.cos(eAngle), eRadius * Math.sin(eAngle));

        let VP = p5.Vector.add(p5.Vector.add(VQ, VD), VE)

        // Constellations
        p.textSize(tSize);
        p.textAlign(p.CENTER, p.CENTER)
        p.fill(255);
        p.rectMode(p.CENTER)
        for (let i = 0; i < 12; i++) {
            let x = 0.45 * p.width * Math.cos(A12[i]);
            let y = -0.45 * p.width * Math.sin(A12[i]);
            p.text(N12[i], x, y);
        }

        // Sun Orbit
        drawOrbit(p, 0, 0, sRadius);

        // Sun
        drawPlanet(p, VS.x, VS.y, sunCol, 40);

        // Deferent
        p.translate(VQ.x, VQ.y)
        drawOrbit(p, 0, 0, 2 * dRadius);

        // Change SDR
        p.translate(VD.x, VD.y);
        // Epicycle
        drawOrbit(p, 0, 0, 2 * eRadius);
        // Planet
        drawPlanet(p, VE.x, VE.y, marsCol, 20);
        // Change SDR back
        p.translate(-VD.x, -VD.y);

        p.translate(-VQ.x, -VQ.y)

        // Earth
        drawPlanet(p, 0, 0, earthCol, 20)

        // Equant
        drawCross(p, 2 * VQ.x, 2 * VQ.y, 5, earthCol, thicc);

        // Eccentric
        drawPlanet(p, VQ.x, VQ.y, 127, 10);


        if (!stopped) {
            // Mars Trail
            history.push(VP)
            if (history.length >= trailLEN) {
                history.splice(0, 1);
            }
            p.stroke(marsCol);
            p.beginShape();
            for (let i = 0; i < history.length; i++) {
                let pos = history[i];
                p.noFill();
                p.vertex(pos.x, pos.y);
                p.endShape();
            }

            // Update
            dAngle -= dVel;
            if (dAngle <= -2 * Math.PI) {
                dAngle = 0;
            }
            eAngle -= eVel;
            if (eAngle <= -2 * Math.PI) {
                eAngle = 0;
            }
            sAngle -= sVel;
            if (sAngle <= -2 * Math.PI) {
                sAngle = 0;
            }
        }

    }

}

let s = new p5(Sim3)