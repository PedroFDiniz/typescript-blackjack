#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
// import figlet from "figlet";
// import gradient from "gradient-string";
// import { createSpinner } from "nanospinner";
import { capitalize, pad, padLeft } from "./utils/string.formatter.js";
import { sleep } from "./utils/sleep.js";
// import { Deck } from "./model/deck.js";
import { Card, Color, Rank, Suit } from "./model/card.js";
import tgio from "terminal-game-io";

// const spinner = createSpinner();
// const text_welcome = "Welcome"
// const text_to = " to ";
// await sleep(2000);


async function welcome(): Promise<void> {
    const text_ts = chalk.bgBlue.bold(pad("TS"));
    const text_blackjack = chalk.bgWhite.bold(pad("Blackjack"));
    const title = `${text_ts}${text_blackjack}\n`;
    console.log(title);
    const text_welcome = chalkAnimation.pulse(pad("Welcome!"));

    await sleep(2000);
    text_welcome.stop();
}

class Game {
    private state: string;
    private end: boolean;

    constructor() {
        this.state = "menu";
        this.end = false;
    }

    async run() {
        while (!this.end) {
            switch (this.state) {
                case "menu":
                    await this.menu();
                    break;
                case "play":
                    await this.play();
                    break;
                case "howto":
                    await this.howTo();
                    break;
                case "test":
                    await this.test();
                    break;
                case "quit":
                    await this.quit();
                    break;
            }
        }
    }

    goTo(state: string) {
        this.state = state;
    }

    quit(): void {
        this.end = true;
    }
//` ◇   ◇   ◇  J O K E R      ❖          ◇          ◇          ❖      J O K E R  ◇   ◇   ◇ `
//` J          O   ❖      K  ◇ ◇     E       J  R       O     ◇ ◇  K      ❖   E          R 
    test(): void {
        [
            chalk.bgWhite.red.bold(` J         `),
            chalk.bgWhite.red.bold(` O   ❖     `),
            chalk.bgWhite.red.bold(` K  ◇ ◇    `),
            chalk.bgWhite.red.bold(` E       J `),
            chalk.bgWhite.red.bold(` R       O `),
            chalk.bgWhite.red.bold(`    ◇ ◇  K `),
            chalk.bgWhite.red.bold(`     ❖   E `),
            chalk.bgWhite.red.bold(`         R `),
        ].forEach( (line: string) => {
            console.log(line);
        });
        this.goTo("menu");
    }



    async menu(): Promise<void> {
        const choice = await inquirer.prompt([{
            type: "list",
            name: "Menu",
            message: "",
            choices: [ "Play", "How to Play", "Test", "Quit" ]
        }]);
        switch (choice["Menu"]) {
            case "Play":
                this.goTo("play");
                break;
            case "How to Play":
                this.goTo("howto");
                break;
            case "Test":
                this.goTo("test");
                break;
            case "Quit":
                this.goTo("quit");
                break;
        }
    }

    async play(): Promise<void> {
        const key = tgio.Key;
        const FPS = 1;
        const [BOARD_WIDTH, BOARD_HEIGHT] = process.stdout.getWindowSize();

        let posX = Math.round(BOARD_WIDTH / 2);
        let posY = Math.round(BOARD_HEIGHT / 2);
        const frameHandler = (instance: tgio.ITerminalGameIo) => {
            let frameData = "";
            for (let y = 0; y < BOARD_HEIGHT; y++) {
                for (let x = 0; x < BOARD_WIDTH; x++) {
                    frameData += posX === x && posY === y? "@" : " ";
                }
            } instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
        };

        const keypressHandler = (instance: tgio.ITerminalGameIo, keyName: tgio.KeyName) => {
            switch (keyName) {
                case key.ArrowUp:
                    posY = posY === 0? BOARD_HEIGHT - 1: posY - 1;
                    break;
                case key.ArrowDown:
                    posY = (posY + 1) % BOARD_HEIGHT;
                    break;
                case key.ArrowRight:
                    posX = (posX + 1) % BOARD_WIDTH;
                    break;
                case key.ArrowLeft:
                    posX = posX === 0? BOARD_WIDTH - 1 : posX - 1 ;
                    break;
                case key.Escape:
                    instance.exit();
                    break;
            } frameHandler(instance);
        };

        const terminalGame = tgio.createTerminalGameIo({
            fps: FPS,
            frameHandler,
            keypressHandler,
        });
        // process.stdout.write("Hello World!");
        // await sleep(2000);
        // process.stdout.clearLine(0);
        // process.stdout.cursorTo(0);
        // process.stdout.write("Cleaned Line!");
        // await sleep(2000);
        // process.stdout.clearLine(0);
        // process.stdout.cursorTo(0);
        process.stdout.write('\x1bc');
        this.goTo("menu");
    }

