import { Actor, CollisionType, Color } from "excalibur";

export class Platform extends Actor {
    constructor(x, y) {
        super({
            x, y,
            width: 2000,
            height: 50,
            color: Color.Blue
        })
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed;

    }

}