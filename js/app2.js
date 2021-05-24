mobiscroll.settings = {
    lang: 'fr',
    theme: 'material',
    themeVariant: 'light'
};

var instance,
    fromValues = [],
    toValues = [];

for (var i = 0; i <= 1000; i += 20) {
    fromValues.push({
        display: '$' + i,
        value: i
    });
}

toValues = fromValues.slice();
toValues.shift();
toValues.push({
    display: 'over $1000'
});

instance = mobiscroll.scroller('#demo', {
    display: 'inline',
    width: 150,
    wheels: [
        [{
            circular: false,
            data: fromValues,
            label: 'From'
        }, {
            circular: false,
            data: toValues,
            label: 'To'
        }]
    ],
    showLabel: true,
    validate: function (event, inst) {
        var i,
            values = event.values,
            disabledValues = [];

        for (i = 0; i < toValues.length; ++i) {
            if (toValues[i].value <= values[0]) {
                disabledValues.push(toValues[i].value);
            }
        }

        return {
            disabled: [
                [], disabledValues
            ]
        }
    },
    formatValue: function (data) {
        return '$' + data[0] + ' -  $' + data[1];
    },
    parseValue: function (valueText) {
        if (valueText) {
            return valueText.replace(/\s/gi, '').split('-');
        }
        return [0, 20];
    }
});
