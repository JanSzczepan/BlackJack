import Deck from "./Deck";
import Message from "./Message";
import Player from "./Player";
import Table from "./Table";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;

const SCALE = '--scale-value';

export default class Game {
    constructor() {
        this.player = new Player('Jan', 'playerPoints');
        this.dealer = new Player('Krupier', 'dealerPoints');

        this.table = new Table(document.getElementById('playersCards'),
            document.getElementById('dealersCards'));

        this.deck = new Deck();

        this.addCardBtn = document.getElementById('hit');
        this.stayBtn = document.getElementById('stand');
        this.restartButton = document.getElementById('try-again');

        this.messageBox = new Message(document.getElementById('mes'), document.getElementById('message'));

        this.addCardBtn.addEventListener('click', () => this.hitCard());
        this.stayBtn.addEventListener('click', () => this.dealerPlays());
        this.restartButton.addEventListener('click', () => this.restartGame());

        this.run();
    }

    run() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.deck.shuffle();

        this.addCards();
    }

    hitCard() {
        if (this.deck.card.length) {
            const card = this.deck.pickOne();
            this.player.hand.addCard(card);
            this.table.showCards(card, 0, false);
            this.player.calculatePoints(false);
        }
    }

    addCards() {
        for (let n = 0; n < 2; n++) {
            const playerCard = this.deck.pickOne();
            this.player.hand.addCard(playerCard);

            const dealerCard = this.deck.pickOne();
            this.dealer.hand.addCard(dealerCard);

            this.table.showCards(playerCard, dealerCard);
        }

        this.player.calculatePoints(true);
        this.dealer.calculatePoints(true);
    }

    dealerPlays() {
        while (this.dealer.points <= this.player.points && this.player.points <= 21 && this.dealer.points < 21 && this.deck.card.length) {
            const card = this.deck.pickOne();
            this.dealer.hand.addCard(card);
            this.table.showPlayersCard(0, card, false);
            this.dealer.calculatePoints(false);
        }

        this.endTheGame();
    }

    endTheGame() {

        this.addCardBtn.disabled = true;
        this.stayBtn.disabled = true;

        if (this.player.points <= 21 && this.player.points == this.dealer.points) {
            this.messageBox.waitToShow('Remis', 1500);

            return;
        }

        if (this.player.points > 21) {
            this.messageBox.waitToShow('Wygrywa Dealer', 2000);
            return;
        }

        if (this.dealer.points > 21) {
            this.messageBox.waitToShow('Wygrywasz!', 1500);

            return;
        }

        if (this.player.points < this.dealer.points) {
            this.messageBox.waitToShow('Wygrywa Dealer', 2000);

            return;
        }
    }

    restartGame() {
        this.player.points = 0;
        this.dealer.points = 0;
        this.player.showPlayerPoints();
        this.dealer.showPlayerPoints();
        this.player.hand.cards = [];
        this.dealer.hand.cards = [];
        this.table.restartTable();
        this.messageBox.hide();
        this.deck.restart();
        this.addCardBtn.disabled = false;
        this.stayBtn.disabled = false;
        this.run();
    }

    resize() {
        const { innerWidth: width, innerHeight: height } = window;

        const scale = Math.min(width / GAME_WIDTH, height / GAME_HEIGHT);

        document.documentElement.style.setProperty(SCALE, scale);
    }
}