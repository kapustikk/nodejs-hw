import fs from 'fs/promises';
import path from 'path';
import dirname from './lib/dirname.js';
import shortid from 'shortid';


const { __dirname } = dirname(import.meta.url);
const contactsPath = path.join(__dirname, './db/contacts.json');

export async function listContacts() {
    try {
        const list = await fs.readFile(contactsPath, 'utf8', (err, data) => {
            if (err) 
                throw err;
                return data;
        });
        console.log('Contact list: ');
        console.table(JSON.parse(list));
        return JSON.parse(list);
    } catch (error) {
console.log('Error: ', error.message);
    }
}

export async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contactToFind = contacts.find(contact => contact.id === contactId);
    
        console.log(`Contact with id ${contactId} was found`);
        console.table(contactToFind);
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

export async function removeContact(contactId) {
   try {
    const contacts = await listContacts();
    const updateContactsList = contacts.filter(contact => contact.id !== contactId);

    console.log(`The contact ${contactId} was removed from your contact list`);
    console.table(updateContactsList);
   } catch (error) {
       console.log('Error: ', error.message);
   }
}

export async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const id = shortid();
        const updateContactsList = [
            ...contacts, {
                id,
                name,
                email,
                phone,
            }
        ];
    
        console.log(`New contact ${name} was added`);
        console.table(updateContactsList);
    } catch (error) {
        console.log('Error: ', error.message);
    }
}
