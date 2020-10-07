const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const bodyParser = express.json();
const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )
      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })
languageRouter
  .get('/head', async (req, res, next) => {
    try {
    const headWord = await LanguageService.getNextWord(
      req.app.get('db'),
      req.language.head,
      )
      res.json({
        nextWord: headWord.original,
        totalScore: req.language.total_score,
        wordCorrectCount: headWord.correct_count,
        wordIncorrectCount: headWord.incorrect_count
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .post('/guess',bodyParser, async (req, res, next) => {
    if(!Object.keys(req.body).includes('guess')){
      return res.status(400).json({
        error: `Missing 'guess' in request body`,
      })
    }

    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    )
    const wordList = LanguageService.wordList(
      req.app.get('db'),
      req.language,
      words
    )
console.log(wordList)
  })

module.exports = languageRouter
