declare class Utils {
    constructor();
    static trans(arr: Array<any>): {
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
declare enum InputType {
    TEXT = 1,
    COLOR = 2,
    SELECT = 3,
}
declare var FormItems: {
    [x: number]: {
        com: typeof StyleInput;
    } | {
        com: typeof StyleTextColor;
    } | {
        com: typeof StyleSelect;
    };
};
