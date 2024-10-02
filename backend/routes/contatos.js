const express = require('express')
const router = express.Router()
const contato = require("../models/contato")

router.post('/', async (req, res) => {
    const { nome, email, telefone, endereco } = req.body
    const novoContato = new contato({ nome, email, telefone, endereco })
    await novoContato.save()
    res.json(novoContato)
})

router.get('/', async (req, res) => {
    const contatos = await contato.find()
    res.json(contatos)
})

router.get('/:id', async (req, res) => {
    const contato = await contato.findById(req.params.id)
    if (!contato) return res.status(404).send('Contato não encontrado.')
    res.json(contato)
})

router.put('/:id', async (req, res) => {
    const { nome, email, telefone, endereco } = req.body
    const contatoupdated = await contato.findByIdAndUpdate(req.params.id, { nome, email, telefone, endereco }, { new: true })
    res.json(contatoupdated)
})

router.delete('/:id', async (req, res) => {
    try {
        const contatoo = await contato.findByIdAndDelete(req.params.id);

       
        if (!contatoo) {
            return res.status(404).json({ message: 'Contato não encontrado!' });
        }

        res.json({ message: 'Contato deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar contato:', error);
        res.status(500).json({ message: 'Erro ao deletar contato!', error: error.message });
    }
})

module.exports = router