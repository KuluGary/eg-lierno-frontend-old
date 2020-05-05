export const StringUtil = {
    getRandomInt(min = 1, max = 20) {
        return Math.floor(Math.random() * max ) + min
    },

    swapArrayItems(arr, a, b) {
        var temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;

        return temp;
    },

    getDateFromISODate(ISOdate) {
        const date = new Date(ISOdate);

        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    },

    parseRole(role) {
        role = role.toLowerCase().replace("_", " ");
        role = role[0].toUpperCase() + role.substring(1)

        return role
    }
}