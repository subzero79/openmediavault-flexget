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
            id      : me.getId() + "-check",
            xtype   : "button",
            text    : _("Check Syntax"),
            icon    : "images/check.png",
            iconCls : Ext.baseCSSPrefix + "btn-icon-16x16",
            scope   : me,
            handler : Ext.Function.bind(me.onCheckButton, me, [ me ])
        },{
            id      : me.getId() + "-runonce",
            xtype   : "button",
            text    : _("Run Once"),
            icon    : "images/check.png",
            iconCls : Ext.baseCSSPrefix + "btn-icon-16x16",
            scope   : me,
            handler : Ext.Function.bind(me.onRunOnceButton, me, [ me ])
        },{
			id      : me.getId() + "-runupgrade",
            xtype   : "button",
            text    : _("Upgrade Flexget"),
            icon    : "images/check.png",
            iconCls : Ext.baseCSSPrefix + "btn-icon-16x16",
            scope   : me,
            handler : Ext.Function.bind(me.onRunUpgradeButton, me, [ me ])
        
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
                name: "config",
                fieldLabel: _("Config.yml"),
                height: 500,
                allowBlank: true
            }]
        }];
    },

    onCheckButton: function() {
        var me = this;
        var config = me.findField("config").getValue();
        var wnd = Ext.create("OMV.window.Execute", {
            title           : _("Checking config ..."),
            rpcService      : "Flexget",
            rpcMethod       : "doCheckSyntax",
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
    
    onRunUpgradeButton: function() {
        var me = this;
        var config = me.findField("config").getValue();
        var wnd = Ext.create("OMV.window.Execute", {
            title           : _("Upgrading Flexget..."),
            rpcService      : "Flexget",
            rpcMethod       : "doRunUpgrade",
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
