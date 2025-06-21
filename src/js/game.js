import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy, Axis } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Platform } from './platform.js'
import { Coin } from './coin.js'
import { Coinbag } from './coinbag.js'
import { UI } from './ui.js'
import { Enemy } from './enemy.js'
import { Fire } from './fire.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic,
                gravity: new Vector(0, 800)
            }
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

        //adding the player
        const player = new Player;
        player.pos = new Vector(500, 200);
        this.add(player);

        //adding ui
        this.ui = new UI();
        this.add(this.ui)

        //adding platforms
        const platform = new Platform;
        platform.pos = new Vector(500, 500);
        this.add(platform);

        const platform2 = new Platform;
        platform2.pos = new Vector(900, 300);
        this.add(platform2);

        //adding enemies
        const enemy = new Enemy;
        enemy.pos = new Vector(1000, 200);
        this.add(enemy);

        //adding obstacles
        const fire = new Fire;
        fire.pos = new Vector(600, 500);
        this.add(fire);

        const coin = new Coin;
        coin.pos = new Vector
        this.add(new Coin(400, 300));

        const coinbag = new Coinbag;
        coin.pos = new Vector
        this.add(new Coinbag(600, 300));

        //lock camera onto player
        this.currentScene.camera.strategy.lockToActorAxis(player, Axis.X);
    }

}

new Game()
