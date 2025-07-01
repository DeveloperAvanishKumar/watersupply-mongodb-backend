let express = require('express');
const { mUserInformationInsert, mUserList, userDelete, updateUser, mUserLogin, mUserResetPassword, mUserOTPVierification } = require('../../controllers/mobile/userInfromationController');
let userRoutes = express.Router();


userRoutes.post('/user-information-insert', mUserInformationInsert);
userRoutes.post('/user-information-otp-verification', mUserOTPVierification);
userRoutes.get('/user-information-list', mUserList);
userRoutes.delete('/user-information-delete/:id', userDelete);
userRoutes.put('/user-information-update/:id', updateUser);
userRoutes.post('/user-information-login', mUserLogin)
userRoutes.post('/user-information-reset-password', mUserResetPassword)






module.exports = userRoutes;