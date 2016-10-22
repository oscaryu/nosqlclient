/**
 * Created by RSercan on 17.1.2016.
 */
Meteor.startup(function () {
    // create a setting if not exist
    let home = process.env.HOME || process.env.USERPROFILE;
    home = home.replace(/\\/g, "/");
    if (!Settings.findOne()) {
        Settings.insert({
            scale: "MegaBytes",
            defaultResultView: "Jsoneditor",
            maxAllowedFetchSize: 3,
            autoCompleteFields: false,
            socketTimeoutInSeconds: 5,
            connectionTimeoutInSeconds: 3,
            showDBStats: true,
            dumpPath: home + "/myDumps/"
        });
    }

    if (process.env.MONGOCLIENT_AUTH == 'true') {
        let basicAuth = new HttpBasicAuth(function (username, password) {
            return (process.env.MONGOCLIENT_USERNAME == username && process.env.MONGOCLIENT_PASSWORD == password);
        });
        basicAuth.protect();
    }
});