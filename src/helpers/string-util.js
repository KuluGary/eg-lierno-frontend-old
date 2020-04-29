export const StringUtil = {
    getRandomInt(min = 1, max = 20) {
        return Math.floor(Math.random() * max ) + min
    },

    swapArrayItems(arr, a, b) {
        var temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;

        return temp;
    }
}