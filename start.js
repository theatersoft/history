import {startLocalService} from '@theatersoft/server/lib.es'
startLocalService({
    module: '@theatersoft/history',
    export: 'History',
    name: 'History'
})
