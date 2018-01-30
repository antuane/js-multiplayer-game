exports.drawPoligon = function drawPoligon(ctx, image, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI/180);
    ctx.drawImage(image, -(image.width/2), -(image.height/2));
    ctx.restore();
};

exports.drawPlayer = function drawPoligon(ctx, player, x, y) {
    let width = (player.width + player.height) / 4;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(player.angle * Math.PI/180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-width, -width);
    ctx.lineTo(width, 0);
    ctx.lineTo(-width,width);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = player.color;
    ctx.stroke();
    ctx.restore();
};




    