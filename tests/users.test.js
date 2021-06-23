/* eslint-disable no-undef */
const supertest = require("supertest");
const app = require("../routers/index");
require("mysql2/node_modules/iconv-lite").encodingExists("foo");
describe("users register & login Endpoint",() => { 
    it("should signup",  () => {

       supertest(app)
       .post("/api/users/register")
       .field("email", "wizmg@gmail.com")
       .field("password" , "password")
       .field("username" , "smiledev")
       .field("firstName" , "Monzer")
       .field("lastName" , "Omer")
       .field("birthDate" , "2000-10-26")
       .attach("image", "../public/images/image-1621410473913.jpg")
       .expect(response => {
         expect(response.status).toBe(201);
         done();
       });
     });

it("should login",() => {

  supertest(app)
  .get("/api/users/login")
  .field("email", "wizmg@gmail.com")
  .field("password" , "password")
  .field("username" , "monzersmiledev")
  .expect(response => {
    expect(response.status).toBe(202);
    done();
  });
});
});