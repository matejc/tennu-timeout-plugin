tennu-timeout-plugin
====================

This is a plugin for [Tennu IRC Bot Framework](https://github.com/Tennu/tennu).

With this plugin you can select between two actions (when timeout has occured):

1. `reconnect`, the default, reconnects each bot on which timeout has occured.

2. `exit`, terminates nodejs application, this kills your bot or if you have more of them they will also be gone - usefull when you have more of them and they depend heavily on each other, like [irc bridge](https://github.com/Tennu/BridgeBot)


Setup
-----

1. Change directory to where `config.json` is (Tennu's bot config file).

2. Copy `timeout.js` from repository to `./tennu_plugins/timeout.js` (do create `tennu_plugins` subfolder).

3. Edit `config.json` to have a `plugins` line to something like this:

```
"plugins": ["timeout"],
```

4. Run the bot.


Options
-------

- `timeout`: default is `600000` miliseconds which is 10min, which should be enough, if your bot is reconnecting after that many minutes, then increase the number. For example freenode servers have usually around 256 seconds before they issue Ping timeout, you want to have more than this.

- `action`: default is `reconnect` which reconnects each bot that does not receive any raw data in `<timeout>` miliseconds (previous option), the alternative is `exit` which terminates the nodejs application with exit code 1.



Example `config.json` for BridgeBot
-----------------------------------

```
{
    "nickname": "Bridge854",
    "username": "bridge",
    "realname": "BridgeBot v1.0.0 in tennu v0.9.0",
    "disable-help": true,
    "plugins": ["timeout"],
    "timeout": 600000,
    "timeoutaction": "reconnect"
}
```
