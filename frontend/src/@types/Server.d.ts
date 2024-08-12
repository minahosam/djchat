export interface Server {
    id : number
    name : string
    server : string
    description : string
    icon : string
    category : string
    channel_server : {
        map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): any
        id : number
        name : string
        server : number
        topic : string
        owner : number
    }
}