export type ItemCategoryData = {
    id: number
    name: string
    items: {
        name: string
        url: string
    }[]
    pocket: {
        name: string
        url: string
    }
}