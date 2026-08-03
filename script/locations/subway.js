const Subway = {
    init: function() {
        UI.log(Lang["init_car"]);
        UI.logSystem(Lang["scen_01_title"] + ": " + Lang["scen_01_desc"]);
        this.renderActions();
    },

    renderActions: function() {
        UI.addButton("btn-feel", Lang["feel_around"], function() {
            Subway.feelAround();
        });

        if (State.hasItem("damaged_smartphone")) {
            UI.addButton("btn-phone", Lang["use_phone"], function() {
                Subway.usePhone();
            });
        } else {
            UI.removeButton("btn-phone");
        }

        if (State.hasItem("crowbar")) {
            UI.addButton("btn-pry", Lang["pry_door"], function() {
                Subway.pryDoor();
            });
        }
    },

    feelAround: function() {
        UI.log(Lang["feel_around_log"]);
        State.addNoise(15);
        if (!State.hasItem("crowbar")) {
            State.addItem("crowbar", 1);
            UI.logSystem("found crowbar.");
        }
        Subway.renderActions();
    },

    usePhone: function() {
        UI.log(Lang["use_phone_log"]);
        State.stats.lux = 20;
        State.removeItem("damaged_smartphone", 1);
        UI.updateStats();
        Subway.renderActions();
    },

    pryDoor: function() {
        UI.log(Lang["pry_door_log"]);
        State.addNoise(40);
        State.currencies.coins += 100;
        UI.logSystem("scenario completed. +100 coins.");
        UI.updateStats();
        
        UI.removeButton("btn-feel");
        UI.removeButton("btn-phone");
        UI.removeButton("btn-pry");
        
        $('#location-header').text("platform");
        UI.log(Lang["platform_arrival"]);
    }
};