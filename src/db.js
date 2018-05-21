import * as Influx from 'influx'
import {Type} from '@theatersoft/device'

export const buildSchema = devices => {
    return  [
        {
            measurement: 'measurement',
            fields: {
                path: Influx.FieldType.STRING,
                duration: Influx.FieldType.INTEGER
            },
            tags: [
                'host'
            ]
        }
    ]
}