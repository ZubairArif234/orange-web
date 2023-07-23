const express = require('express');
const userSignupModel = require('../../all_schema/userSignup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    let data = req.body
    const user = await userSignupModel.findOne({ email: data.email });

    if (user) {
        console.log(user);
        try {
            const match = bcrypt.compareSync(data.password, user.password);
            // Rest of the code here
            if (match) {
                console.log('match hua');
                // const token = jwt.sign({
                //     email: user.email,
                //     full_name: `${user.first_name} ${user.last_name}`
                // }, 'zubairjwt',
                //     (err, token) => {
                //         console.log(token);
                //     },
                // )
                const token = jwt.sign({
                    email: user.email,
                    full_name: `${user.first_name} ${user.last_name}`
                }, 'zubairjwt');
                console.log(token, 'token');

            } else {
                return res.status(403).send({ status: 403, message: 'eamil / password may be incorrect' });
                // console.log('');
            }
        } catch (error) {
            console.error('Error comparing passwords:', error);
            // Handle the error or send an error response
        }

        return res.status(200).send({ status: 200, message: 'user login', data: user });
    } else {
        return res.status(404).send({ status: 404, message: 'user not found', data: user });

    }


}
module.exports = login