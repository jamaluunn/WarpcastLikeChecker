const axios = require('axios');
const fs = require('fs').promises; // Import module 'fs' untuk membaca file

// ANSI escape codes untuk warna teks
const greenColor = '\x1b[32m';
const redColor = '\x1b[31m';
const resetColor = '\x1b[0m'; // Kode untuk mereset warna

async function processLinks() {
  try {
    // Read links from the file
    const links = await fs.readFile('links.txt', 'utf-8');
    const linksArray = links.split('\n').map(link => link.trim());

    // Initialize an array to store all hash values
    const hashValues = [];

    // Make requests for each link
    for (const link of linksArray) {
      const options = {
        method: 'GET',
        url: `https://api.neynar.com/v2/farcaster/cast?identifier=${encodeURIComponent(link)}&type=url&viewer_fid=3`,
        headers: { accept: 'application/json', api_key: 'NEYNAR_API_DOCS' },
        timeout: 5000 // 5 seconds timeout
      };

      const response = await axios.request(options);
      // Extracting the value of the hash property
      const hashValue = response.data.cast.hash;
      hashValues.push(hashValue);
    }

    // Write all hash values to Hash.txt, overwriting the existing content
    await fs.writeFile('Hash.txt', hashValues.join('\n'));

    // Now read the newly written Hash.txt
    const hashData = await fs.readFile('Hash.txt', 'utf-8');
    const castHashList = hashData.trim().split('\n'); // Pisahkan setiap baris menjadi castHash terpisah

    // Loop through each castHash and make the HTTP requests
    for (const castHash of castHashList) {
      const castOptions = {
        method: 'GET',
        url: `https://build.far.quest/farcaster/v2/cast-likes?castHash=${castHash}&limit=1000`,
        headers: { accept: 'application/json' },
        timeout: 5000 // 5 seconds timeout
      };

      try {
        // Read the API-KEY from the file 'api_key.txt'
        const apiKey = await fs.readFile('api_key.txt', 'utf-8');
        castOptions.headers['API-KEY'] = apiKey.trim(); // Trim any extra whitespace

        // Retry logic for the HTTP request
        let retryCount = 0;
        const maxRetries = 3;
        let castResponse;

        while (retryCount < maxRetries) {
          try {
            // Make the HTTP request
            castResponse = await axios.request(castOptions);
            break; // Break if request is successful
          } catch (error) {
            retryCount++;
            if (retryCount === maxRetries) {
              throw error; // Throw error if max retries reached
            }
            console.log(`Retrying request for castHash ${castHash} (${retryCount}/${maxRetries})...`);
          }
        }

        // Convert the response data object to a readable JSON string
        const jsonData = castResponse.data;
        const jsonString = JSON.stringify(jsonData, null, 2);

        // Initialize arrays to hold the results
        const alreadyLike = [];
        const sekemCok = [];

        // Read the contents of 'username.txt'
        const usernames = (await fs.readFile('username.txt', 'utf-8')).split('\n');

        // Check each username in the 'username.txt' file
        usernames.forEach(username => {
          // If the username is in the JSON result, add it to 'alreadyLike', otherwise add it to 'sekemCok'
          if (jsonString.includes(`"${username.trim()}"`)) {
            alreadyLike.push(username.trim());
          } else {
            sekemCok.push(username.trim());
          }
        });

        // Print the results with color coding for each castHash
        console.log(`${greenColor}[Already Like for castHash ${castHash}]${resetColor}`);
        console.log(alreadyLike.join('\n'));
        console.log(`${redColor}[Sekem Cok for castHash ${castHash}]${resetColor}`);
        console.log(sekemCok.join('\n'));

        // Add a separator after each castHash
        console.log('---------------------------------------------------------');
      } catch (error) {
        console.error(`Error processing castHash ${castHash}:`, error);
      }
    }
  } catch (error) {
    console.error('Error processing links:', error);
  }
}

processLinks();
