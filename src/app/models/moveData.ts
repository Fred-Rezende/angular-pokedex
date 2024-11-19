export type MoveData = {
    id: number
    name: string
    power: number
    accuracy: number
    pp: number
    effect_entries: {
        0: {
            effect: string
            short_effect: string
        }
    }
    type: {
        name: string
        url: string
    }
}