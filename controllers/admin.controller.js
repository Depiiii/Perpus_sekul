// untuk memanggil model untuk tabel “admin”
const adminModel = require(`../models/index`).admin

// melakukan operasi dari sequelize
const Op = require(`sequelize`).Op

// buat password
const md5 = require(`md5`) 


// membuat fungsi untuk membaca semua data agar bisa di akses di file lain
exports.getAlladmin = async (request, response) => {

    //mengambil data dengan(find all) untuk mendapatkan semmua data "admins"
    let admins = await adminModel.findAll()
    return response.json({
        success: true, data: admins,
        message: `All admins have been loaded`
    })
}

// fungsi untuk meng filter data(pencarian data) 
exports.findadmin = async (request, response) => {


    // keyword adalah kata kunci yang digunakan untuk mencari
    let keyword = request.body.keyword

    /** call findAll() within where clause and operation
    * to find data based on keyword */
    let admins = await adminModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } },
                { username: { [Op.substring]: keyword } },
            ]
        }
    })
    return response.json({
        success: true, data: admins,
        message: `All admins have been loaded`
    })
}
/** create function for add new admin */
exports.addadmin = (request, response) => {
    /** prepare data from request */
    let newadmin = {
        name: request.body.name, 
        contact: request.body.contact,
        address: request.body.address, 
        username: request.body.username, 
        password: md5(request.body.password)
        
    }

    /** execute inserting data to admin's table */
    adminModel.create(newadmin)
        .then(result => {
            /** if insert's process success */
            return response.json({
                success: true, data: result,
                message: `New admin has been inserted`
            })
        })
        .catch(error => {
            /** if insert's process fail */
            return response.json({
                success: false, message: error.message
            })
        })
}
/** create function for update admin */
exports.updateadmin = (request, response) => {
    /** prepare data that has been changed */
    let dataadmin = {
        name:request.body.name, 
        contact:request.body.contact,
        address:request.body.address, 
        username:request.body.username,
        password:md5(request.body.password) 

    }

    /** define id admin that will be update */
    let idadmin = request.params.id

    /** execute update data based on defined id admin */
    adminModel.update(dataadmin, { where: { id: idadmin } })
        .then(result => {
            /** 
             * if update's process success */
            return response.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                 message: error.message
            })
        })
}
/** create function for delete data */
exports.deleteadmin = (request, response) => {
    /** define id admin that will be update */
    let idadmin = request.params.id

    /** execute delete data based on defined id admin */
    adminModel.destroy({ where: { id: idadmin } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}
