import {bus, proxy} from '@theatersoft/bus'
import {create, write} from './db'

export class History {
    async start ({name}) {
        this.name = name
        await bus.registerObject(name, this)
        try {
            this.influx = await create(name)
            const writeState = ({devices}) => write(devices, this.influx)
            writeState(await proxy('Device').getState())
            bus.registerListener('Device.state', writeState)
        } catch (e) {
            this.stop()
            throw e
        }
    }

    stop () {
        return bus.unregisterObject(this.name)
    }
}
