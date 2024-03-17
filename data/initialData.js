const initialDataRoles = (Role) => {
  Role.create({
    id: 1,
    name: "user",
  });
  Role.create({
    id: 2,
    name: "morderator",
  });
  Role.create({
    id: 3,
    name: "admin",
  });
};

module.exports = initialDataRoles;
