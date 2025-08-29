require('dotenv').config();
const mongoose = require('mongoose');

const initialDb = [
    // NEUROCIÊNCIAS
    { id: 11, theme: 'NEUROCIÊNCIAS', category: 'Neuroanatomia', type: 'Resumos', title: 'O Cérebro e a Emoção', description: 'Resumo sobre as principais estruturas límbicas envolvidas no processamento emocional.', fileUrl: 'mock-pdf.pdf', linkUrl: '' },
    { id: 12, theme: 'NEUROCIÊNCIAS', category: 'Neurofisiologia', type: 'Mapas Mentais', title: 'Neurônios e Sinapses', description: 'Mapa mental do funcionamento básico da comunicação neural.', fileUrl: 'mock-pdf.pdf', linkUrl: '' },
    // ABORDAGENS
    { id: 1, theme: 'ABORDAGENS', category: 'Psicanálise', type: 'Resumos', title: 'ID, Ego e Superego', description: 'Uma exploração detalhada das três instâncias da personalidade na teoria psicanalítica de Freud.', fileUrl: 'mock-pdf.pdf', linkUrl: 'https://pt.wikipedia.org/wiki/Id,_ego_e_superego' },
    { id: 2, theme: 'ABORDAGENS', category: 'Psicanálise', type: 'Resumos', title: 'Fases do Desenvolvimento Psicossexual', description: 'Resumo das fases oral, anal, fálica, de latência e genital.', fileUrl: 'mock-pdf.pdf', linkUrl: '' },
    { id: 4, theme: 'ABORDAGENS', category: 'Psicanálise', type: 'Mapas Mentais', title: 'Estrutura da Mente Freudiana', description: 'Mapa mental ilustrando a relação entre Id, Ego, Superego.', fileUrl: 'mock-pdf.pdf', linkUrl: '' },
    { id: 5, theme: 'ABORDAGENS', category: 'Psicanálise', type: 'Livros', title: 'A Interpretação dos Sonhos', description: 'Análise da obra seminal de Sigmund Freud.', fileUrl: 'mock-pdf.pdf', linkUrl: '' },
    { id: 7, theme: 'ABORDAGENS', category: 'Psicanálise', type: 'Conceitos', title: 'Complexo de Édipo', description: 'Explicação aprofundada do conceito central na teoria psicanalítica.', fileUrl: 'mock-pdf.pdf', linkUrl: '' },
    { id: 8, theme: 'ABORDAGENS', category: 'Psicanálise', type: 'Questões', title: 'Questões sobre Teoria Freudiana', description: 'Teste seus conhecimentos sobre os fundamentos da psicanálise.', fileUrl: 'mock-pdf.pdf', linkUrl: '' },
    { id: 9, theme: 'ABORDAGENS', category: 'Behaviorismo', type: 'Resumos', title: 'Behaviorismo Radical vs. Metodológico', description: 'Comparativo entre as visões de Skinner e Watson.', fileUrl: 'mock-pdf.pdf', linkUrl: '' },
    { id: 10, theme: 'ABORDAGENS', category: 'Behaviorismo', type: 'Mapas Mentais', title: 'Condicionamento Clássico e Operante', description: 'Mapa mental explicando os processos de aprendizagem.', fileUrl: 'mock-pdf.pdf', linkUrl: '' },
    { id: 15, theme: 'ABORDAGENS', category: 'Gestalt Terapia', type: 'Resumos', title: 'Princípios da Gestalt', description: 'Introdução aos conceitos de figura-fundo, pregnância e fechamento.', fileUrl: 'mock-pdf.pdf', linkUrl: '' },
    // ÁREAS DE ATUAÇÃO
    { id: 13, theme: 'ÁREAS DE ATUAÇÃO', category: 'Clínica', type: 'Artigos', title: 'Técnicas de Entrevista Clínica', description: 'Artigo sobre as melhores práticas na condução de entrevistas clínicas.', fileUrl: '', linkUrl: '' },
    { id: 16, theme: 'ÁREAS DE ATUAÇÃO', category: 'Organizacional', type: 'Livros', title: 'Comportamento Organizacional', description: 'Livro referência na área de psicologia organizacional e do trabalho.', fileUrl: '', linkUrl: '' },
    { id: 17, theme: 'ÁREAS DE ATUAÇÃO', category: 'Educacional', type: 'Resumos', title: 'Psicologia e Aprendizagem', description: 'Resumo sobre as teorias de Piaget e Vygotsky aplicadas à educação.', fileUrl: '', linkUrl: '' },
    // PATOLOGIAS
    { id: 14, theme: 'PATOLOGIAS', category: 'Transtornos', type: 'Resumos', title: 'Resumo sobre Transtornos de Ansiedade', description: 'Uma visão geral sobre os principais transtornos de ansiedade segundo o DSM-5.', fileUrl: 'mock-pdf.pdf', linkUrl: '' },
];

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

const seedDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await Content.deleteMany({});
    console.log('Dados antigos removidos.');
    await Content.insertMany(initialDb);
    console.log('Novos dados inseridos com sucesso!');
    mongoose.connection.close();
};

seedDB();