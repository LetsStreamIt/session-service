import { expect } from 'chai'
import { User, UserId, UserRepository } from '../../src/domain/user'

describe("a user repository", () => {

    const uId: UserId = new UserId("test@example.com")
    const user: User = new User(uId, "testUsername")
    let userRepository: UserRepository

    beforeEach(() => {
        userRepository = new UserRepository()
    })

    it("should add a user entity when no user with same id is existing", () => {
        expect(userRepository.add(user)).to.equal(true)
        expect(userRepository.getValues.includes(user)).to.equal(true)
        expect(userRepository.contains(uId)).to.equal(true)
    })

    it("should not add a user entity when another user with same id is existing", () => {
        userRepository.add(user)
        const newUser: User = new User(uId, "newTestUsername")

        expect(userRepository.add(newUser)).to.equal(false)
        expect(userRepository.getValues.includes(newUser)).to.equal(false)
    })


    it("should retreive a user entity given its id", () => {
        userRepository.add(user)
        expect(userRepository.find(uId)).to.equal(user)
    })

    it("should remove a user entity given its id", () => {
        userRepository.add(user)
        expect(userRepository.remove(uId)).to.equal(true)
        expect(userRepository.contains(uId)).to.equal(false)
    })

})