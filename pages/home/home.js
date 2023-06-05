function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

firebase.auth().onAuthStateChanged(user => {
    if(user){
        findTransactions(user)
    }
})


function findTransactions(user) {
    showLoading();
    firebase.firestore()
        .collection('transactions')
        .where('user.uid','==', user.uid)
        .orderBy('date','desc')
        .get()
        .then(snapshot => {
            hideLoading();
            const transactions = snapshot.docs.map(doc => doc.data());
            addTransactionsToScreen(transactions); 
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao recuperar transações')
        })    
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

        if(transaction.description){
            const description = document.createElement('p');
            description.innerHTML = transaction.description;
            li.appendChild(description);
        }

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