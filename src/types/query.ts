import * as qs from 'qs'

export interface Query {
    text: string;

    page_idx: number;
    page_size:number;
}


export const emptyQuery: Query = {
    text:'',
    page_idx:0,
    page_size:10
}

export const to_url = (query:Query):string => qs.stringify(query)
export const from_url = (inp:string):Query => {
    let rawdata = qs.parse(inp.slice(1))

    let parsed = {...rawdata,
                    page_idx:
                        rawdata.page_idx !== undefined
                            ?parseInt(rawdata.page_idx as string)
                            :0,
                    page_size:
                        rawdata.page_size !== undefined
                            ?parseInt(rawdata.page_size as string)
                            :0
                     
                }
    
    return parsed as unknown as Query}
