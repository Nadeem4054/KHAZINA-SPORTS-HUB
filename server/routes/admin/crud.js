const express = require('express');
const router = express.Router();
const Team = require('../../models/Team');
const Tournament = require('../../models/Tournament');
const Match = require('../../models/Match');
const { authenticateAdmin, checkRole } = require('../../middleware/auth');
const logActivity = require('../../middleware/logger');

router.use(authenticateAdmin);
router.use(checkRole(['super_admin', 'admin', 'moderator']));

// --- TEAMS CRUD ---
router.put('/teams/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await logActivity(req.admin.id, 'UPDATE_TEAM', 'Team', `Updated team ${team.name}`, team._id);
        res.json(team);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/teams/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if(team) await logActivity(req.admin.id, 'DELETE_TEAM', 'Team', `Deleted team ${team.name}`, team._id);
        res.json({ message: 'Team deleted' });
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// --- TOURNAMENTS CRUD ---
router.put('/tournaments/:id', async (req, res) => {
    try {
        const t = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await logActivity(req.admin.id, 'UPDATE_TOURNAMENT', 'Tournament', `Updated tournament ${t.name}`, t._id);
        res.json(t);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/tournaments/:id', async (req, res) => {
    try {
        const t = await Tournament.findByIdAndDelete(req.params.id);
        if(t) await logActivity(req.admin.id, 'DELETE_TOURNAMENT', 'Tournament', `Deleted tournament ${t.name}`, t._id);
        res.json({ message: 'Tournament deleted' });
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// --- MATCHES CRUD ---
router.put('/matches/:id', async (req, res) => {
    try {
        const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await logActivity(req.admin.id, 'UPDATE_MATCH', 'Match', `Updated match info`, match._id);
        res.json(match);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/matches/:id', async (req, res) => {
    try {
        const match = await Match.findByIdAndDelete(req.params.id);
        if(match) await logActivity(req.admin.id, 'DELETE_MATCH', 'Match', `Deleted match`, match._id);
        res.json({ message: 'Match deleted' });
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
