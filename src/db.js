import * as Influx from 'influx'
import {Interface, Type, interfaceOfType, serviceId} from '@theatersoft/device'
import {error, log} from "./log"
import {flatten, last2, diffs} from './util'

const
    Measurement = {
        BOOLEAN: 'boolean',
        INTEGER: 'integer',
        STRING: 'string'
    },
    schema = [
        {
            measurement: Measurement.BOOLEAN,
            fields: {value: Influx.FieldType.BOOLEAN,},
            tags: ['type', 'id', 'name']
        },
        {
            measurement: Measurement.INTEGER,
            fields: {value: Influx.FieldType.INTEGER,},
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

const
    measurementOfInterface = i => ({
        [Interface.SENSOR_BINARY]: Measurement.BOOLEAN,
        [Interface.SWITCH_BINARY]: Measurement.BOOLEAN,
        [Interface.SENSOR_MULTILEVEL]: Measurement.INTEGER,
        [Interface.SWITCH_MULTILEVEL]: Measurement.INTEGER
    })[i],
    measurementOfValue = i => ({
        'boolean': Measurement.BOOLEAN,
        'number': Measurement.INTEGER,
        'string': Measurement.STRING,
    })[typeof i],
    propDefined = p => x => x[p] !== undefined,
    pointsOfDevices = devices =>
        devices
            .map(({type, id, name, value}) => ({
                measurement: measurementOfValue(value) || measurementOfInterface(interfaceOfType(type)),
                tags: {type, id, name},
                value,
            }))
            .filter(propDefined('measurement')),
    pipe = (f, g) => x => g(f(x)),
    filter = pipe(flatten, last2({})(diffs))

export const write = (devices, influx) => {
    const points = pointsOfDevices(filter(devices))
    console.log(points)
    // influx.writePoints()
}
