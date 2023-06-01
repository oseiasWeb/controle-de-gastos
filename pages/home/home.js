function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

findTransaction();

function findTransaction() {
    setTimeout(() => {
        addTransactionsToScreen(fakeTransactions);
    }, 1000)
}

function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions');

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);

        const date = document.createElement('p');
        date.innerHTML = formatDate(transaction.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatMoney(transaction.money);
        li.appendChild(money);

        const type = document.createElement('p');
        type.innerHTML = transaction.transactionType;
        li.appendChild(type);

        orderedList.appendChild(li);
    });

}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-us');
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}` 
}

const fakeTransactions = [{
    type: 'expense',
    date: '2023-05-01',
    money: {
        currency: 'EUR',
        value: 350
    },
    transactionType: 'Comida'
}, {
    type: 'expense',
    date: '2023-05-01',
    money: {
        currency: 'EUR',
        value: 95
    },
    transactionType: 'Internet'
}, {
    type: 'income',
    date: '2023-05-01',
    money: {
        currency: 'EUR',
        value: 2500
    },
    transactionType: 'Salário',
    description: 'Empresa ABC'
},{
    type: 'expense',
    date: '2023-05-01',
    money: {
        currency: 'EUR',
        value: 650
    },
    transactionType: 'Aluguel',
    description: 'Tipo - T3'
}]