// const mysql = require('mysql2')
// const express = require('express')
// const cors = require("cors")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const nodemailer = require('nodemailer')
// const crypto = require('crypto')
// require('dotenv').config()
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');

// const multer = require('multer');
// const BackblazeB2 = require('backblaze-b2');



// const app = express()
// app.use(express.json())

// app.use(cors({
//   origin: 'http://localhost:3000', // Your React app URL
//   credentials: true, // Allow credentials (cookies, etc.)
// }));

// app.use(
//   session({
//     secret: '06/9/2024',
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());


// // Connection pool to the database
// const pool = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// }).promise();

// // Testing the connection and start the server
// pool.getConnection()
//   .then((connection) => {
//     connection.release();
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Error connecting to MySQL:', err.message);
//   });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: 'http://localhost:8000/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const { id, emails } = profile;
//         const { givenName } = profile.name
//         const gmail = emails[0].value;

//         // Check if the user already exists
//         const [rows] = await pool.query('SELECT * FROM users WHERE gmail = ?', [gmail]);

//         if (rows.length === 0) {
//           // Insert new user into the database
//           await pool.query(
//             'INSERT INTO users (gmail, name, google_sub, signup_method) VALUES (?, ?, ?,?)',
//             [gmail, givenName, id, 'google']
//           );
//         }
//         done(null, profile);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// app.get('/auth/google', passport.authenticate('google', {
//   scope: ['profile', 'email'], // Adjust scopes as needed
// }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Generate the JWT token here
//     const token = jwt.sign({ email: req.user.emails[0].value}, "thepass");
//     res.redirect(`http://localhost:3000/?token=${token}`);
//   }
// );

// app.get('/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json({ error: 'Logout failed' });
//     }
//     //res.redirect('/login');
//     res.status(200).json({ error: "Logout success" })
//   });
// });

// // to -------

// const b2 = new BackblazeB2({
//   applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
//   applicationKey: process.env.B2_APPLICATION_KEY,
// });
// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: 'uploads/', // Temporary storage
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({ storage });


// // Upload image to Backblaze B2 and store URL in MySQL
// async function uploadToB2(filename, filepath) {
//   await b2.authorize();
//   const { data } = await b2.getUploadUrl({ bucketId: process.env.B2_BUCKET_ID });

//   const fileData = require('fs').readFileSync(filepath);
//   const uploadResponse = await b2.uploadFile({
//     uploadUrl: data.uploadUrl,
//     uploadAuthToken: data.authorizationToken,
//     fileName: filename,
//     data: fileData,
//   });

//   return `${process.env.B2_BUCKET_URL}/${filename}`;
// }

// // Route to upload image and store URL in MySQL
// app.post('/uploadimage', upload.single('image'), async (req, res) => {
//   const { filename, path: filepath } = req.file;

//   try {
//     const imageUrl = await uploadToB2(filename, filepath);

//     // Save the image URL in the database
//     await pool.query('INSERT INTO images (filename, url) VALUES (?, ?)', [
//       filename,
//       imageUrl,
//     ]);
//     console.log(imageUrl)

//     res.status(200).json({ message: 'Image uploaded successfully', url: imageUrl });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ error: 'Image upload failed' });
//   }
// });

//no chnage 

const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FroentendURL, // Your React app URL
  credentials: true, // Allow credentials (cookies, etc.)
}));

app.use(
  session({
    secret: '06/9/2024',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connection pool to the database
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// Testing the connection and starting the server
pool.getConnection()
  .then((connection) => {
    connection.release();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err.message);
  });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, emails } = profile;
        const { givenName } = profile.name;
        const gmail = emails[0].value;

        // Check if the user already exists
        const [rows] = await pool.query('SELECT * FROM users WHERE gmail = ?', [gmail]);

        if (rows.length === 0) {
          // Insert new user into the database
          await pool.query(
            'INSERT INTO users (gmail, name, google_sub, signup_method) VALUES (?, ?, ?, ?)',
            [gmail, givenName, id, 'google']
          );
        }
        done(null, profile);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'], // Adjust scopes as needed
}));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate the JWT token here
    const token = jwt.sign({ email: req.user.emails[0].value }, 'thepass');
    const url=process.env.FroentendURL
    res.redirect(`${url}/?token=${token}`);
  }
);

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.status(200).json({ error: 'Logout success' });
  });
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/', // Temporary storage
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Upload image to Cloudinary and store URL in MySQL
async function uploadToCloudinary(filepath) {
  const result = await cloudinary.uploader.upload(filepath, {
    folder: 'images', // Optional: specify folder in Cloudinary
  });
  return result.secure_url;
}

