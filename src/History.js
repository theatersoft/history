import {bus, proxy} from '@theatersoft/bus'
import {create, write} from './db'

export class History {
    async start({name}) {
        this.name = name
        await bus.registerObject(name, this)
        try {
            this.influx = await create(name,)
            bus.registerListener('Device.state', ({devices}) => write(devices, this.influx))
        } catch (e) {
            this.stop()
            throw e
        }
    }

    stop() {
        return bus.unregisterObject(this.name)
    }
}
