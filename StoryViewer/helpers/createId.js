class ID {
    static create() {
        return Math.random().toString(36).substr(2, 9);
    }

    static getFilename(id) {
        return '_' + id + '.json';
    }
}

module.exports = ID;