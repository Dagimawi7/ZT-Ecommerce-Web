// Importing multer to help upload files (like images)
import multer from "multer";

// Setting up where to save the uploaded files and what to name them
const storage = multer.diskStorage({
  // This part gives each uploaded file its original name
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// Creating the upload function using the storage settings above
const upload = multer({ storage });

// Exporting upload so we can use it in other files (like routes)
export default upload;
