var TABLE_ID = '#mydatatable';
var CONTAINER = '#container';
var SEARCH_ID = '#mysearch';
var table;

$(document).ready(function() {
    initTable();
    initSearch();
});

function initSearch(){
    $(SEARCH_ID).on('change', function() {
        $(TABLE_ID).dataTable().
        alert( "Handler for .change() called." );
    });
}

function loadTable (products) {
    $(TABLE_ID).dataTable().fnClearTable();
    if (products.length > 0) {
        $(TABLE_ID).dataTable().fnAddData(products);
    }
    $(TABLE_ID).dataTable().fnDraw();
}

function initTable () {
    table = $(TABLE_ID).DataTable({
        "aoColumns": [{
                "sTitle": "#",
                "mData": "id",
                "bSearchable": true
            },
            {
                "sTitle": "Nombre",
                "mData": "name",
                "bSearchable": true
            },
            {
                "sTitle": "Precio",
                "mData": "price",
                "bSearchable": true
            },
            {
                "sTitle": "Stock",
                "mData": "stock",
                "bSearchable": true
            },
            {
                "sTitle": "Categoria",
                "mData": "category",
                "bSearchable": true
            },
            {
                "sTitle": "Imagen",
                "mData": "thumbnail",
                "render": function(data, type, full, meta) {
                    var image =`<img src=${full.thumbnail} height="40"/>`;
                    return image;
                },
                "bSearchable": true
            },
        ],
        "scrollY": "300px",
        "scrollX": true,
        "scrollCollapse": true,
        "paging": false,
        "columnDefs": [
            { width: '20%', targets: 0 }
        ],
        "ajax": {
        },
        "fixedColumns": true,
        "serverSide": false,
        "deferLoading": 0,
        "order": [
            [1, "asc"]
        ]
    });
    $(CONTAINER).css('display', 'block');
    table.columns.adjust().draw();
}
