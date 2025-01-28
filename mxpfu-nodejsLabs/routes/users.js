const express = require('express');
const router = express.Router();

router.get("/test", (req, res) => {
    console.log("Test route hit!");
    res.send("Test route working!");
});

let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(JSON.stringify({users}, null, 4));
});

router.get("/lastName/:lastName", (req, res) => {
    console.log("lastName route hit!");
    console.log("Params:", req.params);
    const lastName = req.params.lastName;
    let filtered_lastname = users.filter((user) => user.lastName === lastName);
    console.log("Filtered users:", filtered_lastname);
    res.send(filtered_lastname);
})

const dateSplit = (strDate) => {
    let [dd, mm, yyyy] = strDate.split("-");
    return new Date(yyyy + "/" + mm + "/" + dd);
}

router.get("/sort", (req, res) => {
    let sorted_users = users.sort(function(a, b) {
        let d1 = dateSplit(a.DOB);
        let d2 = dateSplit(b.DOB);
        return d1 - d2;
    });
    // Send the sorted_users array as the response to the client
    res.send(sorted_users);
})

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  res.send(filtered_users)//This line is to be replaced with actual return value
});

// POST request: Create a new user
router.post("/",(req,res)=>{
users.push({
    "firstName":req.query.firstName,
    "lastName":req.query.lastName,
    "email":req.query.email,
    "DOB":req.query.DOB
});
res.send(`User ${req.query.firstName} has been added!`)
});


router.put("/:email", (req, res) => {
    // Extract email parameter and find users with matching email
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    
    if (filtered_users.length > 0) {
        // Select the first matching user and update attributes if provided
        let filtered_user = filtered_users[0];
        
         // Extract and update DOB if provided
        
        let DOB = req.query.DOB;    
        if (DOB) {
            filtered_user.DOB = DOB;
        }
        
        /*
        Include similar code here for updating other attributes as needed
        */
        
        // Replace old user entry with updated user
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        
        // Send success message indicating the user has been updated
        res.send(`User with the email ${email} updated.`);
    } else {
        // Send error message if no user found
        res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with the email ${email} deleted.`);
});

module.exports=router;
