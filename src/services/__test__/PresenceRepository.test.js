import PouchDBProvider from "../PouchDBProvider"
import {
    PresenceRepository
} from "../PresenceRepository"

describe('PresenceRepository', () => {

    let db, repository

    beforeEach(async () => {
        db = PouchDBProvider.create('presenceRepositoryTest')
        repository = new PresenceRepository('presenceRepositoryTest')
        repository.db = db

        // 
    })

    it.skip('Finds all event types', async () => {

    })

    afterEach(async () => {
        await db.destroy()
    })
})