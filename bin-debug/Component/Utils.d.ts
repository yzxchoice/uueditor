declare class Utils2 {
    constructor();
    static getComs(): (typeof Slideshow | typeof SoundButton | typeof CircleSector | typeof UUBackground | typeof UUContainer | typeof UULabel | typeof SlotMachine | typeof CardAlert)[];
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
