class Utils {
	public constructor() {
	}

	static trans ( arr: Array<any>) {

		var obj = {
			"groups": [
				{
					"keys": "data_json",
					"name": "preloadpic"
				}
			],
			"resources": [
				{
					"url": Main.id + "/data.json",
					"type": "json",
					"name": "data_json"
				}
			]
		}
		arr.forEach( (item, index) => {
			item.elements.forEach ( elem => {
				if(elem.hasOwnProperty('src') && elem.src != ''){
					var n = elem.src.substring(elem.src.lastIndexOf("/")+1).replace('.','_');
					obj.resources.push({
						url: elem.src,
						type: 'image',
						name: n
					})
					obj.groups[0].keys = obj.groups[0].keys == '' ? n : obj.groups[0].keys+','+n;
				}
			})
		})

		return obj;
	}
}



enum InputType {
    TEXT = 1,
    COLOR = 2,
    SELECT = 3
}


var FormItems = {
    [InputType.TEXT]: {
        com: StyleInput
    },
    [InputType.COLOR]: {
		com: StyleTextColor
    },
    [InputType.SELECT]: {
		com: StyleSelect
    }
}

// interface FormItem {
//     type: number,
//     label: string,
//     text: string
// }

// interface FormPanel {
//     items: {
//         [key: string]: FormItem
//     }
// }