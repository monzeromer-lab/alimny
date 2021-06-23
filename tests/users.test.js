/* eslint-disable no-undef */
const supertest = require("supertest");
const app = require("../routers/index");
describe("users register & login Endpoint",() => { 
    it("should signup",  () => {

       supertest(app)
       .post("/api/users/register")
       .field("email", "wizmg@gmail.com")
       .field("password" , "password")
       .field("username" , "monzersmiledev")
       .field("first_name" , "Monzer")
       .field("last_name" , "Omer")
       .field("birth_date" , 0)
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