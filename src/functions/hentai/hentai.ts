import {nsfw} from "akaneko";

/**
 * Returns a GIF Hentai
 * @param type The type of the hentai
 * @returns Image GIF URL
 */
export default function returnHentai (type: string) {
    let responseImage;
    switch (type) {
        case "ass":
            responseImage = nsfw.ass();
        break;

        case "bdsm":
            responseImage = nsfw.bdsm();
        break;

        case "blowjob":
            responseImage = nsfw.blowjob();
        break;

        case "cum":
            responseImage = nsfw.cum();
        break;

        case "doujin":
            responseImage = nsfw.doujin();
        break;

        case "feet":
            responseImage = nsfw.feet();
        break;

        case "femdom":
            responseImage = nsfw.femdom();
        break;

        case "foxgirl":
            responseImage = nsfw.foxgirl();
        break;

        case "gifs":
            responseImage = nsfw.gifs();
        break;

        case "glasses":
            responseImage = nsfw.glasses();
        break;

        case "hentai":
            responseImage = nsfw.hentai();
        break;

        case "netotare":
            responseImage = nsfw.netorare();
        break;

        case "maid":
            responseImage = nsfw.maid();
        break;

        case "masturbation":
            responseImage = nsfw.masturbation();
        break;

        case "orgy":
            responseImage = nsfw.orgy();
        break;

        case "panties":
            responseImage = nsfw.panties();
        break;

        case "pussy":
            responseImage = nsfw.pussy();
        break;

        case "school":
            responseImage = nsfw.school();
        break;

        case "tentacles":
            responseImage = nsfw.tentacles();
        break;

        case "thighs":
            responseImage = nsfw.thighs();
        break;

        case "uglyBastard":
            responseImage = nsfw.uglyBastard();
        break;

        case "uniform":
            responseImage = nsfw.uniform();
        break;

        default:
            responseImage = "You did not select a correct type."
    }

    return responseImage;
}