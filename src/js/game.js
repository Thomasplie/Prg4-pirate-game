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
import { Victory } from './victory.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic,
                gravity: new Vector(0, 1200)
            }
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        //adding the player
        const player = new Player;
        player.pos = new Vector(100, 200);
        this.add(player);

        //adding ui
        this.ui = new UI();
        this.add(this.ui)

        //adding platforms
        const platform = new Platform;
        platform.pos = new Vector(0, 500);
        this.add(platform);

        const platform2 = new Platform;
        platform2.pos = new Vector(900, 400);
        this.add(platform2);

        const platform3 = new Platform;
        platform3.pos = new Vector(1600, 375);
        this.add(platform3);

        const platform4 = new Platform;
        platform4.pos = new Vector(1975, 685);
        platform4.rotation = Math.PI / 2;
        this.add(platform4);

        const platform5 = new Platform;
        platform5.pos = new Vector(2300, 720);
        this.add(platform5);

        const platform6 = new Platform;
        platform6.pos = new Vector(3000, 720);
        this.add(platform6);

        const platform7 = new Platform;
        platform7.pos = new Vector(3350, 720);
        platform7.rotation = Math.PI / 2;
        this.add(platform7);

        const platform8 = new Platform(0, 0, 400, 80);
        platform8.pos = new Vector(2650, 530);
        this.add(platform8);

        const platform9 = new Platform;
        platform9.pos = new Vector(3480, 400);
        this.add(platform9);

        const platform10 = new Platform(0, 0, 100, 80);
        platform10.pos = new Vector(4200, 530);
        this.add(platform10);

        const platform11 = new Platform(0, 0, 200, 80);
        platform11.pos = new Vector(4500, 400);
        this.add(platform11);

        const platform12 = new Platform(5000, 720, 800, 720);
        // platform12.pos = new Vector(, 530);
        this.add(platform12);


        //adding enemies
        const enemy = new Enemy(560, 1300);
        enemy.pos = new Vector(900, 200);
        this.add(enemy);

        const enemy2 = new Enemy(1400, 1800);
        enemy2.pos = new Vector(1500, 200);
        this.add(enemy2);

        const enemy3 = new Enemy(2100, 2600);
        enemy3.pos = new Vector(2200, 600);
        this.add(enemy3);

        const enemy4 = new Enemy(2660, 3030);
        enemy4.pos = new Vector(2700, 600);
        this.add(enemy4);

        const enemy5 = new Enemy(3300, 3700);
        enemy5.pos = new Vector(3500, 300);
        this.add(enemy5);

        const enemy6 = new Enemy(4170, 4230);
        enemy6.pos = new Vector(4200, 300);
        this.add(enemy6);

        //adding obstacles
        const fire = new Fire;
        fire.pos = new Vector(700, 320);
        this.add(fire);

        const fire2 = new Fire;
        fire2.pos = new Vector(3200, 440);
        this.add(fire2);

        const fire3 = new Fire;
        fire3.pos = new Vector(3150, 680);
        this.add(fire3);

        const fire4 = new Fire;
        fire4.pos = new Vector(2650, 450);
        this.add(fire4);

        const fire5 = new Fire;
        fire5.pos = new Vector(-400, 400);
        this.add(fire5);


        //adding coins & coinbags
        const coin = new Coin;
        coin.pos = new Vector(400, 500)
        this.add(new Coin);

        const coin2 = new Coin;
        coin2.pos = new Vector(700, 220);
        this.add(coin2);

        const coin3 = new Coin;
        coin3.pos = new Vector(1625, 40);
        this.add(coin3);

        const coin4 = new Coin;
        coin4.pos = new Vector(2200, 200);
        this.add(coin4);

        const coin5 = new Coin;
        coin5.pos = new Vector(2200, 300);
        this.add(coin5);

        const coin6 = new Coin;
        coin6.pos = new Vector(2650, 350);
        this.add(coin6);

        const coin7 = new Coin;
        coin7.pos = new Vector(3300, 200);
        this.add(coin7);

        const coin8 = new Coin;
        coin8.pos = new Vector(3500, 200);
        this.add(coin8);

        const coin9 = new Coin;
        coin9.pos = new Vector(3700, 200);
        this.add(coin9);

        const coin10 = new Coin;
        coin10.pos = new Vector(4000, 200);
        this.add(coin10);

        const coinbag = new Coinbag;
        coinbag.pos = new Vector(2200, 400);
        this.add(coinbag);

        const coinbag2 = new Coinbag;
        coinbag2.pos = new Vector(3250, 480);
        this.add(coinbag2);

        const coinbag3 = new Coinbag;
        coinbag3.pos = new Vector(3250, 560);
        this.add(coinbag3);

        const coinbag4 = new Coinbag;
        coinbag4.pos = new Vector(3250, 640);
        this.add(coinbag4);

        const coinbag5 = new Coinbag;
        coinbag5.pos = new Vector(4900, 200);
        this.add(coinbag5);

        const coinbag6 = new Coinbag;
        coinbag6.pos = new Vector(-450, 300);
        this.add(coinbag6);

        const finish = new Victory;
        finish.pos = new Vector(5000, 400);
        this.add(finish);

        const victory = new Victory();
        victory.pos = new Vector(5000, 400);
        this.add(victory);

        //lock camera onto player
        this.currentScene.camera.strategy.lockToActorAxis(player, Axis.X);
    }

}

new Game()
