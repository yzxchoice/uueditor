class AnimateSet {
	static target: egret.DisplayObject;
	constructor () {
        throw new Error('can not create a instance')
		
    }

	static move() {
		egret.Tween.get( this.target, { loop:true} )
            .to( {x: this.target.width}, 2000 )
			.call( () => {
				this.target.rotation = 0;
				// this.target.matrix.translate(- this.target.width, 0);
			}, this, ["param1", {key: "key", value: 3}])
			.wait(1000);
	}
}