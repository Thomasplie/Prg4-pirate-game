import { Coin } from "./coin.js";
import { Resources } from "./resources.js";
import { Color, Vector } from "excalibur";

export class Coinbag extends Coin {

    value = 10;

    constructor(x = 400, y = 300) {
        super(x, y);
    }

    onInitialize(engine) {
        // this.color = Color.Red;
        const coinbagsprite = Resources.CoinBag.toSprite();
        coinbagsprite.scale = new Vector(0.1, 0.1);
        this.graphics.use(coinbagsprite);
        coinbagsprite.scale = new Vector(1.8, 1.8)
    }
}

