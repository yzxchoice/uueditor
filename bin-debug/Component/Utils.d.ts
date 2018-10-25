declare class Utils2 {
    constructor();
    static getComs(): (typeof Slideshow | typeof CircleSector | typeof UUBackground | typeof UUContainer | typeof UULabel | typeof SoundButton | typeof CardAlert | typeof SlotMachine)[];
    static getTexture(url: string): Promise<{}>;
    static getSound(url: string): Promise<{}>;
    static trans(arr: Array<any>, templateId: number): {
        "groups": {
            "keys": string;
            "name": string;
        }[];
        "resources": {
            "url": string;
            "type": string;
            "name": string;
        }[];
    };
}
