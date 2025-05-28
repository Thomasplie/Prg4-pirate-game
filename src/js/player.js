import { Actor, CollisionType, Color } from "excalibur";

export class Player extends Actor {
    constructor(x, y) {
        super({
            x, y,
            width: 200,
            height: 50,
            color: Color.Purple
        })
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Active;
        this.body.bounciness = 1;
        this.body.rotation = -20;
    }

}