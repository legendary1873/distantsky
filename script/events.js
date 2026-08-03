const Events = {
    cooldown: 0,

    init: function() {
        this.cooldown = 0;
    },

    tick: function() {
        if (State.stats.noise >= 75) {
            this.triggerNoiseEvent();
        }
    },

    triggerNoiseEvent: function() {
        UI.logSystem("high noise detected. something skitters nearby in the darkness.");
        State.stats.noise = 0;
        UI.updateStats();
    }
};