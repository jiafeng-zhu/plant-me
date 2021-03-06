export default class UIBar
{
    private scene: Phaser.Scene
    private x: number
    private y: number
    private width: number

    private leftCap?: Phaser.GameObjects.Image
    private middle?: Phaser.GameObjects.Image
    private rightCap?: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x:number, y:number, width:number)
    {
        this.scene = scene
        this.x = x
        this.y = y
        this.width = width
    }

    withLeftCap(cap: Phaser.GameObjects.Image){
        this.leftCap = cap.setOrigin(0,0.5)
        return this
    }

    withMiddle(middle: Phaser.GameObjects.Image){
        this.middle = middle.setOrigin(0, 0.5)
        return this
    }

    withRightCap(cap: Phaser.GameObjects.Image){
        this.rightCap = cap.setOrigin(0, 0.5)
        return this
    }

    layout(){

        //The bar grows from 0% - left to right
        if (this.middle){
            this.middle.displayWidth = 0
        }

        this.layoutSegments()

        return this
    }

    animateToFill(fill: number, duration: number = 1000){
        if (!this.middle){
            return
        }

        const percent = Math.max(0, Math.min(1, fill))

        this.scene.tweens.add({
            targets: this.middle,
            displayWidth: this.width * percent, duration,
            ease: Phaser.Math.Easing.Sine.Out,
            onUpdate: () => {
                this.layoutSegments()
            }
        })
    }

    private layoutSegments(){

        if (!this.leftCap || !this.middle || !this.rightCap) {
          return this
        }

        this.leftCap.x = this.x
        this.leftCap.y = this.y

        this.middle.x = this.leftCap.x + this.leftCap.width
        this.middle.y = this.leftCap.y

        this.rightCap.x = this.middle.x + this.middle.displayWidth
        this.rightCap.y = this.middle.y
    }
}

