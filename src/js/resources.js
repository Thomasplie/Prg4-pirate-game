import { ImageSource, Sound, Resource, Loader, SpriteSheet } from 'excalibur'
import { Platform } from './platform'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    SamuraiIdle: new ImageSource('images/idle.png'),
    SamuraiRun: new ImageSource('images/run.png'),
    SamuraiHurt: new ImageSource('images/hurt.png'),
    Platform: new ImageSource('images/platform.png'),
    Coin: new ImageSource('images/coin.png'),
    CoinBag: new ImageSource('images/coinbag.png'),
    Heart: new ImageSource('images/heart.png'),
    Enemy: new ImageSource('images/enemy.png'),
    Fire: new ImageSource('images/fire.png'),
}


const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }