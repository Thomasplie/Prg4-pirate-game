import { Actor, CollisionType, Color, range, SpriteSheet, Animation, Vector, Shape, Keys } from "excalibur";
import { Resources } from "./resources";
import { Platform } from "./platform";
import { Coin } from "./coin";
import { Coinbag } from "./coinbag";
import { Enemy } from "./enemy";
import { Fire } from "./fire";

export class Player extends Actor {

    #speed = 400;
    #jump = false;
    hitpoints = 3;
    score = 0;

    constructor() {
        super({
            width: 48,
            height: 96,
            collisionType: CollisionType.Active,
            // anchor: new Vector(0.5, 0.5)
        });

        //Animations
        const PlayerIdle = SpriteSheet.fromImageSource({
            image: Resources.SamuraiIdle,
            grid: {
                rows: 1,
                columns: 10,
                spriteHeight: 96,
                spriteWidth: 96
            }
        })

        const PlayerRunning = SpriteSheet.fromImageSource({
            image: Resources.SamuraiRun,
            grid: {
                rows: 1,
                columns: 16,
                spriteHeight: 96,
                spriteWidth: 96
            }
        })

        const PlayerDamaged = SpriteSheet.fromImageSource({
            image: Resources.SamuraiHurt,
            grid: {
                rows: 1,
                columns: 10,
                spriteHeight: 96,
                spriteWidth: 96
            }
        })

        const idle = Animation.fromSpriteSheet(PlayerIdle, range(0, 9), 100)
        idle.scale = new Vector(2, 2);
        const hurt = Animation.fromSpriteSheet(PlayerDamaged, range(0, 3), 100)
        hurt.scale = new Vector(2, 2);
        const runLeft = Animation.fromSpriteSheet(PlayerRunning, range(0, 15), 100)
        const runRight = runLeft.clone()
        runLeft.scale = new Vector(2, 2);
        runRight.scale = new Vector(2, 2);
        runLeft.flipHorizontal = true;

        this.graphics.add("idle", idle);
        this.graphics.add("runLeft", runLeft);
        this.graphics.add("runRight", runRight);
        this.graphics.add("hurt", hurt);

        this.graphics.use("idle");
        this.graphics.current.scale = new Vector(2, 2);
        this.anchor = new Vector(0.5, 0.6);


    }

    onInitialize(engine) {

        // turn on physics & adjust body, yes i know double collisiontype active it works idk
        this.body.collisionType = CollisionType.Active
        this.body.useGravity = true;
        // this.body.restitution = 0;

        // Making Capsule shape hitbox and making sure sprite doesn't rotate
        const hitbox = Shape.Capsule(48, 96, Vector.Half, new Vector(0, -1000));
        this.collider.set(hitbox);
        this.collider.restitution = 0;

        //Collision Handler
        this.on('collisionstart', (event) => this.handleCollision(event));


    }

    onPreUpdate(engine, delta) {

        //Movement
        let xspeed = 0;
        let yspeed = this.vel.y;

        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -this.#speed;
            this.graphics.use("runLeft")
        }

        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = this.#speed;
            this.graphics.use("runRight")
        }

        if (engine.input.keyboard.wasPressed(Keys.Space) && this.#jump === true) {
            yspeed = -600;
            this.#jump = false;

            console.log('please work')
        }

        //update the velocity to the actor
        this.vel = new Vector(xspeed, yspeed);

        // This needs to be here since setting rotation to fixed didnt work..
        this.rotation = 0;
        this.body.angularVelocity = 0;

        //Teleport player back to spawn when they fall out of the map
        if (this.pos.y > 700) {
            this.#inVoid()
        }
    }

    handleCollision(event) {
        console.log(event.other.owner, event.other.owner.value);
        if (event.other.owner instanceof Platform) {
            this.#jump = true;
        }

        if (event.other.owner instanceof Coin || event.other.owner instanceof Coinbag) {
            event.other.owner.kill();
            this.score += event.other.owner.value
            this.scene.engine.ui.updateScore(this.score);
        }

        if (event.other.owner instanceof Enemy) {
            if (this.pos.y < event.other.owner.pos.y) {
                event.other.owner.kill();
                this.score += 5
                this.scene.engine.ui.updateScore(this.score)
            }
            else {
                this.#reducedHealth();
                console.log('OUCHIES');
                console.log('hitpoints');
            }
        }

        if (event.other.owner instanceof Fire) {
            this.#reducedHealth();
        }
    }

    #reducedHealth() {
        this.hitpoints--
        this.scene.engine.ui.showHealth(this.hitpoints)

        if (this.hitpoints <= 0) {
            this.gameOver();
        }
    }

    #inVoid() {
        this.gameOver()
        this.pos = new Vector(400, 0);
        this.vel = Vector.Zero
        this.scene.engine.ui.showHealth(this.hitpoints);
    }


    gameOver() {
        let hs = Number(localStorage.getItem('highscore')) || 0;
        if (this.score > hs) {
            localStorage.setItem('highscore', this.score);
            this.scene.engine.ui.updateHighscore();
        }

        if (this.hitpoints === 0) {
            this.scene.engine.ui.gameOverMessage();
            this.kill()
        }
    }
}   