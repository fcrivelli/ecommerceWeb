var TABLE_ID = '#mydatatable';
var TABLE_FOOT = '#mydatatable tfoot th';
var CONTAINER = '#container';
var table;

$(document).ready(function() {
    initTable();
});

function initTable () {
    $(TABLE_FOOT).each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Filtrar.." />' );
    } );

    table = $(TABLE_ID).DataTable({
        "dom": 'B<"float-left"i><"float-right"f>t<"float-left"l><"float-right"p><"clearfix">',
        "responsive": false,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        "initComplete": function () {
            this.api().columns().every( function () {
                var that = this;

                $( 'input', this.footer() ).on( 'keyup change', function () {
                    if ( that.search() !== this.value ) {
                        that
                            .search( this.value )
                            .draw();
                        }
                });
            })
        },
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
                    var image =`<img src="${full.id}" height="40"/>`;
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