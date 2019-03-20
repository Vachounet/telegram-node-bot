'use strict'

const BaseCommand = require('./BaseCommand')

class TextCommand extends BaseCommand {
    /**
     * @param {string} textPattern
     * @param {string} [handler]
     */
    constructor(textPattern, handler, help) {
        super()
        this._textPattern = textPattern
        this._handler = handler
        this._help = help
    }

    /**
     * @param {Scope} scope
     * @returns {boolean}
     */
    test(scope) {
        return scope.message.text &&
            scope.message.text.startsWith(this._textPattern)
    }

    /**
     * @returns {string}
     */
    get handlerName() {
        return this._handler
    }
}

module.exports = TextCommand