import {useThemeData, useThemeLocaleData} from "@vuepress/plugin-theme-data/lib/client";
import {SakuraThemeOptions} from "../../shared";

const randomServer = parseInt(String(Math.random() * 4), 10) + 1

const randomBG = function (count = 1, image_server: string | undefined = undefined, image_list: string[] = []) {
    let i;
    if (image_server) {
        if (count && count > 1) {
            const arr = new Array(count);
            for (i = 0; i < arr.length; i++) {
                arr[i] = image_server + '?' + Math.floor(Math.random() * 999999)
            }

            return arr;
        }

        return image_server + '?' + Math.floor(Math.random() * 999999)
    }

    const parseImage = function (img: string, size) {
        if (img.startsWith('//') || img.startsWith('http')) {
            return img
        } else {
            return 'https://tva' + randomServer + '.sinaimg.cn/' + size + '/' + img
        }
    };

    if (count && count > 1) {
        const shuffled = image_list.slice(0);
        i = image_list.length;
        let min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }

        return shuffled.slice(min).map(function (img) {
            return parseImage(img, 'large')
        });
    }

    return parseImage(image_list[Math.floor(Math.random() * image_list.length)], 'mw690')
}


function _image_url(img: string, path = '') {

    if (img.startsWith('//') || img.startsWith('http')) {
        return img
    } else {
        return '/public'
    }
}

export function getCover(item: any, num: number = 1): string | string[] {
    const {image_server, image_list} = useThemeData<SakuraThemeOptions>().value;
    if (item.cover) {
        return _image_url(item.cover, item.path)
    } else if (item.photos && item.photos.length > 0) {
        return _image_url(item.photos[0], item.path)
    } else {
        return randomBG(num || 1, image_server, image_list);
    }

}