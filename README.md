# customer-radar-web-ng
## Web application for customer-radar demo by Angular11

### Methods:
- Add user
- List users
- Search user by phone
- Remove user
- Edit user

### Get Start:
- 1. Edit environment.prod.ts
     - change uri to production environment
      ```javascript
      export const environment = {
        production: true,

        searchUserUrl: 'http://localhost:4200/api/user/phone',
        addUserUrl: 'http://localhost:4200/api/user/add',
        delUserUrl: 'http://localhost:4200/api/user/del',
        updateUrl: 'http://localhost:4200/api/user/update',
        getUsersUrl: 'http://localhost:8080/api/user/all'
      };
      ```
- 2. Build project
     - run command: ng build --prod
     
 
