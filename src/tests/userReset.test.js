/* eslint-disable no-undef */
const supertest = require("supertest");
const app = require("../routers/index");
describe("users register & login Endpoint",() => { 

it("should verify the profile",  () => {
    supertest(app)
    .post("/api/users/profile/reset")
    .field("email" , "wizmgbrown@gmail.com")
    .expect(response => {
      expect(response.status).toBe(202);
      done();
    });
});

it("should verify the profile",  () => {
  supertest(app)
  .post("/api/users/reset/code")
  .field("password" , "newPassword")
  .expect(response => {
    expect(response.status).toBe(202);
    done();
  });
});

});