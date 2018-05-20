import bus from '@theatersoft/bus'

export class History {
    start ({name, config: {}}) {
        this.name = name
        return bus.registerObject(name, this)
            .then(obj => {
                const register = () => bus.proxy('Device').registerService(this.name)
                bus.registerListener(`Device.start`, register)
                bus.on('reconnect', register)
                register()
            })
    }

    stop () {
    }

    getState () {
        return this.store.getState()
    }
}
