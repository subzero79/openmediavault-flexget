// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")
// require("js/omv/workspace/window/TextArea.js")

Ext.define("OMV.module.admin.service.flexget.Settings", {
    extend: "OMV.workspace.form.Panel",
    
    // This path tells which RPC module and methods this panel will call to get 
    // and fetch its form values.
    rpcService: "Flexget",
    rpcGetMethod: "getSettings",
    rpcSetMethod: "setSettings",

    getButtonItems : function() {
        var me = this;
        var items = me.callParent(arguments);
        items.push({
            id      : me.getId() + "-restart",
            xtype   : "button",
            text    : _("Restart"),
            icon    : "images/reboot.png",
            iconCls : Ext.baseCSSPrefix + "btn-icon-16x16",
            scope   : me,
            handler : Ext.Function.bind(me.onRestartFlexgetButton, me, [ me ])
        },{
            id      : me.getId() + "-check",
            xtype   : "button",
            text    : _("Syntax"),
            icon    : "images/spell-check.png",
            iconCls : Ext.baseCSSPrefix + "btn-icon-16x16",
            scope   : me,
            handler : Ext.Function.bind(me.onCheckButton, me, [ me ])
        },{
            id      : me.getId() + "-runonce",
            xtype   : "button",
            text    : _("Run Once"),
            icon    : "images/play.png",
            iconCls : Ext.baseCSSPrefix + "btn-icon-16x16",
            scope   : me,
            handler : Ext.Function.bind(me.onRunOnceButton, me, [ me ])
        },{
            id      : me.getId() + "-getserieslist",
            xtype   : "button",
            text    : _("Series List"),
            icon    : "images/list2.png",
            iconCls : Ext.baseCSSPrefix + "btn-icon-16x16",
            scope   : me,
            handler : Ext.Function.bind(me.onGetSeriesList, me, [ me ])
        },{
            id      : me.getId() + "-gethistory",
            xtype   : "button",
            text    : _("History"),
            icon    : "images/history.png",
            iconCls : Ext.baseCSSPrefix + "btn-icon-16x16",
            scope   : me,
            handler : Ext.Function.bind(me.onGetHistory, me, [ me ])
        },{
			id      : me.getId() + "-runupgrade",
            xtype   : "button",
            text    : _("Upgrade"),
            icon    : "images/add.png",
            iconCls : Ext.baseCSSPrefix + "btn-icon-16x16",
            scope   : me,
            handler : Ext.Function.bind(me.onRunUpgradeButton, me, [ me ])
        },{
            id      : me.getId() + "-getinfo",
            xtype   : "button",
            text    : _("Info"),
            icon    : "images/info.png",
            iconCls : Ext.baseCSSPrefix + "btn-icon-16x16",
            scope   : me,
            handler : Ext.Function.bind(me.onGetVersionButton, me, [ me ])
        
        });
        return items;
    },

    // getFormItems is a method which is automatically called in the 
    // instantiation of the panel. This method returns all fields for 
    // the panel.
    getFormItems: function() {
        return [{
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield. 
            xtype: "fieldset",
            title: _("General"),
            fieldDefaults: {
                labelSeparator: ""
            },
            // The items array contains items inside the fieldset xtype.
            items: [{
                xtype: "checkbox",
                // The name option is sent together with is value to RPC
                // and is also used when fetching from the RPC.
                name: "enable",
                fieldLabel: _("Enable"),
                // checked sets the default value of a checkbox.
                checked: false
            },
            {
                xtype: "textarea",
                cls: "x-form-textarea-monospaced",
                name: "config",
                fieldLabel: _("Config.yml"),
                height: 500,
                allowBlank: true
            }]
        }];
    },

    onRestartFlexgetButton: function() {
        var me = this;
        var config = me.findField("config").getValue();
        var wnd = Ext.create("OMV.window.Execute", {
            title           : _("Restarting Daemon and reloading config.yml"),
            rpcService      : "Flexget",
            rpcMethod       : "doRestartFlexget",
            rpcParams      : {
                "config" : config
            },
            rpcIgnoreErrors : true,
            hideStartButton : true,
            hideStopButton  : true,
            width           : 250,
            height			: 200,
            cls             : "x-form-textarea-monospaced",
            listeners       : {
                scope     : me,
                finish    : function(wnd, response) {
                    wnd.appendValue(_("Done..."));
                    wnd.setButtonDisabled("close", false);
                },
                exception : function(wnd, error) {
                    OMV.MessageBox.error(null, error);
                    wnd.setButtonDisabled("close", false);
                }
            }
        });
        wnd.setButtonDisabled("close", true);
        wnd.show();
        wnd.start();
    },

    onCheckButton: function() {
        var me = this;
        var config = me.findField("config").getValue();
        var wnd = Ext.create("OMV.window.Execute", {
            title           : _("Checking config.yml Syntax ..."),
            rpcService      : "Flexget",
            rpcMethod       : "doCheckSyntax",
            rpcParams      : {
                "config" : config
            },
            rpcIgnoreErrors : true,
            hideStartButton : true,
            hideStopButton  : true,
            width           : 750,
            cls             : "x-form-textarea-monospaced",
            listeners       : {
                scope     : me,
                finish    : function(wnd, response) {
                    wnd.appendValue(_("Done..."));
                    wnd.setButtonDisabled("close", false);
                },
                exception : function(wnd, error) {
                    OMV.MessageBox.error(null, error);
                    wnd.setButtonDisabled("close", false);
                }
            }
        });
        wnd.setButtonDisabled("close", true);
        wnd.show();
        wnd.start();
    },
    
    onRunOnceButton: function() {
        var me = this;
        var config = me.findField("config").getValue();
        var wnd = Ext.create("OMV.window.Execute", {
            title           : _("Running one time ..."),
            rpcService      : "Flexget",
            rpcMethod       : "doRunOnce",
            rpcParams      : {
                "config" : config
            },            
            rpcIgnoreErrors : true,
            hideStartButton : true,
            hideStopButton  : true,
            listeners       : {
                scope     : me,
                finish    : function(wnd, response) {
                    wnd.appendValue(_("Done..."));
                    wnd.setButtonDisabled("close", false);
                },
                exception : function(wnd, error) {
                    OMV.MessageBox.error(null, error);
                    wnd.setButtonDisabled("close", false);
                }
            }
        });
        wnd.setButtonDisabled("close", true);
        wnd.show();
        wnd.start();
    },
 
     onGetSeriesList: function() {
        var me = this;
        var config = me.findField("config").getValue();
        var wnd = Ext.create("OMV.window.Execute", {
            title           : _("Getting Series List ..."),
            rpcService      : "Flexget",
            rpcMethod       : "doGetSeriesList",
            rpcParams      : {
                "config" : config
            },            
            cls             : "x-form-textarea-monospaced",
            height          : 450,
            width           : 750,
            rpcIgnoreErrors : true,
            hideStartButton : true,
            hideStopButton  : true,
            listeners       : {
                scope     : me,
                finish    : function(wnd, response) {
                    wnd.appendValue(_("Done..."));
                    wnd.setButtonDisabled("close", false);
                },
                exception : function(wnd, error) {
                    OMV.MessageBox.error(null, error);
                    wnd.setButtonDisabled("close", false);
                }
            }
        });
        wnd.setButtonDisabled("close", true);
        wnd.show();
        wnd.start();
    },
    
     onGetHistory: function() {
        var me = this;
        var config = me.findField("config").getValue();
        var wnd = Ext.create("OMV.window.Execute", {
            title           : _("Printing last 20 Entries ..."),
            rpcService      : "Flexget",
            rpcMethod       : "doGetHistory",
            rpcParams      : {
                "config" : config
            },            
            cls             : "x-form-textarea-monospaced",
            flex            : 1,
            height          : 450,
            width           : 750,
            rpcIgnoreErrors : true,
            hideStartButton : true,
            hideStopButton  : true,
            listeners       : {
                scope     : me,
                finish    : function(wnd, response) {
                    wnd.appendValue(_("Done..."));
                    wnd.setButtonDisabled("close", false);
                },
                exception : function(wnd, error) {
                    OMV.MessageBox.error(null, error);
                    wnd.setButtonDisabled("close", false);
                }
            }
        });
        wnd.setButtonDisabled("close", true);
        wnd.show();
        wnd.start();
    },
    
    onRunUpgradeButton: function() {
        var me = this;
        var config = me.findField("config").getValue();
        var wnd = Ext.create("OMV.window.Execute", {
            title           : _("Upgrading Flexget..."),
            rpcService      : "Flexget",
            rpcMethod       : "doRunUpgrade",
            rpcIgnoreErrors : true,
            hideStartButton : true,
            hideStopButton  : true,
            height          : 450,
            width           : 750,
            listeners       : {
                scope     : me,
                finish    : function(wnd, response) {
                    wnd.appendValue(_("Done..."));
                    wnd.setButtonDisabled("close", false);
                },
                exception : function(wnd, error) {
                    OMV.MessageBox.error(null, error);
                    wnd.setButtonDisabled("close", false);
                }
            }
        });
        wnd.setButtonDisabled("close", true);
        wnd.show();
        wnd.start();
    },
    
    onGetVersionButton: function() {
        var me = this;
        var config = me.findField("config").getValue();
        var wnd = Ext.create("OMV.window.Execute", {
            title           : _("Get version info..."),
            rpcService      : "Flexget",
            rpcMethod       : "doGetVersion",
            rpcIgnoreErrors : true,
            hideStartButton : true,
            hideStopButton  : true,
            height          : 150,
            width           : 250,
            listeners       : {
                scope     : me,
                finish    : function(wnd, response) {
                    wnd.appendValue(_("Done..."));
                    wnd.setButtonDisabled("close", false);
                },
                exception : function(wnd, error) {
                    OMV.MessageBox.error(null, error);
                    wnd.setButtonDisabled("close", false);
                }
            }
        });
        wnd.setButtonDisabled("close", true);
        wnd.show();
        wnd.start();
    }
      
});
// Register a panel into the GUI.
//
// path: 
//     We want to add the panel in our flexget node. 
//     The node was configured with the path /service and the id flexget.
//     The path is therefore /service/flexget.
//
// className: 
//     The panel which should be registered and added (refers to 
//     the class name).
OMV.WorkspaceManager.registerPanel({
    id: "settings", 
    path: "/service/flexget", 
    text: _("Settings"), 
    position: 10,
    className: "OMV.module.admin.service.flexget.Settings" 
});
