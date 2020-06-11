class UserService {
    constructor(userModel) {
        this.userModel = userModel
    }

    signup() {
        console.log(this.userModel, '===================')
    }
}

export default UserService;