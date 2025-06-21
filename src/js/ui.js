import { Actor, ScreenElement, Vector, Label, Font, Color } from "excalibur";
import { Resources } from "./resources";

export class UI extends ScreenElement {

    #label
    #highscoreLabel
    lives = []

    // constructor() {

    // }

    onInitialize(engine) {
        this.#label = new Label({
            text: 'Score   0',
            pos: new Vector(580, 30),
            font: new Font({
                size: 30,
                family: 'Open Sans',
                color: Color.White
            })
        });
        this.addChild(this.#label);

        for (let i = 0; i < 3; i++) {
            const life = new Actor({
                pos: new Vector(50 + i * 70, 50),
                radius: 15,
                anchor: new Vector(0.5, 0.5)
            });
            const sprite = Resources.Heart.toSprite()
            sprite.scale = new Vector(0.05, 0.05)
            life.graphics.use(sprite)
            this.addChild(life);
            this.lives.push(life);
        }

        this.#highscoreLabel = new Label({
            text: "Highscore   0",
            pos: new Vector(570, 70),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Yellow
            })
        });
        this.addChild(this.#highscoreLabel);

        this.updateHighscore();
    }

    showHealth(livesLeft) {
        for (let i = 0; i < this.lives.length; i++) {
            const sprite = Resources.Heart.toSprite();
            sprite.scale = new Vector(0.05, 0.05);
            if (i < livesLeft) {
                sprite.tint = Color.White; // Vol hartje
            } else {
                sprite.tint = Color.Gray; // Leeg hartje
            }
            this.lives[i].graphics.use(sprite);
        }
    }

    showVictoryMessage() {
        this.victory = new Label({
            text: 'Victory',
            pos: new Vector(400, 100),
            font: new Font({
                size: 80,
                family: 'Open Sans',
                color: Color.White
            })
        });
        this.addChild(this.victory);
    }

    gameOverMessage() {
        this.gameOver = new Label({
            text: 'GAME OVER',
            pos: new Vector(400, 100),
            font: new Font({
                size: 80,
                family: 'Open Sans',
                color: Color.Red
            })
        })
        this.addChild(this.gameOver);
    }

    updateScore(score) {
        this.#label.text = `Score: ${score}`
    }

    updateHighscore() {
        let hs = 0;
        if (localStorage.getItem('highscore') || 0) {
            hs = Number(localStorage.getItem('highscore'));
        }
        this.#highscoreLabel.text = `Highscore = ${hs}`;
    }

}