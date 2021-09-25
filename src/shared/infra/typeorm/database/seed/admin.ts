import { ConnectionNotFoundError, getConnection } from "typeorm"
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import createConnection from "../";

async function create() {
    const connection = await createConnection("localhost");
    const id = uuidv4()
    
    const password = await hash("admin", 8);
    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
        VALUES('${id}','Yoshikage','kirayoshikage@rentx.com','${password}',true,'xxx',now()) `
    );
    await connection.close();
}

create().then(() => console.log("ADM CREATED"));