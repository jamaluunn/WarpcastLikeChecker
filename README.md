# Warpcast Like Checker

This Node.js project reads links from a file, fetches hash values from the Neynar API, writes those hash values to another file, and then processes those hash values to determine which users have already liked specific content on Farcaster. The results are printed to the console with color coding.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Files](#files)
- [API Keys](#api-keys)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/jamaluunn/WarpcastLikeChecker.git
    cd WarpcastLikeChecker
    ```

2. **Install dependencies**
    Make sure you have [Node.js](https://nodejs.org/) installed. Then run:
    ```sh
    npm install
    ```

## Usage

1. **Prepare the necessary files**

    Create the following files in the root directory of the project:

    - `links.txt`: This file should contain the URLs you want to process, each on a new line.
    - `api_key.txt`: This file should contain your API key for the `build.far.quest` API.
    - `username.txt`: This file should contain the usernames to check against the API responses, each on a new line.

2. **Run the script**
    ```sh
    node index.js
    ```

    The script will read the links from `links.txt`, fetch the hash values, write them to `Hash.txt`, and then process each hash to determine which users have liked the content. The results will be printed to the console with color coding.

## Files

- `index.js`: Main script file containing the processing logic. (no need to edit)
- `links.txt`: Contain cast link that u wanna check.
- `api_key.txt`: File containing the API key for `build.far.quest`. (get free api here: https://docs.far.quest/reference/apikey)
- `username.txt`: File containing the usernames to check.
- `Hash.txt`: Output file with hash values obtained from the first API call. (no need to edit)

## API Keys

- **Neynar API Key**: This is hardcoded in the script as `'NEYNAR_API_DOCS'`. You may need to replace it with your actual API key if necessary.
- **Build Farcaster API Key**: This should be stored in the `api_key.txt` file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
