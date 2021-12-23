/* eslint-disable no-undef */
const supertest = require("supertest");
const app = require("../routers/index");
describe("users register & login Endpoint",() => { 
    it("should update the profile",  () => {
       supertest(app)
       .post("/api/users/profile/update")
       .set("Authorization", "Bearer " + "")
       .field("username" , "monzersmiledev")
       .field("first_name" , "Monzer")
       .field("last_name" , "Omer")
       .field("birth_date" , 0)
       .expect(response => {
         expect(response.status).toBe(401);
         done();
       });
     });

it("should update the username",() => {

  supertest(app)
  .post("/api/users/profile/update/username")
  .set("Authorization", "Bearer " + "")
  .field("email", "wizmg@gmail.com")
  .field("password" , "password")
  .field("username" , "monzersmiledev")
  .expect(response => {
    expect(response.status).toBe(401);
    done();
  });
});

it("should update the email",  () => {
    supertest(app)
    .post("/api/users/profile/email")
    .set("Authorization", "Bearer " + "")
    .field("email" , "nezonru87@yahoo.com")
    .expect(response => {
      expect(response.status).toBe(202);
      done();
    });
  });

it("should update the email",  () => {
  supertest(app)
  .post("/api/users/profile/password")
  .set("Authorization", "Bearer " + "")
  .field("password" , "newPassword")
  .expect(response => {
  expect(response.status).toBe(202);
    done();
  });
});

it("should update the profile profile picture",  () => {
  supertest(app)
  .post("/api/users/profile/update/profilePicture")
  .set("Authorization", "Bearer " + "")
  .attach("image", "../public/images/image-1621410473913.jpg")
  .expect(response => {
    expect(response.status).toBe(202);
    done();
  });
});

});