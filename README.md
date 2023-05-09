
# Generating a Large Size Text File with Random Words Using Node.js

This application creates a completely random 4 GB text file using the words from the Turkish word list found at https://raw.githubusercontent.com/bilalozdemir/tr-word-list/master/files/words.json, using Node.js.



## Installation

1. Clone or download this repository to your local machine.
```bash
git clone https://github.com/bsrakts/nodejs-random-word.git
```

2. Ensure that Node.js is installed on your computer. If not, download and install it from the official website: https://nodejs.org/en/download/


3. Open your terminal and navigate to the project directory.

```bash
cd random-words-generator
``` 

4. Install the required dependencies by running the following command:

```bash
npm install
``` 

5. Once the dependencies are installed, you can start the application by running the following command:

```bash
node index.js
``` 

- This will create a file with randomly generated words using the Turkish word list from wordListUrl. 
- The application will write the 10 most commonly used words in the file to the console. Note that the file size will be approximately 4 GB, and the application will throw an error if the file size is smaller or if the word list is empty.




    
## How It Works

- The fetch function retrieves the word list from https://raw.githubusercontent.com/bilalozdemir/tr-word-list/master/files/words.json.

- The createFile function generates a file by randomly selecting words and writing lines to the file until the desired file size is reached.

- The findMostCommonKeyword function reads the generated file, calculates and returns the 10 most frequently used words in the file.


## Important Points to Note

- The application will throw an error if the file size is less than 4 GB or if the words.json file is empty.

- When generating the file, the length of each line is checked to ensure that each line contains only one word. If a word has a length greater than 10 MB, it will be skipped.

- A space character is added between each word when generating the file.

- The 10 most frequently used words are calculated based on the number of words in the file, and only words with 4 or more characters are considered.
## Tech Stack

NodeJS


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dbusraktas/)

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/dbusraktas)


## License

[MIT](https://choosealicense.com/licenses/mit/)

