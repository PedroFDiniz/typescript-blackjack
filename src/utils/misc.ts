import type { Rank, Suit } from "src/model/card.js";
import { buildCardLine } from "./string.formatter.js";

export function splitInHalf(string: string, reverseRemainder: boolean = false): string[] {
    if (string.length < 3) return [string];
    const halfLength: number =
        reverseRemainder?
              Math.ceil(string.length / 2)
            : Math.floor(string.length / 2);
    const firstHalf: string = string.slice(0,halfLength);
    const secondHalf: string = string.slice(halfLength, string.length);
    return [firstHalf, secondHalf];
}

export function prettySplit(string: string): string[] {
    const [firstItem, secondItem] = splitInHalf(string);
    return [...splitInHalf(firstItem), ...splitInHalf(secondItem, true)];
}

export function createCenterString(string: string, width: number = 11): string {
    const halfString: number = Math.floor(string.length / 2);
    const halfWidth = Math.floor(width / 2);
    let index = halfWidth - halfString;
    return buildCardLine(string, index);
}

export function createCardCorner(rank: Rank, suit: Suit, reverseSide: boolean = false): string[] {
    if (reverseSide)
        return [`${rank} `.padStart(11, " "), `${suit} `.padStart(11, " ")];
    return [`${suit} `.padStart(11, " "), `${rank} `.padStart(11, " ")];
}