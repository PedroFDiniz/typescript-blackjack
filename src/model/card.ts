import chalk from "chalk";
import { normalize, pad } from "../utils/string.formatter.js";
import { createCardCorner, createCenterString, prettySplit, splitInHalf } from "../utils/misc.js";

enum Suit {
    HEARTS = "♥",
    SPADES = "♠",
    DIAMONDS = "♦",
    CLUBS = "♣",
}

enum Rank {
    Joker = 0,
    Ace = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13,
}

enum Color {
    BLACK,
    RED,
}


function getColorName(color: Color) {
    return Object.keys(Color)[Object.values(Color).indexOf(color)];
}

function getRankName(rank: Rank) {
    return Object.keys(Rank)[Object.values(Rank).indexOf(rank)];
}

function getSuitName(suit: Suit) {
    return Object.keys(Suit)[Object.values(Suit).indexOf(suit)];
}


class Card {
    private suit: Suit | null;
    private rank: Rank;
    private color: Color;
    private hidden: boolean;

    constructor(rank: Rank = Rank.Joker, suit: Suit, color: Color = Color.BLACK, isHidden: boolean = false) {
        this.rank = rank;
        this.suit = ([Rank.Joker].includes(rank))? null : suit;
        this.color =
            (rank === Rank.Joker)
            ? color
            : ([Suit.CLUBS, Suit.SPADES].includes(suit))
                ? Color.BLACK
                : Color.RED;
        this.hidden = isHidden;
    }

    get getSuit(): Suit | null {
        return this.suit;
    }

    get getRank(): Rank {
        return this.rank;
    }

    get getColor(): Color {
        return this.color;
    }

    get isHidden(): boolean {
        return this.hidden;
    }

    hide(): void {
        this.hidden = true;
    }

    reveal(): void {
        this.hidden = false;
    }

    toString(): string {
        if (this.isHidden) return `(?)Unknown`;
        return `${this.suit}${this.rank}`;
    }

    toLongString(): string {
        if (this.isHidden) return `Unknown of Unknown`;
        const suitExists: boolean = !!this.suit;
        const colorName: string = normalize(getColorName(this.color));
        const rankName: string = normalize(getRankName(this.rank));
        const suitName: string =
            suitExists?
                normalize(getSuitName(this.suit!)) : "";

        if (suitExists) return `${rankName} of ${suitName}`;
        return `${colorName} ${rankName}`;
    }

    toColoredString(): string {
        if (this.isHidden) return chalk.bgWhite(pad(`Unknown`));
        const string = pad(this.toLongString());
        if (this.color === Color.BLACK) return chalk.bgWhite(string);
        else return chalk.bgRed.white(string);
    }

    toShortColoredString(): string {
        if (this.isHidden)
            return chalk.bgWhite.black.bold(" ? ")
                + chalk.bgBlack.white.bold(" Unknown ");
        if (!this.suit)
            return (
                this.color === Color.BLACK?
                    chalk.bgWhite.black(` ${getRankName(this.rank)} `)
                :   chalk.bgRed.white(` ${getRankName(this.rank)} `)
            );
        let firstHalf = chalk.bold(pad(this.suit));
        let secondHalf = chalk.bold(pad(getRankName(this.rank)));
        switch (this.suit) {
            case Suit.CLUBS:
                firstHalf = chalk
                    .bgWhite.black(firstHalf);
                secondHalf = chalk
                    .bgBlack.whiteBright(secondHalf);
                break;
            case Suit.SPADES:
                firstHalf = chalk
                    .bgBlack.whiteBright(firstHalf);
                secondHalf = chalk
                    .bgWhite.black(secondHalf);
                break;
            case Suit.DIAMONDS:
                firstHalf = chalk
                    .bgRed.whiteBright(firstHalf);
                secondHalf = chalk
                    .bgWhite.red(secondHalf);
                break;
            case Suit.HEARTS:
                firstHalf = chalk
                    .bgWhite.red(firstHalf);
                secondHalf = chalk
                    .bgRed.white(secondHalf);
                break;
        } return firstHalf + secondHalf;
    }

    // TODO finish
    toArt(): string[] {
        [" 10        ",
         " ♥         ",
         "    ♥ ♥    ",
         "   ♥ ♥ ♥   ",
         "   ♥ ♥ ♥   ",
         "    ♥ ♥    ",
         "         ♥ ",
         "        10 ",]

        return [];
    }

    // TODO finish
    createPattern(): string[] {
        const SPECIAL_RANKS =
            [Rank.Joker,Rank.Ace, Rank.King, Rank.Queen, Rank.Jack];
        if (this.rank in SPECIAL_RANKS) return this.createPatternSpecial();
        let pattern: string[] = prettySplit(this.suit!.repeat(this.rank));
        if (pattern.length < 4) [`.`]
        pattern.forEach( (line: string) => {
            line = createCenterString(line);
        });
        pattern = [...createCardCorner(this.rank, this.suit!), ...pattern, ...createCardCorner(this.rank, this.suit!, true)];
        return [];
    }

    // TODO Create pattern for special cards
    createPatternSpecial(): string[] {
        switch (this.rank) {
            case Rank.Joker:
                break;
        } return [];
    }
}


[" J         ",
 " O   ❖     ",
 " K  ◇ ◇    ",
 " E       J ",
 " R       O ",
 "    ◇ ◇  K ",
 "     ❖   E ",
 "         R ",]

export { Card, Rank, Suit, Color };