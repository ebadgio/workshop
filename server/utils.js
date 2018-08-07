const generateError = (name) => {
    const err = new Error();
    err.name = name;
    return err;
};

module.exports = {
    generateError: generateError
}