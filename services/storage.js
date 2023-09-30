import fs from 'fs';

// Create simple database
const addUserToDataBase = (data) => {
  if (!fs.existsSync('../database')){        // Check if /database does not exit
    fs.mkdir('../database', (err) => {       // Create directory
      if(err){ console.log(err) }            // Check if there is an error
    })
  }
  fs.writeFile('../database/donors.txt', `\nNAME: ${data.first} ${data.lastName} EMAIL: ${data.email} AMOUNT: $${data.usdAmount}\n`, { flag: 'a' }, (err) => {
    if (err) { console.error('Error appending data to the file:', err);
    } else { console.log('Record Saved')}
  });
}

export default addUserToDataBase;