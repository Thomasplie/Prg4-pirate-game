import { Actor, CollisionType, Color, Vector } from "excalibur";
import { Resources } from "./resources";

export class Platform extends Actor {
    constructor(x, y) {
        super({
            x, y,
            width: 500,
            height: 80,
            color: Color.Blue
        })
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed;
        // this.graphics.use(Resources.Platform.toSprite());
        this.graphics.current.scale = new Vector(1, 1)
        // this.body.restitution = 0;
    }

}