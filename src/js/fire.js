import { Actor, CollisionType, SpriteSheet, Animation, range, Vector, DegreeOfFreedom } from "excalibur";
import { Resources } from "./resources";

export class Fire extends Actor {
    constructor() {
        super({
            width: 64,
            height: 80,
            collisionType: CollisionType.Fixed
        });
        this.anchor = new Vector(0.5, 0.5);
    }

    onInitialize(engine) {
        const fireSheet = SpriteSheet.fromImageSource({
            image: Resources.Fire,
            grid: {
                rows: 1,
                columns: 5,
                spriteWidth: 32,
                spriteHeight: 64
            }
        });

        const fire = Animation.fromSpriteSheet(fireSheet, range(0, 4), 100);
        fire.scale = new Vector(2, 2);
        this.graphics.use(fire);

        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
    }
}