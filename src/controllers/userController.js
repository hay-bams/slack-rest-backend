class UserController {
    constructor(Container) {
        this.user = Container.get('userService')
    }

    signup(req, res) {
        this.user.signup()
    }
}
 
export default UserController