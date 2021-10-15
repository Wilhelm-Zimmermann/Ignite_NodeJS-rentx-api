import request from "supertest";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm/database"

let connection: Connection

describe("Create category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        const id = uuidv4()

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

    it("should be able to create a new category", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({
                email: "kirayoshikage@rentx.com",
                password: "admin"
            })

        const { refresh_token } = responseToken.body;
        const response = await request(app)
            .post("/categories")
            .set({Authorization: `Bearer ${refresh_token}`})
            .send({
                name: "SUPER TEST",
                description: "This is a massive test"
            });

        expect(response.status).toBe(201);
    });

    it("should be not able to create a new category with the same name", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({
                email: "kirayoshikage@rentx.com",
                password: "admin"
            })

        const { refresh_token } = responseToken.body;
        const response = await request(app)
            .post("/categories")
            .set({Authorization: `Bearer ${refresh_token}`})
            .send({
                name: "SUPER TEST",
                description: "This is a massive test"
            });

        expect(response.status).toBe(400);
    });
})