const axios = require('axios');
const fs = require('fs');
const path = require('path');
const wordListUrl = 'https://raw.githubusercontent.com/bilalozdemir/tr-word-list/master/files/words.json';
const TARGET_SIZE = 4 * 1024 * 1024 * 1024; // 4GB
const CHUNK_SIZE = 1024 * 1024 * 10; // 10MB
const MAX_LOOP = TARGET_SIZE / CHUNK_SIZE; // loop count

async function createFile() {
  const words = await fetch(wordListUrl);

  if (words.length === 0) {
    throw new Error('Word list is empty');
  }

  const totalChunks = Math.ceil(TARGET_SIZE / CHUNK_SIZE);
  const writeFile = fs.createWriteStream(path.join(__dirname, 'output.txt'));

  for (let i = 0; i < MAX_LOOP; i++) {
    let folderSize = 0;

    for (let j = 0; j < totalChunks; j++) {
      let chunkSize = 0;

      while (chunkSize < CHUNK_SIZE && folderSize < TARGET_SIZE) {
        const randomWordIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomWordIndex];

        if (randomWord.length + 1 > CHUNK_SIZE || folderSize + randomWord.length + 1 > TARGET_SIZE) {
          continue;
        }

        chunkSize += randomWord.length + 1;
        folderSize += randomWord.length + 1;

        const sentence = `${randomWord} `;
        const result = writeFile.write(sentence, () => { });

        if (!result) {
          await new Promise(resolve => writeFile.once('drain', resolve));
        }
      }
    }

    if (folderSize >= TARGET_SIZE) {
      break;
    }
  }

  writeFile.end();
}

async function fetch(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const words = data.map(obj => obj.word);
    return words;
  } catch (error) {
    console.error(`Failed to fetch word list from ${url}: ${error}`);
    throw error;
  }
}

async function main() {
  await createFile();
  const keyword = await findMostCommonKeyword();
  console.log(keyword);
}

async function findMostCommonKeyword() {
  const wordsInFile = {};
  const readStream = fs.createReadStream('./output.txt', 'utf8');

  let buffer = '';
  let chunkIndex = 0;

  for await (const chunk of readStream) {
    buffer += chunk;
    if (buffer.length >= CHUNK_SIZE) {
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        const words = line.split(' ');
        words.forEach(word => wordsInFile[word] = (wordsInFile[word] || 0) + 1);
      }
    }
    chunkIndex++;
    if (chunkIndex >= MAX_LOOP) {
      break;
    }
  }

  if (buffer) {
    const words = buffer.split(' ');
    words.forEach(word => wordsInFile[word] = (wordsInFile[word] || 0) + 1);
  }

  const sortedWords = Object.keys(wordsInFile).sort((a, b) => wordsInFile[b] - wordsInFile[a]);
  const topTenWords = sortedWords.slice(0, 10);
  return topTenWords.join('\n');
}

main().catch((err) => {
  console.error(err);
});