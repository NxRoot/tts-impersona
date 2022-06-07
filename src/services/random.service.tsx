
const { remote } = window.require('electron');
const test = remote.require('./test');

const randoms: any = [
    () => Math.floor(Math.random() * 369) > 111,
    (tension = 1) => Math.floor(Math.random() * 111 * tension),
    (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min
]

const suggester = [
    (word: string) => test.Interpreter.suggest(word).trim().split('\n').join(" "),
    (word: string) => test.Interpreter.create_sentence(word, randoms[0]() ? 1 : 2).trim().split('\n').join(" ")
]

const randomizer = [
    (line: string) => randoms[0]() ? "" : line
]

export class RandomService {

    private static aiValue: string = ''
    private static joinLines: boolean = true
    private static tension: number = 1

    private static getLine(lines: any[]){
        const line = Math.floor(Math.random() * lines.length);
        return lines[line];
    }

    private static suggest(lines: string[], singleWord: boolean | number, suggest: boolean | number, addon?: number){
        if(singleWord) return this.getLine(lines)

        const a = this.getLine(lines)
        const s = (!suggester ? '' : suggester[suggest as number](a).split(" ").join(", "))
        return (a + (s !== "" ? (", " + s) : "") + (addon ? ", " + randomizer[addon](this.getLine(lines)) : ''))
    }

    private static simpleSuggestion(lines: string[]){
        const one = this.joinLines ? randoms[0]() : true
        return this.suggest(lines, one, 0)
    }

    private static complexSuggestion(lines: string[]){
        const rand = randoms[1](1)
        const rand2 = randoms[1](this.tension)
        const one = this.joinLines ? rand < rand2 : true

        const sug = this.aiValue && this.aiValue !== "" ? (randoms[0]() ? 0 : 1) : 0
        return this.suggest(lines, one, sug, 0)
    }

    static getRandom(lines: string[], join: boolean, aiVal: string = '', tens: number = 1){
        this.joinLines = join
        this.aiValue = aiVal
        this.tension = tens

        const _useRandom = () => randoms[0]() ? this.simpleSuggestion(lines) : this.complexSuggestion(lines)
        const _useTension = () => this.tension === 0 ? this.simpleSuggestion(lines) : this.complexSuggestion(lines)

        return this.tension === 5 ? _useRandom() : _useTension()
    }

}
