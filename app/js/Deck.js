import { Card, Weights, Types } from "./Card.js";

export default class Deck {

    constructor() {
        this.card = [];

        Weights.forEach(weight => Types.forEach(type => this.card.push(new Card(weight, type))));
    }

    shuffle() {
        for (let i = this.card.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = this.card[i];
            this.card[i] = this.card[j];
            this.card[j] = temp;
        }

        return this.card;
    }

    pickOne() {
        return this.card.pop();
    }

    restart() {
        this.card = [];

        Weights.forEach(weight => Types.forEach(type => this.card.push(new Card(weight, type))));
    }
}