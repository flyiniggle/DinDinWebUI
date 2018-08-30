const zeroPad = function (n: number): string {
    return n.toString().length === 1 ? `0${n}` : n.toString();
}

const dateString = {
    display(date: string | Date): string {
        const dateNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];
        let d;

        if (date instanceof Date) {
            d = date
        } else {
            d = new Date(date);
        }

        if (isNaN(d)) {
            throw new TypeError('Parameter \'date\' must be a valid Date or datestring.');
        }

        const month = dateNames[d.getUTCMonth()];

        return `${month} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
    },

    store(date: string | Date): string {
        let d;

        if (date instanceof Date) {
            d = date
        } else {
            d = new Date(date);
        }

        if (isNaN(d)) {
            throw new TypeError('Parameter \'date\' must be a valid Date or datestring.');
        }

        const month = zeroPad(d.getUTCMonth() + 1);
        const day = zeroPad(d.getUTCDate());

        return `${d.getUTCFullYear()}-${month}-${day}`;
    }
}

export default dateString;