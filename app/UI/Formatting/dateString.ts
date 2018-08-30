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

        const month = dateNames[d.getMonth()];

        return `${month} ${d.getDate()}, ${d.getFullYear()}`;
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

        const month = zeroPad(d.getMonth() + 1);
        const day = zeroPad(d.getDate());

        return `${d.getFullYear()}-${month}-${day}`;
    }
}

export default dateString;