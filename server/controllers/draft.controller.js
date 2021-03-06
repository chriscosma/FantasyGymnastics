// draft.controller.js, 2021, FG
// Defines routes to handle draft related requests
// ------------------------------------------------------------------------

const express = require('express');
const passport = require('passport');
const constants = require('../misc/constants');
const Gymnast = require('../models/gymnast.model');
const League = require('../models/league.model');

const DraftController = express.Router();

/**
 * Handle a request to start a draft
 * Expects a request body with the following JSON:
 * {
 *   leagueDocumentID: `some string that is the league's document ID`
 * }
 * Starts draft or
 * returns LEAGUE_NOT_FOUND if league with id not found
 * returns PERMISSION_DENIED if user is not league owner or
 * returns DRAFT_ALREADY_STARTED if draft has already started
 */
function startDraftHandler(req, res) {
    League.findOne({ _id: req.body.leagueDocumentID }).then(league => {
        if(!league) {
            return res.status(200).json({
                message: constants.NO_LEAGUE_FOUND
            });
        }

        if(league.owner !== req.user.email) {
            return res.status(200).json({
                message: constants.PERMISSION_DENIED
            });
        }

        if(league.draft.started) {
            return res.status(200).json({
                message: constants.DRAFT_ALREADY_STARTED
            });
        }

        league.startDraft();

        return res.status(200).json({league: league});
    }).catch(err => {
        console.error(err);
        return res.status(200).json({
            message: constants.SOMETHING_WENT_WRONG
        });
    });
}
// Define '/startDraft' route and use authentication with handler above
DraftController.post('/startDraft/', passport.authenticate('jwt', {session: false}), startDraftHandler);

module.exports = DraftController;