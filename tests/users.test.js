const supertest = require('supertest')
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

it('should update',() => {

  supertest(app)
  .post("/api/users/admin/update")
  .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0NSwiZmlyc3ROYW1lIjoiTW9uemVyIiwibGFzdE5hbWUiOiJPbWVyIiwiUHJvZmxlIjoicHVibGljXFxpbWFnZXNcXGltYWdlLTE2MjE2MTY5MzQ0MTguanBnIiwiYmlydGhEYXRlIjoxMSwidXNlcm5hbWUiOiJtb256ZXJzbWlsZWRldiIsInJvbGUiOjEsImVtYWlsIjoibmV6b25ydTg3QHlhaG9vLmNvbSJ9LCJpYXQiOjE2MjE2MTcxODEsImV4cCI6MTYyNDI5NTU4MX0.FHKMzCzTdmwyUlMnrnXlc6umnv_tAAQCmjzigYl45nI')
  .field("email", "wizmg@gmail.com")
  .field("password" , "password")
  .field("username" , "monzersmiledev")
  .field("first_name" , "Ali")
  .field("last_name" , "Omer")
  .field("birth_date" , 0)
  .field("profileId" , 43)
  .attach("image", "../public/images/image-1621410473913.jpg")
  .expect(response => {
    expect(response.status).toBe(201)
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
