var TimeoutPlugin = {
    init: function (client, imports) {
        var action, timeout, timer;

        timeout = client._config.timeout?client._config.timeout:600000;
        action = client._config.timeoutaction?client._config.timeoutaction:'reconnect';

        var startTimer = function() {
            client._socket.setTimeout(timeout, function () {
                client.warn('Timeout', 'Will now do: ' + action);
                console.log('Will now do: ' + action);
                switch (action) {
                    case 'reconnect':
                        client.disconnect();
                        setTimeout(client.connect.bind(client), 3000);
                        break;

                    case 'exit':
                        process.exit(1);
                }
            });
        };

        return {
            handlers: {
                '001': function (command) {
                    console.log('Will now startTimer');
                    startTimer();
                }
            }
        }
    }
};

module.exports = TimeoutPlugin;
