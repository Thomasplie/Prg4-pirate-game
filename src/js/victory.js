import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources";

export class Victory extends Actor {
    constructor() {
        super({
            width: 80,
            height: 575,
            collisionType: CollisionType.Fixed,
        });
        this.anchor = new Vector(0.5, 1);
        const finish = Resources.Victory.toSprite();
        finish.scale = new Vector(5, 5);
        this.graphics.use(finish);
    }
}