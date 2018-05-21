import bus from '@theatersoft/bus'
import * as Influx from 'influx'

export class History {
    async start ({name, config: {}}) {
        this.name = name
        const obj = await bus.registerObject(name, this)

        const influx = new Influx.InfluxDB({
            host: 'localhost',
            database: name,
            schema: [
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
        })

        const dbs = await influx.getDatabaseNames()
        if (!dbs.includes(name)) await influx.createDatabase(name)

    }

    stop () {
    }
}
