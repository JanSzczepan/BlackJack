export default class Table {
    constructor(playersCards, dealersCards) {
        this.playersCards = playersCards;
        this.dealersCards = dealersCards;

        this.isShowingCards = false;
    }

    showCards(card1, card2, value = true) {
        if (!this.isShowingCards && value) {
            this.isShowingCards = true;
            setTimeout(() => { this.showPlayersCard(card1, card2) }, 1000);
        }
        else if (this.isShowingCards && value) {
            setTimeout(() => { this.showPlayersCard(card1, card2) }, 2000);
        }
        else {
            this.showPlayersCard(card1, card2)
        }
    }

    showPlayersCard(card1, card2) {
        if (card1) {
            this.playersCards.appendChild(card1.rednerCard());
        }
        if (card2) {
            this.dealersCards.appendChild(card2.rednerCard());
        }

        this.isShowingCards = false;
    }

    restartTable() {
        this.playersCards.innerHTML = "";
        this.dealersCards.innerHTML = "";
    }
}