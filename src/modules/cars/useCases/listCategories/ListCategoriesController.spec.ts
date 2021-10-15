import request from "supertest";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm/database"

let connection: Connection

describe("list category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        const id = uuidv4();

        const password = await hash("admin", 8);
        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
        VALUES('${id}','Yoshikage','kirayoshikage@rentx.com','${password}',true,'xxx',now()) `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("should be able to list all categories", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({
                email: "kirayoshikage@rentx.com",
                password: "admin"
            });

        const { refresh_token } = responseToken.body;
            await request(app)
            .post("/categories")
            .set({Authorization: `Bearer ${refresh_token}`})
            .send({
                name: "SUPER TESTs",
                description: "This iss a massive test"
            });

        const response = await request(app).get("/categories");
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty("id");
    });
})