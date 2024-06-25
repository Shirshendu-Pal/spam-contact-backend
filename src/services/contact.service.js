const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const fs = require("fs");
const {User , Contact} = require("../models");

const addContact = async (reqBody) =>{
    const contact = await Contact.create(reqBody)
    return contact;
}

const getContacts = async (reqBody) =>{
    let contact = await Contact.findOne({phone: reqBody.phone})
    if(!contact){
         contact = await Contact.findOne({phone: reqBody.phone})
        if(!contact){
            contact = await Contact.findAll({phone: reqBody.phone})
        }
        
    }
    return contact;
}

const addContactToSpam = async ({phone , userId}) =>{
    let contact = await Contact.findOne({phone})
    if(contact){
        contact.isSpam = true
        contact.spamCount = contact.spamCount + 1;
        await contact.save();
    }else{
        contact = await Contact.create({
            phone,
            isSpam: true,
            spamCount: 1,
            addedBy: userId,
            name: "spam"
        })
    }

    return contact;
}


module.exports = {
    addContact,
    getContacts,
    addContactToSpam
}