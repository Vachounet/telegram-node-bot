function parse(message, prefix) {

    function fail(error, code) {
        const result = new ParsedMessage();
        result.success = false;
        result.message = message;
        result.prefix = prefix;
        result.error = error;
        result.code = code;

        return result;
    }

    try {

        let remaining = message.slice(prefix.length);

        if (!remaining.length)
            return;

        let result = new ParsedMessage();

        if (!message.startsWith(prefix))
            return;

        result.command = remaining.match(RE_CMD_MATCHER)[0];

        remaining = remaining.slice(result.command.length).trim();

        result.success = true
        result.code = 'OK';
        result.prefix = prefix;
        result.arguments = getArgs(remaining);

        return result;

    } catch (e) {

        return fail(e.stack, "UNKNOWN_ERROR");

    }
}

function getArgs(str) {

    let splitted = str.match(RE_ARG_MATCHER);

    return splitted.map(v => v.replace(RE_QUOTE_STRIP, ''));
}

class ParsedMessage {
    constructor() {
        this.success = false;
        this.prefix = '';
        this.command = '';
        this.arguments = [];
        this.error = '';
        this.code = '';
        this.body = '';
        this.message = null;
    }
}

const RE_ARG_MATCHER = /"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|```((.|\s)*?)```|\S+/g;
const RE_CMD_MATCHER = /^[a-z0-9]+/gi;
const RE_QUOTE_STRIP = /^"|"$|^'|'$|^```(\S*\n?)|```$/g;
const RE_STARTS_WITH_WHITESPACE = /^\s/;

module.exports.parse = parse;
module.exports.ParsedMessage = ParsedMessage;
