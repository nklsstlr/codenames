const users = [];

const addUser = ({ id, name }) => {
  console.log("ID: "+id+"und name: "+ name)
  name = name.trim().toLowerCase();

  const existingUser = users.find((user) => user.name === name);

  if(!name) return { error: 'Username is required.' };
  

  const user = { id, name};
  if(existingUser) {
    console.warn("second login")
    return { user };
  }

  users.push(user);
  
  return { user };
}

const removeUser = (id) => {
  var uu = users.find((user)=>user.id===id);
  console.log("remove User is called : "+ JSON.stringify(uu))

  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsers = () => {
  users.map(u => console.log("mapped user : "+u));
  return users;
}

const userExist = (name) => {
  var user = users.find((user)=>user.name===name);
  if(user){
    return "tu";
  }
  else{
    return "fa";
  }};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getUsers,userExist };