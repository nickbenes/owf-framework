Ext.define('Ozone.components.admin.StacksGrid', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.stacksgrid'],
    plugins: new Ozone.components.focusable.FocusableGridPanel(),
    mixins: {
        filter: 'Ozone.components.admin.grid.FilterMixin'
    },

    cls: 'grid-stack',

    title: 'Apps',
    columns: [
        {
          itemId: 'id',
          header: 'ID',
          dataIndex: 'id',
          sortable: true,
          hidden: true
        },
        {
            header: 'Title',
            dataIndex: 'name',
            flex: 8,
            renderer: function(v) {
                return v ? Ext.htmlEncode(v) : "";
            }
            // renderer: function(value, metaData, record, rowIndex, colIndex, store) {
            //     var title = value;
            //     var url = record.get('imageUrl');

            //     var contextPath = Ozone.util.contextPath();
            //     if (!url.match(new RegExp('^/?' + contextPath + '/.*$', 'i')) && !url.match(new RegExp('^https?://.*', 'i'))) {
            //         //url is not relative to the contextPath
            //         if (url.indexOf('/') == 0) {
            //             url = contextPath + url;
            //         }
            //         else {
            //             url = contextPath + '/' + url;
            //         }
            //     }

            //     var retVal = '<div class="grid-icon-and-text-title-box"><div class="grid-icon-and-text-icon"><img class="grid-icon-and-text-icon-image" src="' + Ext.htmlEncode(url) + '">';
            //     retVal += '</div>';
            //     retVal += '<div class="grid-icon-and-text-title">' + Ext.htmlEncode(title) + '</div>';

            //     return  retVal;
            // }
        }, {
            header: 'URL Name',
            dataIndex: 'stackContext',
            flex: 4,
            hidden: true,
            renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                return  Ext.htmlEncode(value);
            }
        }, {
            header: 'Pages',
            dataIndex: 'totalDashboards',
            flex: 3,
            sortable: false
        }, {
            header: 'App Components',
            dataIndex: 'totalWidgets',
            flex: 4,
            sortable: false
        }, {
            header: 'Groups',
            dataIndex: 'totalGroups',
            flex: 3,
            sortable: false
        }, {
            header: 'Users',
            dataIndex: 'totalUsers',
            flex: 3,
            sortable: false
        }
    ],
    defaultPageSize: 50,
    multiSelect: true,
    
    initComponent: function() {
        Ext.apply(this,{
        	columnLines:true
        });
        this.store = Ext.create('Ozone.data.StackStore', {
            id: 'stackstore',
            autoLoad: false,
            pageSize: this.defaultPageSize
        });
        
        this.bbar = Ext.create('Ext.toolbar.Paging', {
            itemId: 'bottomBar',
            store: this.store,
            pageSize: this.pageSize,
            displayInfo: true
        });
        
        this.relayEvents(this.store, ['datachanged']);
        
        this.callParent(arguments);
    },

    setBaseParams: function (params) {
    	this.baseParams = params;
    	if (this.store.proxy.extraParams) {
            Ext.apply(this.store.proxy.extraParams, params);
        } else {
            this.store.proxy.extraParams = params;
        }
    },

    setStore: function(store, cols) {
        this.reconfigure(store, cols);
        var pgtb = this.getBottomToolbar();
        if (pgtb) { pgtb.bindStore(store); }
    },

    getTopToolbar: function() {
    	return this.getDockedItems('toolbar[dock="top"]')[0];
    },

    getBottomToolbar: function() {
    	return this.getDockedItems('toolbar[dock="bottom"]')[0];
    },

    load: function() {
        this.store.loadPage(1);
    },

    refresh: function() {
      this.store.loadPage(this.store.currentPage);
    }
});
