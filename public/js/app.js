(function(){
    const infoProduct = $("#infoProduct");
    $( "a.open-info-product" ).click(function(event) {
      event.preventDefault();
      const id = $( this ).attr('data-id');
      const href = `/api/show/${id}`;
      $.get( href, function(data) {
        $( infoProduct ).find( "#productName" ).text(data.name);
        $( infoProduct ).find( "#productPrice" ).text(data.price);
        $( infoProduct ).find( "#productImage" ).attr("src", "/img/" + data.photo);
        infoProduct.modal('show');
      })
    });
    $(".closeInfoProduct").click(function (e) {
      infoProduct.modal('hide');
    });
    $( ".add-to-cart" ).click(function(event) {
        event.preventDefault();
        const id = $( this ).attr('data-id');
        const href = `/cart/add/${id}`;

        $.get( href, function(data) {
            $( "#cart-modal .name" ).text(data.name);
            $( "#cart-modal img" ).attr("src", "/img/" + data.photo);
            $( "#cart-modal #quantity" ).val(data.quantity);
            $( "#totalItems" ).text("(" + data.totalItems + ")");
            $('#cart-modal').modal('show');
        })
    });

    $( ".remove-from-cart" ).click(function(event) {
        event.preventDefault();
        const id = $( this ).attr('data-id');
        const href = `/cart/delete/${id}`;

        $.get( href, function(data) {
            $(`#item-${id}`).hide('slow', function(){ 
                $(`#item-${id}`).remove(); 
                if ($(".blog-item").length == 0) {
                    location.reload(); // Reload if cart becomes empty to show empty message
                }
            });
            $( "#totalCart" ).text("Total: " + data.totalCart + " €");
            $( "#totalItems" ).text("(" + data.totalItems + ")");
        })
    });

    $(".closeCart").click(function (e) {
        $('#cart-modal').modal('hide');
    });
})();
