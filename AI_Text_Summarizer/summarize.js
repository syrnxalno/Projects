const summarizeText = (text) => {
  const MIN_SUMMARY_LENGTH = 200;
  const MAX_SUMMARY_LENGTH = 100000;


  const cleanText = (text) => text.replace(/[\n\r]+/g, ' ').replace(/\s{2,}/g, ' ').trim();

  const tokenizeSentences = (text) => text.split(/(?<=[.!?])\s+/);

  const tokenizeWords = (text) => text.toLowerCase().split(/\s+/);

  const getTermFrequency = (sentences) => {
    const termFreq = {};
    const wordCounts = {};

    sentences.forEach(sentence => {
      const words = tokenizeWords(sentence);
      words.forEach(word => {
        if (!termFreq[word]) {
          termFreq[word] = 0;
        }
        termFreq[word] += 1;
        if (!wordCounts[word]) {
          wordCounts[word] = 0;
        }
        wordCounts[word] += 1;
      });
    });

    return termFreq;
  };

  const scoreSentences = (sentences, termFreq) => {
    const sentenceScores = {};
    sentences.forEach(sentence => {
      const words = tokenizeWords(sentence);
      let score = 0;
      words.forEach(word => {
        if (termFreq[word]) {
          score += termFreq[word];
        }
      });
      sentenceScores[sentence] = score;
    });

    return sentenceScores;
  };

 
  const generateSummary = (sentences, sentenceScores) => {
    const sortedSentences = Object.keys(sentenceScores)
      .sort((a, b) => sentenceScores[b] - sentenceScores[a]);


    let summary = '';
    for (const sentence of sortedSentences) {
      if (summary.length >= MIN_SUMMARY_LENGTH && summary.length <= MAX_SUMMARY_LENGTH) {
        break;
      }
      summary += (summary ? ' ' : '') + sentence;
    }

    return summary;
  };


  const cleanedText = cleanText(text);
  const sentences = tokenizeSentences(cleanedText);
  const termFreq = getTermFrequency(sentences);
  const sentenceScores = scoreSentences(sentences, termFreq);
  const summary = generateSummary(sentences, sentenceScores);

  return summary;
};

module.exports = summarizeText;
