import { Actor, CollisionType, SpriteSheet, range, Animation, Vector, DegreeOfFreedom } from "excalibur";
import { Resources } from "./resources";

export class Enemy extends Actor {

    #speed = 100;
    direction = 1; // public for switching

    constructor(minX = 0, maxX = 15000) {
        super({
            width: 80,
            height: 100,
            collisionType: CollisionType.Active,
        });
        this.anchor = new Vector(0.5, 0.69);
        this.minX = minX;
        this.maxX = maxX;
    }

    onInitialize(engine) {
        const runSprite = SpriteSheet.fromImageSource({
            image: Resources.Enemy,
            grid: {
                rows: 1,
                columns: 11,
                spriteWidth: 16,
                spriteHeight: 32
            }
        });

        this.runRight = Animation.fromSpriteSheet(runSprite, range(0, 10), 100);
        this.runLeft = this.runRight.clone();
        this.runLeft.flipHorizontal = true;

        this.runRight.scale = new Vector(5, 5);
        this.runLeft.scale = new Vector(5, 5);

        this.graphics.use(this.runRight);

        //Makes it so that the enemy won't have wonky mechanics with player hitbox.
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
    }

    onPreUpdate(engine, delta) {
        this.vel.x = this.#speed * this.direction;

        // Switch animation based on direction
        if (this.direction === 1) {
            this.graphics.use(this.runRight);
        } else {
            this.graphics.use(this.runLeft);
        }

        // dynamic borders, so i can make the enemies walk wherever i want.
        if (this.pos.x < this.minX) {
            this.direction = 1;
        }
        if (this.pos.x > this.maxX) {
            this.direction = -1;
        }

        this.rotation = 0;
        this.angularVelocity = 0;
    }
}