// Route to upload image and store URL in MySQL
app.post('/uploadimage', upload.single('image'), async (req, res) => {
  const { path: filepath } = req.file;
  const { type, rollNo, subCode, subName, ExamDate } = req.body;

  try {
    // Check if the subject with the same subCode and ExamDate already exists
    const [rows] = await pool.query(
      `SELECT * FROM subject WHERE sub_code = ? AND Exam_date = ?`,
      [subCode, ExamDate]
    );

    if (rows.length > 0) {
      // If a row already exists, skip the upload
      return res.status(409).json({
        message: 'Record with the same subCode and ExamDate already exists, skipping upload',
      });
    }

    // Upload the image to Cloudinary
    const imageUrl = await uploadToCloudinary(filepath);

    // Insert the new record with the uploaded image URL
    await pool.query(
      'INSERT INTO subject (sub_code, sub_name, upload_by, img, Exam_date, Type) VALUES (?, ?, ?, ?, ?, ?)',
      [subCode, subName, rollNo, imageUrl, ExamDate, type]
    );

    res.status(200).json({ message: 'Image uploaded successfully', url: imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// no change 


let otpStore = {}; // In-memory store for OTPs 

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to send OTP
app.post('/send_otp', async (req, res) => {
  const { gmail } = req.body;

  // Generate a 4-digit OTP
  const otp = crypto.randomInt(1000, 9999);

  // Store OTP with an expiration time (5 minutes)
  otpStore[gmail] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };
  // Email message options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: gmail,
    subject: 'Your OTP for Email Verification at Model Paper ',
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('Error sending OTP:', err.message);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Route to verify OTP
app.post('/verify_otp', (req, res) => {
  const { gmail, otp } = req.body;

  const storedOtpInfo = otpStore[gmail];

  if (!storedOtpInfo) {
    return res.status(400).json({ error: 'OTP not found or expired' });
  }

  if (storedOtpInfo.otp === parseInt(otp) && Date.now() < storedOtpInfo.expiresAt) {
    delete otpStore[gmail]; // OTP is valid, remove from store
    res.status(200).json({ message: 'OTP verified successfully' });
    
  } else {
    res.status(400).json({ error: 'Invalid or expired OTP' });
  }
});


app.post("/signup", async (req, res) => {
  const { gmail, password, signup_method } = req.body
  try {
    const [rows] = await pool.query(`select * from users where gmail=? `, [gmail])

    if (rows.length == 0) {
      const hashpassword = await bcrypt.hash(password, 10)
      await pool.query(`insert into users(gmail,password,signup_method)values(?,?,?)`, [gmail, hashpassword, signup_method])
      res.status(200).json({ error: "Successfully created" });
    }
    else {
      res.status(400).json({ error: "User already exists (or) gmail already exists." });
    }

  }
  catch (err) {
    console.log(err.message)
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

app.put("/update_details", async (req, res) => {

  try {
    const {formData,gmail}=req.body
    const { name, branch, year, sem, rollno,regulation } = formData
    const [rows] = await pool.query(
      `UPDATE users SET name = ?, branch = ?, year = ?, sem = ?, rollno = ? regulation=? WHERE gmail = ?`,
      [name, branch, year, sem, rollno,regulation, gmail]
    )
    res.status(201).json({ error: "Successfully Updated" })
  }
  catch (err) {
    
    res.status(500).json({ error: err.message })
  }

})

app.post("/login", async (req, res) => {
  try {
    const { gmail, password } = req.body
    const [rows] = await pool.query(`select * from users where gmail=?`, [gmail])
    if (rows.length > 0) {
      const user = rows[0]
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        const token = jwt.sign(user.gmail, "thepass");
        res.status(200).json({ jwtToken: token })
      }
      else {
        res.status(400).json({ error: "password is incorrect" });
      }
    }
    else {
      res.status(400).json({ error: "Invalid user" });
    }

  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
})

const checkpoint = (req, res, next) => {
  let jwtToken
  const auth = req.headers['authorization']
  if (auth !== undefined) {
    jwtToken = auth.split(' ')[1]
  }
  if (jwtToken !== undefined) {
    jwt.verify(jwtToken, 'thepass', async (error, payload) => {
      if (error) {
        res.status(401)
        res.send('Invalid JWT Token')
      } else {
        req.loggedid = payload.loggedid
        next()
      }
    })
  } else {
    res.status(401)
    res.send('Invalid JWT Token')
  }


}

// Forgot password or change password 
app.post("/forgot_password", async (req, res) => {
  const { gmail, password, signup_method } = req.body
  try {
    const hashpassword = await bcrypt.hash(password, 10)
    const [rows] = await pool.query(
      `UPDATE users SET password = ?, WHERE gmail = ? and signup_method=?`,
      [hashpassword, gmail, signup_method])
    res.status(200).json({ error: "Password Changed" })
  }
  catch (err) {
    console.log(err.message)
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

//to get all details about a user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM users where id=?', [id]);
    res.json({ details: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.get("/getdetails/:gmail", async (req, res) => {
  try {
    const { gmail } = req.params
    const [rows] = await pool.query('SELECT * FROM users where gmail=?', [gmail]);
    res.json({ details: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


app.get("/myuploads/:rollno", async (req, res) => {
  try {
    const { rollno } = req.params
    const [rows] = await pool.query(`select * from subject where upload_by=?`, [rollno])
    res.status(200).json({ rows })

  }
  catch (err) {
    res.status(500).json({ error: "internal server error" })
  }
})

// -------Regualtion and branch table by year--------
// to get subjects by branch,year and regulation wise 
app.get("/branch",async (req, res) => {
  try {
    const { regulation, year, branch } = req.query
    const table = regulation + year
    const [rows] = await pool.query(`select * from ${table} where branch=?`, [branch])
    if (rows.length > 0) {
      res.status(200).json({ rows })
    }
    else {
      res.status(400).json({ error: "We couldnt find branch " })
    }

  }
  catch (err) {
    console.log(err.message)
    res.status(500).json({ error: "Internal server error" })
  }
})

//---------Subjects Table-----------
// To get images by search

app.get("/search/:details",async(req,res)=>{
  try{
    const{details}=req.params
     const pattern=`%${details}%`;
    const [rows]=await pool.query(`select * from subject where sub_code like ? or sub_name like ?`, [pattern,pattern])
      if(rows.length>0){
          res.status(200).json({details:rows})
      }
      else{
        res.status(400).json({error:"No Data in Our DataBase "})
      }
  }
  catch(err){
    console.log(err.message);
    res.status(500).json({error:"Internal SErver error"});
  }
})

app.get("/get_paper/:sub_code", async (req, res) => {
  try {
    const sub_code = req.params.sub_code; // Get sub_code from request parameters
    const [rows] = await pool.query(`SELECT * FROM subject WHERE sub_code = ?`, [sub_code]);
    
    if (rows.length > 0) {
      res.status(200).json(rows); // Return the paper data
    } else {
      res.status(200).json({ error: "Paper not found" }); // Handle case where no paper is found
    }
  } catch (err) {
    console.log(err.message); // Log the error message
    res.status(500).json({ error: "Internal server error" }); // Handle internal server error
  }
});

// to get images relevent to user details 
// app.get("/relevent", async (req, res) => {
//   try {
//     const { regulation, year, branch } = req.body; 
//     const table = regulation + year;
//     const [rows] = await pool.query(
//       `SELECT s.sub_code, s.sub_name, s.upload_by, COUNT(s.id) AS upload_count , s.upload_time
//        FROM ${table} r
//        INNER JOIN subject s ON r.sub_code = s.sub_code
//        WHERE r.branch = ?
//        GROUP BY s.sub_code, s.sub_name, s.upload_by ,s.upload_time`,
//       [branch] 
//     );
//     // Check if data exists
//     if (rows.length > 0) {
//       res.status(200).json({ subjects: rows });
//     } else {
//       res.status(404).json({ error: "No subjects found for the given branch" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
app.get("/relevent", async (req, res) => {
  try {
      const { regulation, year, branch } = req.query; 

      const table = regulation + year; // Combine regulation and year to form the table name
      const [rows] = await pool.query(
             `SELECT s.sub_code, s.sub_name, s.upload_by, COUNT(s.id) AS upload_count , s.upload_time
              FROM ${table} r
              INNER JOIN subject s ON r.sub_code = s.sub_code
               WHERE r.branch = ?
               GROUP BY s.sub_code, s.sub_name, s.upload_by ,s.upload_time`,
              [branch] 
            );
      // Check if data exists
      if (rows.length > 0) {
          res.status(200).json({ subjects: rows });
      } else {
          res.status(404).json({ error: "No subjects found for the given branch" });
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


  //  to get the top 20 most recent uploads 
app.get("/recent_uploads/:count", async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    const [rows] = await pool.query(
      `SELECT * FROM subject
       ORDER BY upload_time DESC
       LIMIT ?`,[count]
    );
    // Check if data exists
    if (rows.length > 0) {
      res.status(200).json({ recentUploads: rows });
    } else {
      res.status(404).json({ error: "No recent uploads found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/delete_paper/:id",async(req,res)=>{
  try{
    const id = parseInt(req.params.id);
    const [rows]=await pool.query(`delete from subject where id=?`,[id])
    if(rows. affectedRows>0){
      res.status(200).json({error:"Delted successfully"})
    }
    else{
      res.status(400).json({error:"Didnt find Paper"})
    }
  }
  catch(err){
    console.log(err.msg)
    res.status(500).json({error:"Internal server error"})
  }
})



