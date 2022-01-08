import { response, Router } from "express";
import { authenticateadmin, authenticateCompanyadmin, authenticatemanager, authenticateuser } from "../../MiddleWare";
import { User } from "../Models/User";

const router = Router();
//Login 
router.post("/login", (req, res) => { // If email or password fields are not entered return error
    if (!req.body.email) {
        return res.status(400).send({
            err: "email field is required !",
        });
    }
    if (!req.body.password) {
        return res.status(400).send({
            err: "password feild is required !",
        });
    }
    const userData = {
        email: req.body.email,
        password: req.body.password,
    };

    User.findByCredentials(userData.email, userData.password) // Checks the username and password of user
        .then((user) => {
            return user.generateAuthToken().then((token) => {
                // res.header("x-auth", token).status(200).send(user);
                res.status(200).send({ user: user, token: token });
            });
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});

router.post("/registercompanyadmin", authenticateCompanyadmin, (req, res) => {

    var newuser = new User(); // create a new instance of the User model
    newuser.username = req.body.username;
    newuser.email = req.body.email;
    newuser.mobileNumber = req.body.mobileNumber;
    newuser.dateOfBirth = req.body.dateOfBirth;
    newuser.firstname = req.body.firstname;
    newuser.lastname = req.body.lastname;
    newuser.password = req.body.password;

    newuser.rating = req.body.rating;
    newuser.numberOfRatings = req.body.numberOfRatings;
    newuser.imageURL = req.body.imageURL;
    newuser.nationalID = req.body.nationalID;
    newuser.employeeLevel = req.body.employeeLevel;
    newuser.createdBy = req.user._id;
    newuser.company = req.user.company;
    newuser.save().then(user => res.status(200).send(user))
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})

router.post("/registerCompanyAdmin", authenticateadmin, (req, res) => {

    var newuser = new User(); // create a new instance of the User model
    newuser.username = req.body.username;
    newuser.email = req.body.email;
    newuser.mobileNumber = req.body.mobileNumber;
    newuser.dateOfBirth = req.body.dateOfBirth;
    newuser.firstname = req.body.firstname;
    newuser.lastname = req.body.lastname;
    newuser.password = req.body.password;

    newuser.rating = req.body.rating;
    newuser.numberOfRatings = req.body.numberOfRatings;
    newuser.imageURL = req.body.imageURL;
    newuser.nationalID = req.body.nationalID;
    newuser.employeeLevel = "CompanyAdmin";
    newuser.createdBy = req.user._id;
    newuser.company = req.body.company;
    newuser.save().then(user => res.status(200).send(user))
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})

router.post("/registerEmployeetest", (req, res) => {

    var newuser = new User(); // create a new instance of the User model
    newuser.username = req.body.username;
    newuser.email = req.body.email;
    newuser.mobileNumber = req.body.mobileNumber;
    newuser.dateOfBirth = req.body.dateOfBirth;
    newuser.firstname = req.body.firstname;
    newuser.lastname = req.body.lastname;
    newuser.password = req.body.password;

    newuser.rating = req.body.rating;
    newuser.numberOfRatings = req.body.numberOfRatings;
    newuser.imageURL = req.body.imageURL;
    newuser.nationalID = req.body.nationalID;
    newuser.employeeLevel = "Employee";
    // newuser.createdBy = req.user._id;
    newuser.company = req.body.company;
    newuser.save().then(user => res.status(200).send(user))
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})

router.post("/registerEmployeeByCompanyAdmin", authenticateCompanyadmin, (req, res) => {

    var newuser = new User(); // create a new instance of the User model
    newuser.username = req.body.username;
    newuser.email = req.body.email;
    newuser.mobileNumber = req.body.mobileNumber;
    newuser.dateOfBirth = req.body.dateOfBirth;
    newuser.firstname = req.body.firstname;
    newuser.lastname = req.body.lastname;
    newuser.password = req.body.password;

    newuser.rating = req.body.rating;
    newuser.numberOfRatings = req.body.numberOfRatings;
    newuser.imageURL = req.body.imageURL;
    newuser.nationalID = req.body.nationalID;
    newuser.employeeLevel = "Employee";
    newuser.createdBy = req.user._id;
    newuser.company = req.body.company;
    newuser.save().then(user => res.status(200).send(user))
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})

router.post("/registerEmployeetest", (req, res) => {

    var newuser = new User(); // create a new instance of the User model
    newuser.username = req.body.username;
    newuser.email = req.body.email;
    newuser.mobileNumber = req.body.mobileNumber;
    newuser.dateOfBirth = req.body.dateOfBirth;
    newuser.firstname = req.body.firstname;
    newuser.lastname = req.body.lastname;
    newuser.password = req.body.password;
    newuser.rating = req.body.rating;
    newuser.numberOfRatings = req.body.numberOfRatings;
    newuser.imageURL = req.body.imageURL;
    newuser.nationalID = req.body.nationalID;
    newuser.employeeLevel = req.body.params;
    // newuser.createdBy = req.user._id;
    newuser.company = req.body.company;
    newuser.save().then(user => res.status(200).send(user))
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})

router.post("/registerEmployeeByAdmin", authenticateadmin, (req, res) => {

    var newuser = new User(); // create a new instance of the User model
    newuser.username = req.body.username;
    newuser.email = req.body.email;
    newuser.mobileNumber = req.body.mobileNumber;
    newuser.dateOfBirth = req.body.dateOfBirth;
    newuser.firstname = req.body.firstname;
    newuser.lastname = req.body.lastname;
    newuser.password = req.body.password;
    newuser.rating = req.body.rating;
    newuser.numberOfRatings = req.body.numberOfRatings;
    newuser.imageURL = req.body.imageURL;
    newuser.nationalID = req.body.nationalID;
    newuser.employeeLevel = "Employee";
    newuser.createdBy = req.user._id;
    newuser.company = req.body.company;
    newuser.save().then(user => res.status(200).send(user))
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})

router.post("/registerManagerByAdmin", authenticateadmin, (req, res) => {

    var newuser = new User(); // create a new instance of the User model
    newuser.username = req.body.username;
    newuser.email = req.body.email;
    newuser.mobileNumber = req.body.mobileNumber;
    newuser.dateOfBirth = req.body.dateOfBirth;
    newuser.firstname = req.body.firstname;
    newuser.lastname = req.body.lastname;
    newuser.password = req.body.password;
    newuser.rating = req.body.rating;
    newuser.numberOfRatings = req.body.numberOfRatings;
    newuser.imageURL = req.body.imageURL;
    newuser.nationalID = req.body.nationalID;
    newuser.employeeLevel = "Employee";
    newuser.createdBy = req.user._id;
    newuser.company = req.body.company;
    newuser.save().then(user => res.status(200).send(user))
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})
router.post("/registerManagerByAdmin", authenticateadmin, (req, res) => {

    var newuser = new User(); // create a new instance of the User model
    newuser.username = req.body.username;
    newuser.email = req.body.email;
    newuser.mobileNumber = req.body.mobileNumber;
    newuser.dateOfBirth = req.body.dateOfBirth;
    newuser.firstname = req.body.firstname;
    newuser.lastname = req.body.lastname;
    newuser.password = req.body.password;

    newuser.rating = req.body.rating;
    newuser.numberOfRatings = req.body.numberOfRatings;
    newuser.imageURL = req.body.imageURL;
    newuser.nationalID = req.body.nationalID;
    newuser.employeeLevel = "Employee";
    newuser.createdBy = req.user._id;
    newuser.company = req.body.company;
    newuser.save().then(user => res.status(200).send(user))
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})


router.post("/logout", authenticateuser, (req, res) => {
    req.user.removeToken(req.token).then(logoutres => res.status(200).send({ msg: "User logged out successfully" })).catch((err) => {
        res.status(400).send({
            err: err.message ? err.message : err,
        });
    });
})

router.get('/allusers', function(req, res) {
    User.find(function(err, User) {
        if (err)
            res.send(err);
        res.json(User);
    });
})

router.get('/info', authenticateuser, (req, res) => {
    console.log("IN INFO")
    res.status(200).send(req.user)
})

router.get('/viewuser/:user_id', (req, res) => {
    User.findById(req.params.user_id).then(user => {
            if (!user) {
                throw { err: "No user with this id" }
            }
            res.status(200).send(user);

        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });;
})

router.patch('/updateuserinfo', authenticateCompanyadmin, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: true }).then(updateduser => res.status(200).send({ user: updateduser }))
})
router.patch('/updatemyinfo/:user_id', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.user_id }, { $set: req.body }, { new: true }).then(updateduser => res.status(200).send({ user: updateduser }))
})


