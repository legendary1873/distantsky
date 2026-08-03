const State = {
    stats: {
        hp: 100,
        maxHp: 100,
        oxygen: 100,
        lux: 0,
        noise: 0
    },
    currencies: {
        coins: 0
    },
    inventory: {
        damaged_smartphone: 1,
        torn_school_uniform: 1,
        half_empty_water: 1
    },
    flags: {},

    init: function() {
        this.stats.hp = 100;
        this.stats.maxHp = 100;
        this.stats.oxygen = 100;
        this.stats.lux = 0;
        this.stats.noise = 0;
        this.currencies.coins = 0;
    },

    tick: function() {
        if (this.stats.noise > 0) {
            this.stats.noise = Math.max(0, Math.floor(this.stats.noise * 0.85));
        }
        UI.updateStats();
    },

    addNoise: function(amount) {
        this.stats.noise += amount;
        UI.updateStats();
    },

    hasItem: function(itemId) {
        return (this.inventory[itemId] || 0) > 0;
    },

    addItem: function(itemId, count) {
        count = count || 1;
        this.inventory[itemId] = (this.inventory[itemId] || 0) + count;
        UI.updateInventory();
    },

    removeItem: function(itemId, count) {
        count = count || 1;
        if (this.hasItem(itemId)) {
            this.inventory[itemId] -= count;
            if (this.inventory[itemId] <= 0) {
                delete this.inventory[itemId];
            }
            UI.updateInventory();
            return true;
        }
        return false;
    },

    save: function() {
        return {
            stats: this.stats,
            currencies: this.currencies,
            inventory: this.inventory,
            flags: this.flags
        };
    },

    load: function(data) {
        if (!data) return;
        this.stats = data.stats || this.stats;
        this.currencies = data.currencies || this.currencies;
        this.inventory = data.inventory || this.inventory;
        this.flags = data.flags || this.flags;
        UI.updateStats();
        UI.updateInventory();
    }
};