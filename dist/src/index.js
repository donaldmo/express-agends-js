"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json()); // ✅ necessary to get req.body as JSON
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'client', 'dist', 'index.html'));
});
app.post('/api/jobs/:jobName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobName } = req.params;
    const data = req.body;
    try {
        // await agenda.now(jobName, data); // queue job immediately
        // await agenda.every('2 seconds', jobName, data);
        console.log(`Job '${jobName}' triggered with data:`, data);
        res.status(200).json({ message: `Job '${jobName}' triggered`, data });
    }
    catch (error) {
        console.error('Error triggering job:', error);
        res.status(500).json({ error: 'Failed to trigger job' });
    }
}));
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
