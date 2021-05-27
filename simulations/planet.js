class Planet {

    constructor(pInst, x, y, z, wx, wy, wz, r, v, textr) {
        this.p = pInst;
        this.x = x;
        this.y = y;
        this.d = Math.sqrt(x*x+y*y);
        this.z = z;
        this.wx = wx;
        this.wy = wy;
        this.wz = wz;
        this.r = r;
        this.angle = 0;
        this.v = v
        this.textr = textr;
    }

    rotateAbout() {
        this.x = this.d * Math.cos(RAD*this.angle);
        this.y = this.d * Math.sin(RAD*this.angle);
    }

    increaseAngle() {
        this.angle += (1+this.v);
    }

    show() {
        this.p.translate(this.x, this.y, this.z);

        this.p.push();

        this.p.rotateX(this.p.frameCount*this.wx);
        this.p.rotateY(this.p.frameCount*this.wy);
        this.p.rotateZ(this.p.frameCount*this.wz);

        this.p.texture(this.textr);
        this.p.sphere(this.r);
        this.p.pop();
        this.p.translate(-this.x, -this.y, -this.z);
    }

}