import { Actor, Color, Shape, Vector } from "excalibur";
import { Resources } from "./resources.js";



export class Coin extends Actor {

    value = 1;

    constructor(x = 400, y = 300) {
        super({
            width: 54,
            height: 54,
        });
        this.pos = new Vector(x, y);
        this.anchor = new Vector(0.5, 0.5);
    }

    onInitialize(engine) {
        const coinsprite = Resources.Coin.toSprite();
        coinsprite.scale = new Vector(0.1, 0.1);
        this.graphics.use(coinsprite);
    }
}