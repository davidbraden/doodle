$(document).ready(function() {
    var canvasElem = $('#canvas');
    var context = canvasElem[0].getContext('2d');


    var xLast, yLast, drawOn = false;

    canvasElem.mousedown(function(e) {
        drawOn = true;
        xLast = getXPosition(e);
        yLast = getYPosition(e);
    });

    canvasElem.mouseup(function(e) {
        drawOn = false;
    });

    canvasElem.mousemove(function(e) {
        if (drawOn) {
            draw(xLast, yLast, getXPosition(e), getYPosition(e));
        }
        xLast = getXPosition(e);
        yLast = getYPosition(e);
    });

    function toggleDraw() {
        drawOn = !drawOn;
    }

    function getXPosition(event) {
        return event.pageX - canvasElem.offset().left;
    }

    function getYPosition(event) {
        return event.pageY - canvasElem.offset().top;
    }

    function draw(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }

    function clear() {
        context.clearRect(0, 0, canvasElem.width(), canvasElem.height());
    }

    function useEraser() {
        context.strokeStyle = '#FFF';
        context.lineWidth = 20;
        canvasElem.addClass('eraser');
        canvasElem.removeClass('pencil');
    };

    function usePencil() {
            context.strokeStyle = '#000';
            context.lineWidth = 1;
            canvasElem.removeClass('eraser');
            canvasElem.addClass('pencil');
        };

    function save() {
        var dataURL = canvas.toDataURL();
        $.ajax({
          type: "POST",
          url: "/draw/save",
          data: {
             imgBase64: canvas.toDataURL()
          }
        }).done(function(o) {
          console.log('saved');
    });
    }

    $('#pencil').click(usePencil);
    $('#eraser').click(useEraser);
    $('#clear').click(clear);
    $('#save').click(save);
});