router.patch('/addtocart', authenticateuser, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { $push: { cart: { product: req.body.productid, quantity: req.body.quantity } } }, { new: true }).then(updatedcart => res.status(200).send({ cart: updatedcart }))
})
router.patch('/addexistingtocart', authenticateuser, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id, "cart.product": req.body.productid }, { $inc: { "cart.$.quantity": req.body.quantity } }, { new: true }).then(updatedcart => res.status(200).send({ user: updatedcart }))
})


router.patch('/removefromcart/:product_id', authenticateuser, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { $pull: { cart: { _id: req.params.product_id } } }, { new: true }).then(updatedcart => res.status(200).send({ user: updatedcart }))
})
router.patch('/clearcart', authenticateuser, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { $set: { cart: [] } }, { new: true }).then(updatedcart => res.status(200).send({ user: updatedcart }))

})
router.patch('/rateuser/:user_id', authenticateuser, (req, res) => {
    User.findOneAndUpdate({ _id: req.params.user_id }, { $inc: { rating: req.body.rating, numberOfRatings: 1 } }, { new: true }).then(updateduser => res.status(200).send({ updateduser: updateduser }))

})
router.patch('setemployeewallet/:employee_id', authenticatemanager, (req, res) => {
    User.findOneAndUpdate({ _id: req.params.employee_id, createdBy: req.user._id }, { $inc: { wallet: req.body.wallet } }, { new: true }).then(updateduser => res.status(200).send({ updateduser: updateduser }))
})

router.patch('setemployeelimit/:employee_id', authenticatemanager, (req, res) => {
    User.findOneAndUpdate({ _id: req.params.employee_id, createdBy: req.user._id }, { $set: { limit: req.body.limit } }, { new: true }).then(updateduser => res.status(200).send({ updateduser: updateduser }))
})

router.patch('blockemployee/:employee_id', authenticateadmin, (req, res) => {
    User.findOneAndUpdate({ _id: req.params.employee_id }, { $set: { blocked: true } }, { new: true }).then(updateduser => res.status(200).send({ updateduser: updateduser }))
})
router.patch('unblockemployee/:employee_id', authenticateadmin, (req, res) => {
    User.findOneAndUpdate({ _id: req.params.employee_id }, { $set: { blocked: false } }, { new: true }).then(updateduser => res.status(200).send({ updateduser: updateduser }))
})


//Logout done 
//Register done
//login done
//View my Info done
//Edit my Info done 
//View Products and sort or filter them according to price or location done
//Add to cart  done 
//View Supplier Info done tested
//View Order info and status done tested
//Rate supplier done tested
//Manager sets employee wallet money done not tested
//Manager sets limit for each employee done not tested

//Send order to supplier done not tested
//Cancel Order if possible done not tested



//Does the manager create the employee account or the Company Admin?








export const userController = router;