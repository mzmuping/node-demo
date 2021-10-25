const getKeys = () => {
    let keys = []
    for (let i = 0; i < 20; i++) {
        keys.push(Math.random())
    }
    return keys
}

module.exports = {
    getKeys
}