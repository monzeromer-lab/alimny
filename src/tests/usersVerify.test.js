/* eslint-disable no-undef */
const supertest = require("supertest");
const app = require("../routers/index");
describe("users register & login Endpoint",() => { 

it("should verify the profile",  () => {
    supertest(app)
    .post("/api/users/verify")
    .field("verificationCode" , "")
    .expect(response => {
      expect(response.status).toBe(202);
      done();
    });
  });
});