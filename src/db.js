import * as Influx from 'influx'
import {Interface, Type, interfaceOfType} from '@theatersoft/device'
import {error, log} from "./log"

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

export const write = (state, influx) => {
    log(state)
    // TODO diff
    // influx.writePoints([
    //     {
    //         measurement: 'devices',
    //         tags: { type, id, name },
    //         fields: { bool, num},
    //     }
    // ])
}