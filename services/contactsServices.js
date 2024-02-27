
// import fs from "fs/promises";
// import path from "node:path";
// import { nanoid } from "nanoid";

// const contactsPath = path.join("db", "contacts.json");

// export async function listContacts() {
//   // ...твій код. Повертає масив контактів.
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// }

// export async function getContactById(contactId) {
//   // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
//   const contacts = await listContacts();
//   const result = contacts.findIndex((item) => item.id === contactId);
//   return contacts[result] || null;
// }

// export async function removeContact(contactId) {
//   // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// }

// export async function addContact(name, email, phone) {
//   // ...твій код. Повертає об'єкт доданого контакту (з id).
//   const contacts = await listContacts();

//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };

//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// }

// export async function updateById(id, body) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }

//   contacts[index] = { ...contacts[index], ...body };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// }

// export async function updateFavorite(id, body) {
    
// }

