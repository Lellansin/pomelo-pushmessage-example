module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
    this.channelService = app.get('channelService');
};

/** * New client entry chat server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 
 */
Handler.prototype.entry = function(msg, session, next) {
    var self = this;
    console.log('connector.entryHandler.entry~');
    var uid = 1;
    // session.set('uid', 1);
    session.bind(uid);
    session.pushAll();

    var channel = self.channelService.getChannel('global', true);
    var sid = self.app.getServerId();

    console.log('uid:', uid);
    var param = {
        route: 'onPush',
        user: 'hello test2'
    };
    channel.pushMessage(param);

    if (!!channel) {
        channel.add(uid, sid);
    }

    next(null, {
        code: 200,
        msg: 'this Game server is ok.'
    });

};

Handler.prototype.test = function(msg, session, next) {
    console.log('connector.entryHandler.test~');

    var param = {
        route: 'onPush',
        msg: '111111111111111',
        from: '22222222222222',
        target: '3333333333333333'
    };
    var channel = this.channelService.getChannel('global');

    //the target is all users
    channel.pushMessage(param);

    next(null, {
        code: 200,
        msg: 'push over.'
    });
};