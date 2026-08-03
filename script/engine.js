const Engine = {
    VERSION: '0.1.0',
    SAVE_KEY: 'distant_sky_save',
    tickInterval: 1000,
    clock: 0,

    init: function() {
        State.init();
        UI.init();
        Events.init();
        
        Engine.load();
        
        if (typeof Subway !== 'undefined') {
            Subway.init();
        }

        Engine.startLoop();
    },

    startLoop: function() {
        setInterval(function() {
            Engine.tick();
        }, Engine.tickInterval);
    },

    tick: function() {
        Engine.clock++;
        
        if (typeof State !== 'undefined' && State.tick) {
            State.tick();
        }
        
        if (typeof Events !== 'undefined' && Events.tick) {
            Events.tick();
        }

        if (Engine.clock % 10 === 0) {
            Engine.save();
        }
    },

    save: function() {
        const saveData = {
            version: Engine.VERSION,
            clock: Engine.clock,
            state: typeof State !== 'undefined' ? State.save() : {}
        };
        localStorage.setItem(Engine.SAVE_KEY, JSON.stringify(saveData));
    },

    load: function() {
        const raw = localStorage.getItem(Engine.SAVE_KEY);
        if (!raw) return;

        try {
            const saveData = JSON.parse(raw);
            Engine.clock = saveData.clock || 0;
            if (saveData.state && typeof State !== 'undefined') {
                State.load(saveData.state);
            }
        } catch (e) {
            console.error(e);
        }
    },

    wipe: function() {
        localStorage.removeItem(Engine.SAVE_KEY);
        window.location.reload();
    }
};

$(document).ready(function() {
    Engine.init();
});