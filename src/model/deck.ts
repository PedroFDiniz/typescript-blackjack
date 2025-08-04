import { Card, Rank, Suit, Color } from "./card.js";

class Deck {
    private pile: Card[];

    constructor() {
        const newPile = [] as Card[];
        const rankKeys = Object.keys(Rank);
        const suitKeys = Object.keys(Suit);
        for (const rankKey of rankKeys) {
            const rank = Rank[rankKey as keyof typeof Rank];
            if (rank === Rank.Joker) continue;

            for (const suitKey of suitKeys) {
                const suit = Suit[suitKey as keyof typeof Suit];
                const card = new Card(rank, suit);
                newPile.push(card);
            }
        } this.pile = newPile;
    }

    get peek(): Card | undefined {
        if (this.isEmpty) return undefined;
        return this.pile[0];
    }

    get isEmpty(): boolean {
        return (!this.pile || this.pile.length < 1);
    }

    push(card: Card): number {
        return this.pile.push(card);
    }

    draw(quantity: number = 1): Card[] | undefined {
        if (this.isEmpty) return [];
        return this.pile.splice(0, quantity);
    }

    /* InsertionSort algorithm */
    sort( compareFunction: (card1: Card, card2: Card) => number ): void {
        if (this.isEmpty) return;
        let index1 = 1;
        while (index1 < this.pile.length) {
            let index2 = index1;
            while (index2 > 0 && compareFunction(this.pile[index2 - 1], this.pile[index2]) > 0) {
                this.swap(index2, index2 - 1);
                index2--;
            } index1++;
        }
    }

    /* Fisher-Yates algorithm */
    shuffle(): void {
        if (this.isEmpty) return;
        let currentIndex = this.pile.length;
        while (currentIndex !== 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            this.swap(currentIndex, randomIndex);
        }
    }

    addJokers(): void {
        const blackJoker = new Card(Rank.Joker, Suit.CLUBS, Color.BLACK);
        const redJoker = new Card(Rank.Joker, Suit.CLUBS, Color.RED);
        this.pile.push(blackJoker);
        this.pile.push(redJoker);
    }

    private swap(index1: number, index2: number): void {
        if (this.isEmpty) return;
        if (index1 < 0 || index1 >= this.pile.length) return;
        if (index2 < 0 || index2 >= this.pile.length) return;
        const temp = this.pile[index1];
        this.pile[index1] = this.pile[index2];
        this.pile[index2] = temp;
    }

}