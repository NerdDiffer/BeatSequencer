const express = require('express');
const router = express.Router();
const { users, soundSets, samples, beats, sequences, beatSequences } = require('./handlers');

router.get('/users', users.index);
router.get('/users/:id', users.show);
router.post('/users', users.create);

router.get('/soundSets', soundSets.index);
router.get('/soundSets/:id', soundSets.show);
router.post('/soundSets', soundSets.create);

router.get('/samples', samples.index);
router.get('/samples/:id', samples.show);
router.post('/samples', samples.create);

router.get('/beats', beats.index);
router.get('/beats/:id', beats.show);
router.post('/beats', beats.create);

router.get('/sequences', sequences.index);
router.get('/sequences/:id', sequences.show);
router.post('/sequences', sequences.create);

router.get('/beatSequences', beatSequences.index);
router.get('/beatSequences/:id', beatSequences.show);
router.post('/beatSequences', beatSequences.create);

module.exports = router;