    async howTo(): Promise<void> {
        const unknown = new Card(Rank.Ace, Suit.SPADES, Color.BLACK, true);
        const title: string = chalk.bgWhiteBright.black.bold(pad("How to Play", 5));
        const name: string = pad(chalk.bgWhiteBright.black.bold("Blackjack"));
        const bust: string = chalk.bold.red("Bust");
        const cardNumber2: string = chalk.yellow("2");
        const cardNumber10: string = chalk.yellow("10");
        const number1: string = chalk.yellow("1");
        const number10: string = chalk.yellow("10");
        const number11: string = chalk.yellow("11");
        const number16: string = chalk.yellow("16");
        const number17: string = chalk.yellow("17");
        const number21: string = chalk.yellow("21");
        const numbers210: string = `${cardNumber2} - ${cardNumber10}`;
        const cardName: string = chalk.blue("card");
        const cardsName: string = chalk.blue("cards");
        const points: string = chalk.magenta("points")
        const hit: string = chalk.bold.underline("Hit");
        const stay: string = chalk.bold.underline("Stay");
        const push: string = chalk.bold.underline("Push");
        const basicRules: string[] = [
            `${name} is a ${cardName} game where you compete against the dealer`,
            `The player's ultimate goal is to get a hand that's higher than the dealer's.`,
            `Your hand also cannot be higher than ${number21}. That would be called a ${bust}.`,
            `Players determine the value of their hand by tallying up the values of each ${cardName}.`,
            `${cardsName.replace("c", "C")} ${numbers210} are worth their value in ${points}.`,
            `The Jack, Queen and King are worth ${number10} ${points}.`,
            `Aces are worth either ${number1} or ${number11} points, whichever benefits the player more.`,
            `If the dealer gets the same amount of ${points} as the player, it is a ${push}.`,
            `The player or the dealer can decide to ${hit}. That means the they want one more ${cardName}.`,
            `The player or the dealer can decide to ${stay}. That means they finished their moves.`,
        ];
        const gameStarted: string[] = [
            `The dealer hands a ${cardName} to the player and an ${unknown.toShortColoredString()} ${cardName} to himself.`,
            `The dealer hands another ${cardName} to the player and to himself.`,
            `The player decides whether to ${hit} or to ${stay}.`,
            `The dealer hands out ${cardsName} for as long as the player wants to ${hit}.`,
            `Once the player decides to ${stay}, the dealer then reveals his first ${cardName}.`,
            `If the dealer's hand is worth ${number16} ${points} or less, the dealer has to ${hit}.`,
            `If the dealer's hand is worth ${number17} ${points} or more, the dealer has to ${stay}.`,
            `The one with the most ${points} at this point, wins!`,
        ];
        console.log(`\n${title}\n`);
        console.log(padLeft("Basic Rules:\n", 3));
        let counter = 0;
        for (let line of basicRules) {
            counter++;
            const paragraph =
                padLeft(chalk.bold.green(`${counter}`), 5)
                + chalk.yellow(" - ");
            console.log(paragraph + line + "\n");
            await sleep(1000);
        }
        console.log(padLeft("When the game starts...\n", 3));
        counter = 0;
        for (let line of gameStarted) {
            counter++;
            const paragraph =
                padLeft(chalk.bold.green(`${counter}`), 5)
                + chalk.yellow(" - ");
            console.log(paragraph + line + "\n");
            await sleep(500);
        }
        this.goTo("menu");
    }
}



await welcome();
const blackjack = new Game();
blackjack.run();
