const UI = {
    init: function() {
        this.updateStats();
        this.updateInventory();
    },

    log: function(text) {
        const $log = $('#log');
        const $p = $('<p>').addClass('fade-in').text(text);
        $log.prepend($p);
    },

    logSystem: function(text) {
        const $log = $('#log');
        const $p = $('<p>').addClass('fade-in').css('color', '#4a90e2').text('[System] ' + text);
        $log.prepend($p);
    },

    addButton: function(id, text, callback, disabled) {
        let $btn = $('#' + id);
        if ($btn.length === 0) {
            $btn = $('<button>')
                .attr('id', id)
                .addClass('btn fade-in')
                .appendTo('#actions');
        }
        $btn.text(text).off('click').on('click', callback);
        $btn.prop('disabled', !!disabled);
    },

    removeButton: function(id) {
        $('#' + id).remove();
    },

    updateStats: function() {
        const $container = $('#status-container');
        let $vitals = $('#vitals-panel');
        
        if ($vitals.length === 0) {
            $vitals = $('<div>').attr('id', 'vitals-panel').prependTo($container);
            $('<div>').addClass('header').text('vitals').appendTo($vitals);
            $('<div>').attr('id', 'vitals-list').appendTo($vitals);
        }

        const listHtml = 
            '<div class="row"><span class="label">hp</span><span class="value">' + State.stats.hp + '/' + State.stats.maxHp + '</span></div>' +
            '<div class="row"><span class="label">o2</span><span class="value">' + State.stats.oxygen + '%</span></div>' +
            '<div class="row"><span class="label">lux</span><span class="value">' + State.stats.lux + '</span></div>' +
            '<div class="row"><span class="label">noise</span><span class="value">' + State.stats.noise + ' db</span></div>' +
            '<div class="row"><span class="label">coins</span><span class="value">' + State.currencies.coins + '</span></div>';
            
        $('#vitals-list').html(listHtml);
    },

    updateInventory: function() {
        const $inv = $('#inventory');
        $inv.empty();
        for (let item in State.inventory) {
            const count = State.inventory[item];
            const name = item.replace(/_/g, ' ');
            const $row = $('<div>').addClass('row');
            $('<span>').addClass('label').text(name).appendTo($row);
            $('<span>').addClass('value').text('x' + count).appendTo($row);
            $inv.append($row);
        }
    }
};