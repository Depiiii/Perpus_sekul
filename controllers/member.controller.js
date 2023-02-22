// untuk memanggil model untuk tabel “member”
const memberModel = require(`../models/index`).member

// melakukan operasi dari sequelize
const Op = require(`sequelize`).Op

/** load library 'path' and 'filestream' */
const path = require(`path`)
const fs = require(`fs`)
const upload = require(`./upload-foto`).single(`foto`)

// membuat fungsi untuk membaca semua data agar bisa di akses di file lain
exports.getAllMember = async (request, response) => {

    //mengambil data dengan(find all) untuk mendapatkan semmua data "members"
    let members = await memberModel.findAll()
    return response.json({
        success: true, data: members,
        message: `All Members have been loaded`
    })
}

// fungsi untuk meng filter data(pencarian data) 
exports.findMember = async (request, response) => {


    // keyword adalah kata kunci yang digunakan untuk mencari
    let keyword = request.body.keyword

    /** call findAll() within where clause and operation
    * to find data based on keyword */
    let members = await memberModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { gender: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true, data: members,
        message: `All Members have been loaded`
    })
}
/** create function for add new member */
exports.addMember = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }



        /** prepare data from request */
        let newMember = {
            name: request.body.name,
            address: request.body.address,
            gender: request.body.gender,
            contact: request.body.contact,
            foto: request.file.filename
        }

        /** execute inserting data to member's table */
        memberModel.create(newMember)
            .then(result => {
                /** if insert's process success */
                return response.json({
                    success: true, data: result,
                    message: `New member has been inserted`
                })
            })
            .catch(error => {
                /** if insert's process fail */
                return response.json({
                    success: false, message: error.message
                })
            })
    })
}
/** create function for update member */
exports.updateMember = (request, response) => {

upload(request, response, async error => {
/** check if there are error when upload */ 
if (error) {
return response.json({ message: error })
}

    /** define id member that will be update */
    let id = request.params.id

    /** prepare data that has been changed */
    let member = {
        name: request.body.name,
        address: request.body.address,
        gender: request.body.gender,
        contact: request.body.contact
//sudah selesai
    }
    if (request.file) {
        /** get selected book's data */
        const selectedmember = await memberModel.findOne({ where: { id: id } })
        
        const oldfotomember = selectedmember.foto

        const pathFoto = path.join(__dirname, `../foto`,oldfotomember)

        /** check file existence */
if (fs.existsSync(pathFoto)) {
    /** delete old Foto file */ 
    fs.unlink(pathFoto, error =>
    console.log(error))
    }

    /** add new Foto filename to book object */ 
    member.foto= request.file.filename
}

    /** execute update data based on defined id member */
    memberModel.update(member, { where: { id: id } })
        .then(result => {
            /** 
             * if update's process success */
            return response.json({
                success: true,
                message: `Data member has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false, message: error.message
            })
        })
    })
}
/** create function for delete data */
exports.deleteMember =async (request, response) => {

    /** define id member that will be update */
    let id = request.params.id

    /** get old filename of Foto file */
    const member = await memberModel.findOne({ where: { id: id } }) 
    const oldfotomember = member.foto
    const pathFoto = path.join(__dirname, `../foto`,oldfotomember)
    if (fs.existsSync(pathFoto)) {
        /** delete old Foto file */ 
        fs.unlink(pathFoto, error => console.log(error))
        }
       else{
        console.log("not existing foto")
       } 

    /** execute delete data based on defined id member */
    memberModel.destroy({ where: { id: id } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data member has been deleted`
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
