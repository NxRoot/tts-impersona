import { PureComponent } from "react"

export interface IntervalProps {
    onFirst?: boolean
    delay?: number | null
    onTick?: any
    initial?: any[]
} 

export default class Interval extends PureComponent<IntervalProps, { items: any[] }> {

    t: any = null
    text = ""
    state: any
    maxItems = 2

    constructor(props: any){
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount(){
        if (!this.props.delay) return
        this.startTimer()
    }

    startTimer(){
        let count = 0
        if(this.props.onFirst && this.props.delay) {
            const res = this.makeCallback(count)
            if(res === true) count++
        }
        
        clearTimeout(this.t)
        this.t = setInterval(() => {

            if(this.props.delay == null) {
                this.clearTimer()
                return
            }

            const res = this.makeCallback(count)
            if(res === true) count++

        }, this.props.delay || 3000)
    }

    makeCallback(tickCount: number){
        const res = this.props.onTick?.(tickCount)

        if(res == true) return res

        const arr = [...this.state.items, res]
        if(res) {
            this.setState({ items: arr })
        }
        return false
    }

    componentDidUpdate(prev: any){
        if(this.props.delay !== null && !this.t){
            this.startTimer()
        }
        // if(this.props.initial !== prev.initial){
        //     const arr = [...this.state.items, this.props.initial || []]
        //     this.setState({items: arr})
        // }
    }

    componentWillUnmount(){
        this.clearTimer()
    }

    clearTimer(){
        clearTimeout(this.t)
        this.t = null
    }

    render(){
        if(!this.props.children && this.state.items.length <= 0) return null

        const joinItems = [...(this.props.initial || []), ...this.state.items]

        return (this.props.children as any)?.(joinItems, this.startTimer, this.clearTimer)
    }
}