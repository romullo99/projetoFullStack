const API_URL = 'http://localhost:3000/api/contatos';

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    if (!nome || !email || !telefone || !endereco) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, telefone, endereco })
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar contato');
        }

        const contato = await response.json();
        appendContact(contato);

        
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar contato. Tente novamente.');
    }
});


async function loadContacts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao carregar contatos');
        }
        const contatos = await response.json();
        contatos.forEach(appendContact);
    } catch (error) {
        console.error('Erro ao carregar contatos:', error);
        alert('Erro ao carregar contatos. Tente novamente.');
    }
}


function appendContact(contato) {
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${contato.nome}</strong>
        <p>Email: ${contato.email}</p>
        <p>Telefone: ${contato.telefone}</p>
        <p>Endereço: ${contato.endereco}</p>
        <button onclick="deleteContact('${contato._id}')">Deletar</button>
    `;
    document.getElementById('contactsList').appendChild(li);
}


async function deleteContact(id) {
    console.log('Tentando deletar o contato com ID:', id); 
    const confirmation = confirm('Você tem certeza que deseja deletar este contato?');
    if (!confirmation) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao deletar contato');
        }

        
        document.location.reload();
    } catch (error) {
        console.error('Erro ao deletar contato:', error);
        alert('Erro ao deletar contato. Tente novamente.');
    }
}



loadContacts();
