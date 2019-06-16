const VERSION = '0.0.3a';

var Jokes = new function() {
    var alreadyShown = [];
    var _self = this;
    var jokesTold = 0;

    // retrieve a random joke from the jokes array without retrieving the same joke
    // twice in a row.
    this.getJoke = function() {
        var r;

        if (jokes.length == 0) return false;

        if (alreadyShown.length >= jokes.length) alreadyShown = [alreadyShown.pop()];                   
        do {
            r = Math.floor(Math.random() * jokes.length);
        } while (alreadyShown.indexOf(r) != -1)

        alreadyShown.push(r);

        console.log(alreadyShown, r);
        jokesTold = jokesTold < jokes.length? jokesTold + 1 : 1;
        document.title = "Jokes told: " + jokesTold;

        return jokes[r];
    }

    this.toString = function() {
        var formattedJoke = '';
        var joke = this.getJoke();

        formattedJoke = joke.joke;
        if (joke.answer) formattedJoke += '<br/>' + joke.answer;
        if (joke.comedian) formattedJoke += '<div class="credit">&mdash;<a href="' + joke.source + '" target="_blank">' + joke.comedian + "</a></div>";
        if (!joke.comedian && joke.source) formattedJoke += '<div class="credit"><a href="' + joke.source + '" target="_blank">source</a></div>';

        return formattedJoke;
    }

    // bind all events.
    this.bindEvents = function() {
        document.querySelector('.content').addEventListener('click', function(e) {
            this.innerHTML = _self.toString();
        });
        
        document.querySelector('.rimshot').addEventListener('click', function(e) {
            //var randSoundIndex = 1 + Math.floor(Math.random() * 2);
            //document.querySelector('#audio'+randSoundIndex).play();
            document.querySelector('#audio1').play();
        });

        document.querySelector('.credits-link').addEventListener('click', function(e) {
            document.querySelector('.credits-container').style.display = 'flex';
        });
        
        document.querySelector('.credits-container').addEventListener('click', function(e) {
            document.querySelector('.credits-container').style.display = 'none';
        });        
    }
};

window.onload = function() {
    Jokes.bindEvents();
    document.querySelector('.content').innerHTML = Jokes.toString();
    document.querySelector('.version').textContent = VERSION;
}