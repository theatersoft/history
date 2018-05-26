import * as Influx from 'influx'
import {Interface, Type, interfaceOfType, serviceId} from '@theatersoft/device'
import {error, log} from "./log"
import {last2} from './util'

const
    Measurement = {
        BOOLEAN: 'boolean',
        FLOAT: 'float',
        STRING: 'string'
    },
    measurementOfInterface = i => ({
        [Interface.SENSOR_BINARY]: Measurement.BOOLEAN,
        [Interface.SWITCH_BINARY]: Measurement.BOOLEAN,
        [Interface.SENSOR_MULTILEVEL]: Measurement.FLOAT,
        [Interface.SWITCH_MULTILEVEL]: Measurement.FLOAT
    }),
    schema = [
        {
            measurement: Measurement.BOOLEAN,
            fields: {value: Influx.FieldType.BOOLEAN,},
            tags: ['type', 'id', 'name']
        },
        {
            measurement: Measurement.FLOAT,
            fields: {value: Influx.FieldType.FLOAT,},
            tags: ['type', 'id', 'name']
        },
        {
            measurement: Measurement.STRING,
            fields: {value: Influx.FieldType.STRING,},
            tags: ['type', 'id', 'name']
        }
    ]

export const create = async (name) => {
    const influx = new Influx.InfluxDB({
        host: 'localhost',
        database: name,
        schema
    })
    try {
        const dbs = await influx.getDatabaseNames()
        if (!dbs.includes(name)) {
            await influx.createDatabase(name)
            log(`created database ${name}`)
            return influx
        }
    } catch (e) {
        error(`InfluxDB database create failed`);
        throw e
    }
}

const filter = f => (devices, ...rest) => f(
    devices.filter(({id}) => !['Automation', 'Hvac'].includes(serviceId(id)[0])),
    ...rest)

export const write = filter(last2()((devices, prev, influx) => {
    console.log(devices, prev)
// TODO diff
// influx.writePoints([
//     {
//         measurement: 'devices',
//         tags: { type, id, name },
//         fields: { bool, num},
//     }
// ])
}))
