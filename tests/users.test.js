const supertest = require('supertest')
const request = require('supertest')
const app = require('../api/index')

describe('admin login Endpoint',() => { 
    it('should signup',  () => {

       supertest(app)
       .post("/api/users/admin/signup")
       .field("email", "wizmg@gmail.com")
       .field("password" , "password")
       .field("username" , "monzersmiledev")
       .field("first_name" , "Monzer")
       .field("last_name" , "Omer")
       .field("birth_date" , 0)
       .attach("image", "../public/images/image-1621410473913.jpg")
       .expect(response => {
         expect(response.status).toBe(201)
         done()
       })
     })

it('should login',() => {

  supertest(app)
  .post("/api/users/admin/signup")
  .field("email", "wizmg@gmail.com")
  .field("password" , "password")
  .field("username" , "monzersmiledev")
  .field("first_name" , "Monzer")
  .field("last_name" , "Omer")
  .field("birth_date" , 0)
  .attach("image", "../public/images/image-1621410473913.jpg")
  .expect(response => {
    expect(response.status).toBe(202)
    done()
  })
})
})

describe('students Endpoint', () => { 
  it('should signup',  () => {
      supertest(app)
     .post("/api/users/students/signup")
     .field("email", "wizmgbrown@gmail.com")
     .field("password" , "password")
     .field("username" , "monzersmiledev")
     .field("first_name" , "Monzer")
     .field("last_name" , "Omer")
     .field("sex" , "male")
     .field("birth_date" , 0)
     .attach("image", "../public/images/image-1621410473913.jpg")
     .expect(response => {
       expect(response.status).toBe(201)
       done()
     })
   })

it('should login',  () => {
 supertest(app)
.post("/api/users/students/signup")
.field("email", "wizmgbrown@gmail.com")
.field("password" , "password")
.field("username" , "monzersmiledev")
.field("first_name" , "Monzer")
.field("last_name" , "Omer")
.field("birth_date" , 0)
.field("sex" , "male")
.attach("image", "../public/images/image-1621410473913.jpg")
.expect(response => {
  expect(response.status).toBe(202)
  done()
})
})
})

describe('teachers Endpoint', () => { 
  it('should signup',  () => {
      supertest(app)
     .post("/api/users/teachers/signup")
     .field("email", "wizmgbrown@gmail.com")
     .field("password" , "password")
     .field("username" , "monzersmiledev")
     .field("first_name" , "Monzer")
     .field("last_name" , "Omer")
     .field("sex" , "male")
     .field("birth_date" , 0)
     .attach("image", "../public/images/image-1621410473913.jpg")
     .expect(response => {
       expect(response.status).toBe(201)
       done()
     })
   })

it('should login',  () => {
 supertest(app)
.post("/api/users/teachers/signup")
.field("email", "wizmgbrown@gmail.com")
.field("password" , "password")
.field("username" , "monzersmiledev")
.field("first_name" , "Monzer")
.field("last_name" , "Omer")
.field("birth_date" , 0)
.field("sex" , "male")
.attach("image", "../public/images/image-1621410473913.jpg")
.expect(response => {
  expect(response.status).toBe(202)
  done()
})
})
})
