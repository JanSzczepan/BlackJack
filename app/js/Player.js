import { Hand } from "./Hand.js";

export default class Player {
    constructor(name, id) {
        this.name = name;
        this.points = 0;
        this.element = document.getElementById(id);

        this.hand = new Hand();
    }

    calculatePoints(value) {
        this.points = this.hand.getStrength();

        if (value) {
            setTimeout(() => this.showPlayerPoints(), 2000);
            return;
        }

        this.showPlayerPoints();
    }

    showPlayerPoints() {
        this.element.innerHTML = this.points;
    }
}