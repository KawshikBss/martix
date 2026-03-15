export function getRandomColor() {
    var letters = "02468ACE";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * (letters.length - 1))];
    }
    return color;
}
