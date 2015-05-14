Package.describe({
  summary: "Realtime Collaborative IDE for Meteor",
  version: "0.2.0",
  name: "nucleuside:nucleus",
  git: 'https://github.com/nucleuside/nucleus'
});


Npm.depends({
  'fibers': '1.0.2',
  'github-oauth': '0.2.1',
  'mup': '0.9.7',
  'nucleus-watch-meteor': 'https://github.com/NucleusIDE/nucleus-watch-meteor/archive/fdabf2f83a586cda74a928bc37ec8f0f7fba26dd.tar.gz'
});

Package.on_use(function (api, where) {
  api.versionsFrom("METEOR@0.9.1");
  api.use(['ui', 'spacebars','blaze', 'jquery', 'deps', 'templating', 'underscore', 'session', 'http',
           'reactive-var',
           'mrt:moment@2.8.1',
           'nucleuside:smart-models@0.0.6',
           'nucleuside:live-update@0.2.1',
           'nucleuside:basic-auth@0.2.1',
           'nucleuside:simplewebrtc@0.0.1',
           'mizzao:sharejs@0.6.1',
           'nucleuside:terminal@0.2.0',
           'nucleuside:eventsync@0.1.0',
           'mrt:flash-messages@0.2.4',
           'aldeed:autoform@4.0.0',
           'kevohagan:ramda@0.13.0']);

  //we create /nucleus route only when iron:router is present. Otherwise we manually check the url
  api.use('iron:router@0.9.0 || 1.0.0', {weak: true});
  api.use('iron:router@0.9.0 || 1.0.0', 'server');

  api.imply([
    'reactive-var',
    'kevohagan:ramda@0.13.0',
    'aldeed:autoform@4.0.0'
  ]);


  //Add core nucleus plugin files
  //It is safe to put them here because these are actually executed only after NucleusClient is initialized
  api.add_files([
    'client/plugins/NucleusClient.kbd.js',
    'client/plugins/master-prompt.js',
    'client/plugins/fuzzy-find-file.js',
    'client/plugins/nucleus-terminal.js',
  ], 'client');

  api.add_files([
    'public/logo.png',
  ], 'client', {isAsset: true});

  api.add_files([
    'server/secret_keys.js'
  ], 'server');

  api.add_files([
    'both/master_config.js',
    'both/nucleus_global.js',
    'both/plugin-manager.js',
    'both/deploy.js',
    'both/utilities.js',
    'both/collections.js',
    'chat/both/chat_model.js',
    'both/models/nucleus_user.js',
  ], ['client', 'server']);

  api.add_files([
    'client/lib/cookie.js',
    'client/lib/jstree/jstree.js',
    'client/lib/jstree/themes/default/style.css',

    'client/lib/font-awesome/css/font-awesome.css',
    'client/lib/hint.css',

    'client/nucleus_editor.js',
    'client/event-sync.js',
    'client/nucleus_client.js',
    'client/nucleus_sidebar.js',
    'client/keepalive.js',
    'client/routes.js',

    'client/template.css',
    'client/template.html',
    'client/template.js',

    'chat/client/subscriptions.js'
  ], ['client']);

  api.add_files([
    'client/lib/jstree/themes/default/32px.png',
    'client/lib/jstree/themes/default/40px.png',
    'client/lib/jstree/themes/default/throbber.gif',

    'client/lib/font-awesome/fonts/FontAwesome.otf',
    'client/lib/font-awesome/fonts/fontawesome-webfont.woff',
    'client/lib/font-awesome/fonts/fontawesome-webfont.ttf',
    'client/lib/font-awesome/fonts/fontawesome-webfont.svg',
    'client/lib/font-awesome/fonts/fontawesome-webfont.eot',
  ], 'client', {isAsset: true});

  api.add_files([
    'server/publishers.js',
    'server/login-routes.js',
    'server/git_operations.js',
    'server/crash_watcher.js',
    'server/nucleus.js',
    'server/methods.js',
    'server/keepalive.js',
    'server/permissions.js',
    'chat/server/publishers.js'
  ], ['server']);


  api.export && api.export(['NucleusUser', 'NucleusGlobal'], ['server', 'client']);
  api.export && api.export(['Nucleus', 'NucleusGit'], ['server']);
  api.export && api.export(['NucleusClient', 'NucleusEditor', 'LiveUpdate'], ['client']);
});
