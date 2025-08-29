require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado com sucesso.'))
    .catch(err => console.error('Erro de conexão com MongoDB:', err));

const contentSchema = new mongoose.Schema({
    theme: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: String,
    linkUrl: String
});

const Content = mongoose.model('Content', contentSchema);

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin43') {
        res.status(200).json({ success: true, message: 'Login bem-sucedido' });
    } else {
        res.status(401).json({ success: false, message: 'Login ou senha inválidos.' });
    }
});

app.get('/api/content', async (req, res) => {
    try {
        const allContent = await Content.find({}).sort({ _id: -1 });
        res.status(200).json(allContent);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar conteúdo.', error });
    }
});

app.post('/api/content', async (req, res) => {
    try {
        const newContent = new Content(req.body);
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar conteúdo.', error });
    }
});

app.put('/api/content/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedContent = await Content.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContent) {
            return res.status(404).json({ message: 'Conteúdo não encontrado.' });
        }
        res.status(200).json(updatedContent);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar conteúdo.', error });
    }
});

app.delete('/api/content/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContent = await Content.findByIdAndDelete(id);
        if (!deletedContent) {
            return res.status(404).json({ message: 'Conteúdo não encontrado.' });
        }
        res.status(200).json({ message: 'Conteúdo excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir conteúdo.', error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});