import { Actor, CollisionType, Color, Vector } from "excalibur";
import { Resources } from "./resources";

export class Platform extends Actor {
    constructor(x, y, width = 700, height = 80) {
        super({
            x, y,
            width,
            height,
            color: Color.Viridian
        })
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed;
        // this.graphics.use(Resources.Platform.toSprite());
        this.graphics.current.scale = new Vector(1, 1)
        // this.body.restitution = 0;
    }

}