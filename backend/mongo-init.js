// eslint-disable-next-line no-undef
db.createUser(
  {
    user: 'root',
    pwd: 'rootPass',
    roles: [
      {
        role: 'readWrite',
        db: 'illustry'
      }
    ]
  }
);
