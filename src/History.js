import bus from '@theatersoft/bus'
import * as Influx from 'influx'
import {log} from './log'
import {buildSchema} from './db'

export class History {
    async start ({name}) {
        this.name = name
        const obj = await bus.registerObject(name, this)

        const devices = []
        const influx = new Influx.InfluxDB({
            host: 'localhost',
            database: name,
            schema: buildSchema(devices)
        })

        bus.registerListener('Device.state', state => this.write(state))
    }

    stop () {
        return bus.unregisterObject(this.name)
    }

    async create () {
        const dbs = await influx.getDatabaseNames()
        if (!dbs.includes(name)) await influx.createDatabase(name)
    }

    write (state) {
        log(state)
    }
}
