var TimeoutPlugin = {
    init: function (client, imports) {
        var action, timeout, timer;

        timeout = client._config.timeout?client._config.timeout:600000;
        action = client._config.timeoutaction?client._config.timeoutaction:'reconnect';

        var startTimer = function() {
            timer = setTimeout(function() {
                client.warn('Timeout', 'Will now do: ' + action);
                switch (action) {
                    case 'reconnect':
                        client.disconnect();
                        setTimeout(client.connect.bind(client), 3000);
                        break;

                    case 'exit':
                        process.exit(1);
                }
            }, timeout);
        };

        var stopTimer = function() {
            if (timer !== undefined) {
                clearTimeout(timer);
                timer = undefined;
            }
        };

        return {
            handlers: {
                'ping': function (command) {
                    stopTimer();
                    startTimer();
                }
            }
        }
    }
};

module.exports = TimeoutPlugin;
